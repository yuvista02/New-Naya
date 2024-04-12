import { AnimationEvent, animate, style, transition, trigger } from "@angular/animations";
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ConfirmationService, MegaMenuItem, MenuItem } from "primeng/api";
import { Subscription } from "rxjs";
// MS Imports
import { AppBreadcrumbService } from "@app-layout/services/app.breadcrumb.service";
import { AppMainComponent } from "@app-main/app.main.component";
import { AppComponent } from "@app/app.component";
import { AppRouter } from "@app/app.router";
import { MsalWrapperService } from "@naya-core/services/msal-wrapper-service";
import { UserConnectionService } from "@naya-core/services/user-session.service";
import { NayaCustomDropdownComponent } from "../../naya-shared/components/naya-custom-dropdown/naya-custom-dropdown.component";
import { UserConnectionInfoComponent } from "../../naya-shared/components/user-connection-info/user-connection-info.component";
import { NgClass, NgIf } from "@angular/common";
import { RippleModule } from "primeng/ripple";
import { TooltipModule } from "primeng/tooltip";

@Component({
    selector: "app-topbar",
    templateUrl: "./app.topbar.component.html",
    styleUrls: ["./app.topbar.component.css"],
    animations: [
        trigger("topbarActionPanelAnimation", [
            transition(":enter", [
                style({ opacity: 0, transform: "scaleY(0.8)" }),
                animate(".12s cubic-bezier(0, 0, 0.2, 1)", style({ opacity: 1, transform: "*" })),
            ]),
            transition(":leave", [
                animate(".1s linear", style({ opacity: 0 })),
            ]),
        ]),
    ],
    standalone: true,
    imports: [
        TooltipModule,
        RippleModule,
        NgClass,
        UserConnectionInfoComponent,
        NgIf,
        NayaCustomDropdownComponent,
    ],
})
export class AppTopBarComponent implements OnInit, OnDestroy {
    activeItem: number = 0;

    private _appBreadcrumbSubscription$!: Subscription;
    private _notificationDisplaySubscription$!: Subscription;
    public MSItems: MenuItem[] = [];
    public MSNotificationCount: number = 0;
    public MSIsConnectedToDB: boolean = false;
    public NSLogoutMenuItems: MenuItem[] = [];
    
    @ViewChild("MSNotificationButton") public MSNotificationButton!: ElementRef;

    constructor(
        public appMain: AppMainComponent,
        public app: AppComponent,
        private _userSessionService: UserConnectionService,
        private _msalWrapperService: MsalWrapperService,
        private _appRouter: AppRouter,
        private _appBreadcrumbService: AppBreadcrumbService,
        private _confirmationService: ConfirmationService,
        ) {}

    ngOnInit(): void {
        this.doSubscribeToAppBreadcrumb();
        this.doSetLogoutMenuItems();
    }
    public OnNayaLogoClick() {
        if (this._userSessionService.IsConnectedToDatabase()) {
            this._appRouter.RouteToDefault();
        }
    }

    public NSLogout() {
        this.doLogout(); 
    }

