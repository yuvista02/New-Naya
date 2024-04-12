import { NgClass, NgIf }                from "@angular/common";
import {
    AfterViewInit,
    Component,
    HostListener,
    OnDestroy,
    OnInit,
    Renderer2
}                                       from "@angular/core";
import { RouterOutlet }                 from "@angular/router";

// Third Party Imports
import { AppBreadcrumbComponent }       from "@app-layout/app-breadcrumb/app.breadcrumb.component";
import { MenuService }                  from "@app-layout/services/app.menu.service";
import { Message, PrimeNGConfig }       from "primeng/api";
import { InputSwitchChangeEvent }                             from "primeng/inputswitch";
import { ToastModule }                  from "primeng/toast";

// Naya-Imports
import { AppInlineMenuComponent }       from "@app-layout/app-inline-menu/app.inlinemenu.component";
import { AppMenuComponent }             from "@app-layout/app-menu/app.menu.component";
import { AppTopBarComponent }           from "@app-layout/app-topbar/app.topbar.component";
import { AppConfigComponent }           from "@app/app-config/app.config.component";
import { AppComponent }                 from "@app/app.component";
import { NayaGoToTopButtonComponent }   from "@naya-shared/components/naya-go-to-top-button/naya-go-to-top-button.component";

@Component({
    selector: "app-main",
    templateUrl: "./app.main.component.html",
    standalone: true,
    imports: [
        NgClass,
        ToastModule,
        AppTopBarComponent,
        NgIf,
        AppInlineMenuComponent,
        AppMenuComponent,
        AppBreadcrumbComponent,
        RouterOutlet,
        AppConfigComponent,
        NayaGoToTopButtonComponent,
    ],
})
export class AppMainComponent implements AfterViewInit, OnInit, OnDestroy {
    refreshChart!: () => void;
    topbarMenuActive: boolean = false;

    menuActive: boolean = false;

    staticMenuDesktopInactive: boolean = false;

    mobileMenuActive: boolean = false;

    menuClick: boolean = false;

    mobileTopbarActive: boolean = false;

    topbarRightClick: boolean = false;

    topbarItemClick: boolean = false;

    activeTopbarItem: string = String.empty;

    documentClickListener!: () => void;

    configActive: boolean = false;

    configClick: boolean = false;

    rightMenuActive: boolean = false;

    menuHoverActive = false;

    searchClick = false;

    search = false;

    currentInlineMenuKey: string = String.empty;

    inlineMenuActive: { [key: string]: boolean } = {};

    inlineMenuClick: boolean = false;
    public MSMessages: Message[] = [];

    constructor(
        public renderer: Renderer2,
        private menuService: MenuService,
        private primengConfig: PrimeNGConfig,
        public app: AppComponent,
    ) { }

    ngOnInit() {
        this.menuActive = true;
    }

    ngAfterViewInit() {
        // hides the horizontal submenus or top menu if outside is clicked
        this.documentClickListener = this.renderer.listen(
            "body",
            "click",
            () => {
                if (!this.topbarItemClick) {
                    this.activeTopbarItem = String.empty;
                    this.topbarMenuActive = false;
                }

                if (!this.menuClick && (this.isHorizontal() || this.isSlim())) {
                    this.menuService.reset();
                }

                if (this.configActive && !this.configClick) {
                    this.configActive = false;
                }

                if (!this.menuClick) {
                    if (this.mobileMenuActive) {
                        this.mobileMenuActive = false;
                    }

                    if (this.isOverlay()) {
                        this.menuActive = false;
                    }

                    this.menuHoverActive = false;
                    this.unblockBodyScroll();
                }

                if (!this.searchClick) {
                    this.search = false;
                }

                if (
                    this.inlineMenuActive[this.currentInlineMenuKey] &&
                    !this.inlineMenuClick
                ) {
                    this.inlineMenuActive[this.currentInlineMenuKey] = false;
                }

                this.inlineMenuClick = false;
                this.searchClick = false;
                this.configClick = false;
                this.topbarItemClick = false;
                this.topbarRightClick = false;
                this.menuClick = false;
            }
        );
    }


    onMenuButtonClick(event: Event | undefined) {
        this.menuActive = !this.menuActive;
        this.topbarMenuActive = false;
        this.topbarRightClick = true;
        this.menuClick = true;

        if (this.isDesktop()) {
            this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
        } else {
            this.mobileMenuActive = !this.mobileMenuActive;
            if (this.mobileMenuActive) {
                this.blockBodyScroll();
            } else {
                this.unblockBodyScroll();
            }
        }

        event?.preventDefault();
    }

    onTopbarMobileButtonClick(event: Event) {
        this.mobileTopbarActive = !this.mobileTopbarActive;
        event.preventDefault();
    }

    onRightMenuButtonClick(event: Event) {
        this.rightMenuActive = !this.rightMenuActive;
        event.preventDefault();
    }

    onMenuClick() {
        this.menuClick = true;

        if (
            this.inlineMenuActive[this.currentInlineMenuKey] &&
            !this.inlineMenuClick
        ) {
            this.inlineMenuActive[this.currentInlineMenuKey] = false;
        }
    }

    onInlineMenuClick(key: string) {
        if (key !== this.currentInlineMenuKey) {
            this.inlineMenuActive[this.currentInlineMenuKey] = false;
        }

        this.inlineMenuActive[key] = !this.inlineMenuActive[key];
        this.currentInlineMenuKey = key;
        this.inlineMenuClick = true;
    }

    onTopbarItemClick(event: Event, item: string) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = String.empty;
        } else {
            this.activeTopbarItem = item;
        }

        if (item === "search") {
            this.search = !this.search;
            this.searchClick = !this.searchClick;
        }

        event.preventDefault();
    }

    onTopbarSubItemClick(event: Event) {
        event.preventDefault();
    }

    onRTLChange(event: InputSwitchChangeEvent) {
        this.app.isRTL = event.checked;
    }

    onRippleChange(event: InputSwitchChangeEvent) {
        this.app.ripple = event.checked;
        this.primengConfig.ripple = event.checked;
    }

    onConfigClick() {
        this.configClick = true;
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return window.innerWidth <= 991;
    }

    isOverlay() {
        return this.app.menuMode === "overlay";
    }

    isStatic() {
        return this.app.menuMode === "static";
    }

    isHorizontal() {
        return this.app.menuMode === "horizontal";
    }

    isSlim() {
        return this.app.menuMode === "slim";
    }

    public get NSShowInlineMenu(): boolean {
        return this.app.ShowInlineMenu;
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add("blocked-scroll");
        } else {
            document.body.className += " blocked-scroll";
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove("blocked-scroll");
        } else {
            document.body.className = document.body.className.replace(
                new RegExp(
                    "(^|\\b)" +
                    "blocked-scroll".split(" ").join("|") +
                    "(\\b|$)",
                    "gi"
                ),
                " "
            );
        }
    }
    @HostListener('window:keyup', ['$event'])
    public MSOnKeyPress($event: KeyboardEvent) {
        if ($event.ctrlKey && $event.key === "[")
            this.onMenuButtonClick($event);
    }
    ngOnDestroy() {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    }
}
