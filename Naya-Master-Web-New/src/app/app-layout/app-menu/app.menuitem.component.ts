import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router, RouterLinkActive, RouterLink } from "@angular/router";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
// Naya Imports
import { MenuService } from "@app-layout/services/app.menu.service";
import { AppMainComponent } from "@app-main/app.main.component";
import { TooltipModule } from "primeng/tooltip";
import { RippleModule } from "primeng/ripple";
import { NgIf, NgClass, NgFor } from "@angular/common";

@Component({
    /* tslint:disable:component-selector */
    selector: "[app-menuitem]",
    /* tslint:enable:component-selector */
    templateUrl: "./app.menuitem.component.html",
    styleUrls: ["./app.menuitem.component.scss"],
    host: {
        "[class.layout-root-menuitem]": "root || active",
        "[class.active-menuitem]": "(active)",
    },
    animations: [
        trigger("children", [
            state("void", style({
                height: "0px",
                padding: "0px",
            })),
            state("hiddenAnimated", style({
                height: "0px",
                padding: "0px",
            })),
            state("visibleAnimated", style({
                height: "*",
            })),
            state("visible", style({
                height: "*",
            })),
            state("hidden", style({
                height: "0px",
                padding: "0px",
            })),
            transition("visibleAnimated => hiddenAnimated", animate("400ms cubic-bezier(0.86, 0, 0.07, 1)")),
            transition("hiddenAnimated => visibleAnimated", animate("400ms cubic-bezier(0.86, 0, 0.07, 1)")),
            transition("void => visibleAnimated, visibleAnimated => void", animate("400ms cubic-bezier(0.86, 0, 0.07, 1)")),
        ]),
    ],
    standalone: true,
    imports: [
        NgIf,
        RouterLinkActive,
        RippleModule,
        RouterLink,
        NgClass,
        TooltipModule,
        NgFor,
    ],
})
export class AppMenuitemComponent implements OnInit, OnDestroy {
    @Input() item: any;

    @Input() index: number = 0;

    @Input() root: boolean = false;

    @Input() parentKey: string = String.empty;

    active = false;

    menuSourceSubscription: Subscription;

    menuResetSubscription: Subscription;

    key: string = String.empty;

    constructor(
        public app: AppMainComponent,
        public router: Router,
        private menuService: MenuService
    ) {
        this.menuSourceSubscription = this.menuService.menuSource$.subscribe(
            (key) => {
                // deactivate current active menu
                if (
                    this.active &&
                    this.key !== key &&
                    key.indexOf(this.key) !== 0
                ) {
                    this.active = false;
                }
            }
        );

        this.menuResetSubscription = this.menuService.resetSource$.subscribe(
            () => {
                this.active = false;
            }
        );

        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((_params) => {
                if (this.app.isHorizontal() || this.app.isSlim()) {
                    this.active = false;
                } else {
                    if (this.item.routerLink) {
                        this.updateActiveStateFromRoute();
                    } else {
                        this.active = false;
                    }
                }
            });
    }

    ngOnInit() {
        if (
            !(this.app.isHorizontal() || this.app.isSlim()) &&
            this.item.routerLink
        ) {
            this.updateActiveStateFromRoute();
        }

        this.key = this.parentKey
            ? this.parentKey + "-" + this.index
            : String(this.index);
    }

    updateActiveStateFromRoute() {
        this.active = this.router.isActive(
            this.item.routerLink[0],
            this.item.items ? false : true
        );
    }

    itemClick(event: Event) {
        // avoid processing disabled items
        if (this.item.disabled) {
            event.preventDefault();
            return;
        }

        // navigate with hover in horizontal mode
        if (this.root) {
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }

        // notify other items
        this.menuService.onMenuStateChange(this.key);

        const itemExpanded = this.item.expanded;
        // execute command
        if (this.item.command) {
            this.item.command({ originalEvent: event, item: this.item });
        }

        // toggle active state
        if (this.item.items) {
            this.item.expanded = !itemExpanded;
        } else {
            // activate item
            this.active = true;

            // reset horizontal and slim menu
            if (this.app.isHorizontal() || this.app.isSlim()) {
                this.menuService.reset();
                this.app.menuHoverActive = false;
            }

            if (!this.app.isStatic()) {
                this.app.menuActive = false;
            }

            this.app.mobileMenuActive = false;
        }

        this.removeActiveInk(event);
    }

    onMouseEnter() {
        // activate item on hover
        if (
            this.root &&
            (this.app.isHorizontal() || this.app.isSlim()) &&
            this.app.isDesktop()
        ) {
            if (this.app.menuHoverActive) {
                this.menuService.onMenuStateChange(this.key);
                this.active = true;
            }
        }
    }

    removeActiveInk(event: Event) {
        const currentTarget = event.currentTarget as HTMLElement;
        setTimeout(() => {
            if (currentTarget) {
                const activeInk = currentTarget.querySelector(".p-ink-active");
                if (activeInk) {
                    if (activeInk.classList) {
                        activeInk.classList.remove("p-ink-active");
                    } else {
                        activeInk.className = activeInk.className.replace(
                            new RegExp(
                                "(^|\\b)" +
                                "p-ink-active".split(" ").join("|") +
                                "(\\b|$)",
                                "gi"
                            ),
                            " "
                        );
                    }
                }
            }
        }, 401);
    }

    ngOnDestroy() {
        if (this.menuSourceSubscription) {
            this.menuSourceSubscription.unsubscribe();
        }

        if (this.menuResetSubscription) {
            this.menuResetSubscription.unsubscribe();
        }
    }
}