    private doSetLogoutMenuItems() {
        this.NSLogoutMenuItems = [
            {
                label: "Sign out from Azure",
                icon: "pi pi-power-off",
                command: () => {
                    this.doSignOutFromAzure(); 
                },
            },
        ];
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
            }
            });
    }

    private doSignOutFromAzure() {
        this._confirmationService.confirm({
            message: `Are you sure to sign out from the azure? This will terminate your session from all active Naya applications.`,
            accept: async () => {
                
                if (!this._userSessionService.IsConnectedToDatabase()) {
                    this._msalWrapperService.DisconnectFromAzure();
                    return;
                }

                await this._userSessionService.DisconnectUserAsync();
                this._msalWrapperService.DisconnectFromAzure();
            },
        });
    }
    
    private doSubscribeToAppBreadcrumb() {
        this._appBreadcrumbSubscription$ =
            this._appBreadcrumbService.homeHandler.subscribe((value) => {
                this.MSIsConnectedToDB = !(value.routerLink === "/environment");
            });
    }

    model: MegaMenuItem[] = [
        {
            label: "UI KIT",
            items: [
                [
                    {
                        label: "UI KIT 1",
                        items: [
                            {
                                label: "Form Layout",
                                icon: "pi pi-fw pi-id-card",
                                routerLink: ["/uikit/formlayout"],
                            },
                            {
                                label: "Input",
                                icon: "pi pi-fw pi-check-square",
                                routerLink: ["/uikit/input"],
                            },
                            {
                                label: "Float Label",
                                icon: "pi pi-fw pi-bookmark",
                                routerLink: ["/uikit/floatlabel"],
                            },
                            {
                                label: "Button",
                                icon: "pi pi-fw pi-mobile",
                                routerLink: ["/uikit/button"],
                            },
                            {
                                label: "File",
                                icon: "pi pi-fw pi-file",
                                routerLink: ["/uikit/file"],
                            },
                        ],
                    },
                ],
                [
                    {
                        label: "UI KIT 2",
                        items: [
                            {
                                label: "Table",
                                icon: "pi pi-fw pi-table",
                                routerLink: ["/uikit/table"],
                            },
                            {
                                label: "List",
                                icon: "pi pi-fw pi-list",
                                routerLink: ["/uikit/list"],
                            },
                            {
                                label: "Tree",
                                icon: "pi pi-fw pi-share-alt",
                                routerLink: ["/uikit/tree"],
                            },
                            {
                                label: "Panel",
                                icon: "pi pi-fw pi-tablet",
                                routerLink: ["/uikit/panel"],
                            },
                            {
                                label: "Chart",
                                icon: "pi pi-fw pi-chart-bar",
                                routerLink: ["/uikit/charts"],
                            },
                        ],
                    },
                ],
                [
                    {
                        label: "UI KIT 3",
                        items: [
                            {
                                label: "Overlay",
                                icon: "pi pi-fw pi-clone",
                                routerLink: ["/uikit/overlay"],
                            },
                            {
                                label: "Media",
                                icon: "pi pi-fw pi-image",
                                routerLink: ["/uikit/media"],
                            },
                            {
                                label: "Menu",
                                icon: "pi pi-fw pi-bars",
                                routerLink: ["/uikit/menu"],
                            },
                            {
                                label: "Message",
                                icon: "pi pi-fw pi-comment",
                                routerLink: ["/uikit/message"],
                            },
                            {
                                label: "Misc",
                                icon: "pi pi-fw pi-circle-off",
                                routerLink: ["/uikit/misc"],
                            },
                        ],
                    },
                ],
            ],
        },
        {
            label: "UTILITIES",
            items: [
                [
                    {
                        label: "UTILITIES 1",
                        items: [
                            {
                                label: "Display",
                                icon: "pi pi-fw pi-desktop",
                                routerLink: ["utilities/display"],
                            },
                            {
                                label: "Elevation",
                                icon: "pi pi-fw pi-external-link",
                                routerLink: ["utilities/elevation"],
                            },
                        ],
                    },
                    {
                        label: "UTILITIES 2",
                        items: [
                            {
                                label: "FlexBox",
                                icon: "pi pi-fw pi-directions",
                                routerLink: ["utilities/flexbox"],
                            },
                        ],
                    },
                ],
                [
                    {
                        label: "UTILITIES 3",
                        items: [
                            {
                                label: "Icons",
                                icon: "pi pi-fw pi-search",
                                routerLink: ["utilities/icons"],
                            },
                        ],
                    },
                    {
                        label: "UTILITIES 4",
                        items: [
                            {
                                label: "Text",
                                icon: "pi pi-fw pi-pencil",
                                routerLink: ["utilities/text"],
                            },
                            {
                                label: "Widgets",
                                icon: "pi pi-fw pi-star-o",
                                routerLink: ["utilities/widgets"],
                            },
                        ],
                    },
                ],
                [
                    {
                        label: "UTILITIES 5",
                        items: [
                            {
                                label: "Grid System",
                                icon: "pi pi-fw pi-th-large",
                                routerLink: ["utilities/grid"],
                            },
                            {
                                label: "Spacing",
                                icon: "pi pi-fw pi-arrow-right",
                                routerLink: ["utilities/spacing"],
                            },
                            {
                                label: "Typography",
                                icon: "pi pi-fw pi-align-center",
                                routerLink: ["utilities/typography"],
                            },
                        ],
                    },
                ],
            ],
        },
    ];

    @ViewChild("searchInput") searchInputViewChild!: ElementRef;

    onSearchAnimationEnd(event: AnimationEvent) {
        switch (event.toState) {
            case "visible":
                this.searchInputViewChild.nativeElement.focus();
                break;
        }
    }

    ngOnDestroy(): void {
        this._appBreadcrumbSubscription$?.unsubscribe();
        this._notificationDisplaySubscription$?.unsubscribe();
    }
}