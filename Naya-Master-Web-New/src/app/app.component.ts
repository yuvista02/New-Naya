import { NgIf }                                         from "@angular/common";
import { Component, HostListener, OnDestroy, OnInit }   from "@angular/core";
import { RouterOutlet }                                 from "@angular/router";
// Third-party imports
import { Message, PrimeNGConfig }                       from "primeng/api";
import { ConfirmDialogModule }                          from "primeng/confirmdialog";
// Naya Imports
import { NayaAppState }                                 from "@app/naya-app-state";
import { NayaApplicationInsight }                       from "@naya-core/services/naya-application-insight.service";
import { MsalWrapperService }                           from "@naya-core/services/msal-wrapper-service";
import { UserConnectionService }                           from "@naya-core/services/user-session.service";
import { NayaDialogComponent }                          from "@naya-shared/components/naya-dialog/naya-dialog.component";
import { NayaErrorMessageComponent }                    from "@naya-shared/components/naya-error-message/naya-error-message.component";
import                                                       "@naya-shared/helper-extension/extension-importer";
import { NayaMessageService }                           from "@naya-shared/services/naya-message.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    standalone: true,
    imports: [NgIf, RouterOutlet, NayaErrorMessageComponent, ConfirmDialogModule, NayaDialogComponent],
})
export class AppComponent implements OnInit, OnDestroy {

    private readonly _id: string;
    topbarTheme: string = "blue";

    menuTheme: string = "light";

    layoutMode: string = "light";

    menuMode: string = "static";

    inlineMenuPosition: string = "bottom";

    inputStyle: string = "filled";

    ripple: boolean = true;

    isRTL: boolean = false;

    public ShowInlineMenu: boolean = true;

    public NsIsIFrame: boolean = false;

    public NSMessages: Message[] = [];


    constructor(
        private _nayaAppState: NayaAppState,
        private _msalWrapperService: MsalWrapperService,
        private _primengConfig: PrimeNGConfig,
        private _userSessionService: UserConnectionService,
        private _nayaApplicationInsight: NayaApplicationInsight,
        private _nayaMessageService: NayaMessageService
    ) {
        this._id = String.currentTimeStamp();
        this._nayaAppState.setAppComponentId(this._id);
    }

    ngOnInit() {
        this.subscribeToNayaMessages();

        this.NsIsIFrame = window !== window.parent && !window.opener; // Remove this line to use Angular Universal
        this._primengConfig.ripple = true;

        this._msalWrapperService.Initialize();
        console.log(this._nayaAppState);
    }

    private subscribeToNayaMessages() {
        return this._nayaMessageService.GetMessages()
        .subscribe((messages) => {
            this.NSMessages = messages;
        });
    }

    @HostListener('window:beforeunload', ['$event'])
    unloadHandler() {
        this._nayaApplicationInsight.logEvent("Browser Close");
        this._userSessionService.HandleWindowBeforeUnload();
    }

    ngOnDestroy(): void {
        this._msalWrapperService.CleanUp();
    }
}
