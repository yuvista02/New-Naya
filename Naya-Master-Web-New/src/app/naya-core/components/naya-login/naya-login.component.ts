import { NgIf, NgStyle }                from '@angular/common';
import { Component, OnInit }            from '@angular/core';
import { Title }                        from '@angular/platform-browser';
import { MsalBroadcastService }         from '@azure/msal-angular';
import { EventMessage, EventType }      from '@azure/msal-browser';
// Third party imports
import { ButtonModule }                 from 'primeng/button';
import { ProgressBarModule }            from 'primeng/progressbar';
import { filter }                       from 'rxjs';
// Naya Imports
import { AppRouter }                    from '@app/app.router';
import { DiagnosticApiService }         from '@naya-core/api/diagnostic-api.service';
import { DatabaseDto }                  from '@naya-core/api/response/database.response';
import { UserConnection }                  from '@naya-core/api/response/user-session.response';
import { ApiContentResult }             from '@naya-core/models/api-result';
import { Diagnostic }                   from '@naya-core/models/diagnostic.model';
import { ComponentUtilityService }      from '@naya-core/services/component-utility.service';
import { MsalWrapperService }           from '@naya-core/services/msal-wrapper-service';
import { UserConnectionService }           from '@naya-core/services/user-session.service';
import { NayaErrorMessageComponent }    from '@naya-shared/components/naya-error-message/naya-error-message.component';
import { DefaultValues }                from '@naya-shared/constants/default-values';
import { NayaApp }                 from 'src/naya-config/naya-app';

@Component({
    selector: "app-naya-login",
    templateUrl: "./naya-login.component.html",
    styleUrls: ["./naya-login.component.scss"],
    standalone: true,
    imports: [
        ButtonModule,
        NayaErrorMessageComponent,
        NgIf,
        NgStyle,
        ProgressBarModule,
    ],
    providers: [DiagnosticApiService]
})
export class NayaLoginComponent implements OnInit {

    // Start Template variables
    public NSHasErrors: boolean = false;
    public NSLoading: boolean = false;
    public NSDiagnostic = new Diagnostic();
    public NSDisplayMessage: string = String.empty;
    public NSWebApplicationVersion: string = NayaApp.ApplicationVersion;
    // End Template variables

    constructor(
        private _appRouter: AppRouter,
        private _diagnosticApiService: DiagnosticApiService,
        private _msalBroadcastService: MsalBroadcastService,
        private _msalWrapperService: MsalWrapperService,
        private _titleService: Title,
        private _userSessionService: UserConnectionService,
        private _componentUtilityService: ComponentUtilityService,
    ) { }

    async ngOnInit(): Promise<void> {
        this._titleService.setTitle(NayaApp.ApplicationName);
        this.loadApiDiagnostic();
    }

    public async NSOnClickLoginButton() {
        if (this._msalWrapperService.IsConnectedToAzure()) {
            if (this._userSessionService.IsConnectedToDatabase()) {
                this._appRouter.RouteToDefault();
            }
            else {
                this.updateProcess("Connecting");
                this.dbConnectUser(DefaultValues.Y)
            }
        }
        else {
            this.doConnectToAzure();
        }
    }

    public async NSOnClickReloadButton() {
        await this.loadApiDiagnostic();
    }

    private async loadApiDiagnostic() {
        this.NSLoading = true;
        try {
            const apiResult: ApiContentResult<DatabaseDto> = await this._diagnosticApiService.GetDatabaseDto(NayaApp.ConnectionName);
            if (this._componentUtilityService.WasSuccessful(apiResult)) {
                this.NSHasErrors = false;
                this.NSDisplayMessage = String.empty;
                this.NSDiagnostic = apiResult.content;
                this._msalWrapperService.MSDiagnostic = apiResult.content;
            }
            else {
                this.NSHasErrors = true;
                this.NSDisplayMessage = apiResult.message;
            }
        }
        finally {
            this.NSLoading = false;
        }
    }

    private doConnectToAzure() {
        this.updateProcess("Authenticating user");

        this._msalWrapperService.ConnectToAzure();

        this._msalBroadcastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
            )
            .subscribe((_) => {
                this.dbConnectUser(DefaultValues.Y);
            });
    }

    private async dbConnectUser(forceDisconnect: string) {
        const connectResult: ApiContentResult<UserConnection> = await this._userSessionService.ConnectUser(forceDisconnect)
        if (this._componentUtilityService.WasSuccessful(connectResult)) {
            this._appRouter.RouteToDefault();
        }
        else {
            this.NSHasErrors = true;
            this.NSDisplayMessage = connectResult.message;
            this.updateProcess(String.empty, false);
        }
    }

    private updateProcess(processMessage: string = "", loading = true) {
        this.NSHasErrors = false;
        this.NSLoading = loading;
        this.NSDisplayMessage = processMessage;
    }
}
