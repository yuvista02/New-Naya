import { Component, Input } from "@angular/core";
import {
    trigger,
    state,
    transition,
    style,
    animate,
} from "@angular/animations";
import { ConfirmationService } from "primeng/api";
import { AppMainComponent } from "@app-main/app.main.component";
import { AppComponent } from "@app/app.component";
import { MsalWrapperService } from "@naya-core/services/msal-wrapper-service";
import { UserConnectionService } from "@naya-core/services/user-session.service";
import { AppRouter } from "@app/app.router";
import { AppBreadcrumbService } from "@app-layout/services/app.breadcrumb.service";
import { TooltipModule } from "primeng/tooltip";
import { NgClass, NgStyle, NgIf } from "@angular/common";

@Component({
    selector: "app-inline-menu",
    templateUrl: "./app.inlinemenu.component.html",
    styleUrls: ["./app.inlinemenu.component.scss"],
    animations: [
        trigger("menu", [
            state("hiddenAnimated", style({
                height: "0px",
                paddingBottom: "0px",
                overflow: "hidden",
            })),
            state("visibleAnimated", style({
                height: "*",
                overflow: "visible",
            })),
            state("visible", style({
                opacity: 1,
                "z-index": 100,
            })),
            state("hidden", style({
                opacity: 0,
                "z-index": "*",
            })),
            transition("visibleAnimated => hiddenAnimated", animate("400ms cubic-bezier(0.86, 0, 0.07, 1)")),
            transition("hiddenAnimated => visibleAnimated", animate("400ms cubic-bezier(0.86, 0, 0.07, 1)")),
            transition("visible => hidden", animate(".1s linear")),
            transition("hidden => visible", [
                style({ transform: "scaleY(0.8)" }),
                animate(".12s cubic-bezier(0, 0, 0.2, 1)"),
            ]),
        ]),
    ],
    standalone: true,
    imports: [
        NgClass,
        NgStyle,
        TooltipModule,
        NgIf,
    ],
})
export class AppInlineMenuComponent {
    @Input() key: string = "inline-menu";
    @Input() style: any;
    @Input() styleClass: string = String.empty;
    active: boolean = false;
    public MSShowChangeEnvironment: boolean = true;

    constructor(
        public appMain: AppMainComponent,
        public app: AppComponent,
        private _msalWrapperService: MsalWrapperService,
        private _userSessionService: UserConnectionService,
        private _confirmationService: ConfirmationService,
        private _appRouter: AppRouter,
        private _appBreadcrumbService: AppBreadcrumbService,
    ) {
        this._appBreadcrumbService.homeHandler.subscribe((value) => {
            if (value.routerLink === "/environment") {
                this.MSShowChangeEnvironment = false;
            } else {
                this.MSShowChangeEnvironment = true;
            }
        });
    }

    onClick() {
        this.appMain.onInlineMenuClick(this.key);
        event?.preventDefault();
    }

    public get MSIsRTL(): boolean {
        return this.app.isRTL;
    }

    public get MSIsInlineMenuActive(): boolean {
        return this.appMain.inlineMenuActive[this.key] as boolean;
    }

    get isTooltipDisabled() {
        return !(this.appMain.isSlim() && !this.appMain.isMobile());
    }

    get tabIndex() {
        return !this.appMain.inlineMenuActive ? "-1" : null;
    }

    isHorizontalActive() {
        return this.appMain.isHorizontal() && !this.appMain.isMobile();
    }

    public get NSAzureUserName(): string {
        return this._msalWrapperService.GetLoggedUserName;
    }

    public get NSAzureFullName(): string {
        return this._msalWrapperService.GetLoggedUserFullName;
    }

    public get IsConnectedToNaya(): boolean {
        return this._userSessionService.IsConnectedToDatabase();
    }

    public OnClickLogout() {
        this.doLogout();
    }

    private doLogout() {
        this._confirmationService.confirm({
            message: `Are you sure to log out from the application?`,
            accept: async () => {
                if (!this._userSessionService.IsConnectedToDatabase()) {
                    this._appRouter.RouteToPostLogout();
                    return;
                }
                
                await this._userSessionService.DisconnectUserAsync();
                this._appRouter.RouteToPostLogout();
            },
        });
    }
}
