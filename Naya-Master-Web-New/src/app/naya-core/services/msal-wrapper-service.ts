import { Inject, Injectable }                                    from "@angular/core";
// Third party imports
import {
    MSAL_GUARD_CONFIG, MsalBroadcastService,
    MsalGuardConfiguration, MsalService
}                                                                from "@azure/msal-angular";
import {
    AccountInfo, AuthenticationResult, EventMessage, EventType,
    InteractionStatus,
    InteractionType,
    PopupRequest,
    RedirectRequest
}                                                                from "@azure/msal-browser";
import { Subject, filter, takeUntil }                            from "rxjs";
// MS Imports
import { NayaAppState }                                          from "@app/naya-app-state";
import { AzureConnectionDetail }                                 from "@naya-core/models/azure-connection-detail.model";
import { Diagnostic }                                            from "@naya-core/models/diagnostic.model";
import { NayaApplicationInsight }                                from "@naya-core/services/naya-application-insight.service";


@Injectable()
export class MsalWrapperService {
    private readonly _id: string;
    private loginDisplay = false;
    private _azureConnectionDetail: AzureConnectionDetail | null = null;
    private readonly _destroying$ = new Subject<void>();
    public MSDiagnostic!: Diagnostic;

    constructor(
        @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
        private _nayaAppState: NayaAppState,
        private authService: MsalService,
        private msalBroadcastService: MsalBroadcastService,
        private _nayaApplicationInsight: NayaApplicationInsight
    ) {
        this._id = String.currentTimeStamp();
        this._nayaAppState.setMsalWrapperId(this._id);
    }

    public Initialize(): void {

        this.authService.handleRedirectObservable().subscribe();

        /**
         * You can subscribe to MSAL events as shown below. For more info,
         * visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/events.md
         */
        this.authService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
        this.msalBroadcastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => msg.eventType === EventType.ACCOUNT_ADDED || msg.eventType === EventType.ACCOUNT_REMOVED),
            )
            .subscribe((result: EventMessage) => {
                console.log(result);
                if (this.authService.instance.getAllAccounts().length === 0) {
                    window.location.pathname = "/";
                } else {
                    this.setLoginDisplay();
                }
            });

        this.msalBroadcastService.inProgress$
            .pipe(
                filter((status: InteractionStatus) => status === InteractionStatus.None),
                takeUntil(this._destroying$)
            )
            .subscribe(() => {
                this.setLoginDisplay();
                this.checkAndSetActiveAccount();
            });
    }

    setLoginDisplay() {
        this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
        console.log(this.loginDisplay);
    }

    private checkAndSetActiveAccount(): void {
        /**
         * If no active account set but there are accounts signed in, sets first account to active account
         * To use active account set here, subscribe to inProgress$ first in your component
         * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
         */
        let activeAccount = this.authService.instance.getActiveAccount();
        if (activeAccount) {
            this.setAzureConnectionDetail(activeAccount);
        }
        else if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
            let accounts: AccountInfo[] = this.authService.instance.getAllAccounts();
            // add your code for handling multiple accounts here
            this.authService.instance.setActiveAccount(accounts[0] ?? null);
            this.setAzureConnectionDetail(accounts[0] ?? null);
        }
        else {
            // handle case when no account found
        }
    }

    public get GetLoggedUserName(): string {
        return this._azureConnectionDetail?.azureUserName ?? "Not Authenticated";
    }

    public get GetLoggedUserFullName(): string {
        return this._azureConnectionDetail?.azureFullName ?? "Not Authenticated";
    }

    private setAzureConnectionDetail(activeAccount: AccountInfo | null): void {

        if (activeAccount) {
            this._azureConnectionDetail = {
                azureUserName: activeAccount.username,
                azureFullName: activeAccount.name ?? String.empty,
                accountIdentifier: activeAccount.localAccountId
            };
            this._nayaApplicationInsight.SetAzureUserName(activeAccount.username);
        }
        else {
            this._azureConnectionDetail = null;
        }
    }

    public ConnectToAzure(): void {
        this._nayaApplicationInsight.logEvent("Azure Session: INITIATED");
        this.loginRedirect();
    }

    public DisconnectFromAzure(): void {
        this._nayaApplicationInsight.logEvent("Azure Session: END");
        this.logout();
    }

    public IsConnectedToAzure(): boolean {
        return this._azureConnectionDetail ? true : false;
    }

    public GetAccessToken(): string {
        return "No token";
    }

    private loginRedirect() {
        if (this.msalGuardConfig.authRequest) {
            this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
        } else {
            this.authService.loginRedirect();
        }
    }

    login(userFlowRequest?: RedirectRequest | PopupRequest) {
        if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
            if (this.msalGuardConfig.authRequest) {
                this.authService.loginPopup({ ...this.msalGuardConfig.authRequest, ...userFlowRequest } as PopupRequest)
                    .subscribe((response: AuthenticationResult) => {
                        this.authService.instance.setActiveAccount(response.account);
                    });
            } else {
                this.authService.loginPopup(userFlowRequest)
                    .subscribe((response: AuthenticationResult) => {
                        this.authService.instance.setActiveAccount(response.account);
                    });
            }
        } else {
            if (this.msalGuardConfig.authRequest) {
                this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest, ...userFlowRequest } as RedirectRequest);
            } else {
                this.authService.loginRedirect(userFlowRequest);
            }
        }
    }

    private logout(popup?: boolean) {
        const activeAccount = this.authService.instance.getActiveAccount() || this.authService.instance.getAllAccounts()[0];

        if (activeAccount) {
            if (popup) {
                this.authService.logoutPopup({
                    mainWindowRedirectUri: "/"
                });
            } else {
                this.authService.logoutRedirect();
            }
            this.setAzureConnectionDetail(null);
        }
    }

    // unsubscribe to events when component is destroyed
    public CleanUp(): void {

        this._destroying$.next(undefined);
        this._destroying$.complete();
    }
}
