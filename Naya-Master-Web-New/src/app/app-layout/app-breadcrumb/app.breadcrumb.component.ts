import { Component, OnDestroy }                 from "@angular/core";
import { CommonModule }                         from "@angular/common";
// Third Party IMports
import { MenuItem }                             from "primeng/api";
import { BreadcrumbModule }                     from "primeng/breadcrumb";
import { ButtonModule }                         from "primeng/button";
import { DialogService }                        from "primeng/dynamicdialog";
import { Subscription }                         from "rxjs";
//Naya Imports
import { AppBreadcrumbService }                 from "@app-layout/services/app.breadcrumb.service";
import { RoutePath }                            from "@naya-shared/constants/route-path";
import { HistoryService }                       from "@naya-shared/services/history.service";

@Component({
    selector: "app-breadcrumb",
    templateUrl: "./app.breadcrumb.component.html",
    styleUrls: ["./app.breadcrumb.component.scss"],
    standalone: true,
    imports: [BreadcrumbModule, ButtonModule, CommonModule],
    providers: [DialogService]
})
export class AppBreadcrumbComponent implements OnDestroy {
    subscription: Subscription;
    homeSubscription: Subscription;
    headerName!: Subscription;
    items: MenuItem[] = [];
    home: MenuItem;
    constructor(
        public _appBreadcrumbService: AppBreadcrumbService,
            private _historyService: HistoryService
    ) {
        this.subscription = _appBreadcrumbService.itemsHandler.subscribe(
            (response) => {
                this.items = response;
            }
        );
        this.homeSubscription = _appBreadcrumbService.homeHandler.subscribe(
            (response) => {
                this.home = response;
            }
        );
        this.home = { icon: "pi pi-home", routerLink: [RoutePath.Empty] };
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.homeSubscription.unsubscribe();
        }
        if(this.headerName) {
            this.headerName.unsubscribe();
        }
    }

    public NSDisplayButton(): boolean {
        return this._historyService.MSShowButton;
    }

    public OnClickHistory(): void {
    }
}