import { Component, OnInit }          from "@angular/core";
// Third Party
import { RippleModule } from "primeng/ripple";
import { ButtonModule } from "primeng/button";
import { SharedModule } from "primeng/api";
import { DialogModule } from "primeng/dialog";
// MS Imports
import { AppRouter }       from "@app/app.router";
import { DbConnectApiService }          from "@naya-core/api/db-connect-api.service";
import { UserConnectionService }           from "@naya-core/services/user-session.service";
import { ApiContentResult, ApiResult }                  from "@naya-core/models/api-result";
import { Disclaimer } from "@naya-core/api/response/disclaimer.response";
import { UserConnection } from "@naya-core/api/response/user-session.response";

@Component({
    selector: "naya-disclaimer-agreement",
    templateUrl: "./disclaimer-agreement.component.html",
    styleUrls: ["./disclaimer-agreement.component.css"],
    standalone: true,
    imports: [
        DialogModule,
        SharedModule,
        ButtonModule,
        RippleModule,
    ],
})
export class DisclaimerAgreementComponent implements OnInit {
    private _disclaimer!: Disclaimer;

    // Start Template variables
    public NSMessage: string = String.empty;
    public NSDisplayDialog: boolean = false;
    public NSIsProcessInProgress: boolean = false;    
    // End Template variables

    constructor(
        private _appRouter: AppRouter,
        private _userSessionService: UserConnectionService,
        private _dbConnectApiService: DbConnectApiService
    ) {}

    async ngOnInit() {
        await this.loadDisclaimer();
    }

    private async loadDisclaimer(): Promise<void> {

        const apiResult: ApiContentResult<Disclaimer> = await this._dbConnectApiService.GetDisclaimerAsync();
        if (apiResult.success){
            this._disclaimer = apiResult.content;
            this.NSMessage = this._disclaimer.disclaimerAgreement;
            this.NSDisplayDialog = true;
        }
    }

    public async NSOnConfirmClick(): Promise<void> {
        
        this.NSIsProcessInProgress = true;
        const userSession: UserConnection = this._userSessionService.GetCurrentUserSession;
        const apiResult: ApiResult = await this._dbConnectApiService.AcceptDisclaimerAsync(this._disclaimer.disclaimerID, userSession);
        if (apiResult.success){
            this._appRouter.RouteToDefault();
        }
        this.NSDisplayDialog = false;
    }
    
    public NSOnRejectClick(): void {
        this.NSIsProcessInProgress = true;
        this._userSessionService.OnDisclaimerReject();
        this.NSDisplayDialog = false;
        this._appRouter.RouteToLogin();
    }
}
