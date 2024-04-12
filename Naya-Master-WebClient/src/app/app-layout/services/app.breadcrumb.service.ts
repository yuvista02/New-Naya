import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MenuItem } from "primeng/api";
import { RoutePath } from "@app/naya-shared/constants/route-path";

@Injectable()
export class AppBreadcrumbService {
    private itemsSource = new Subject<MenuItem[]>();
    itemsHandler = this.itemsSource.asObservable();
    private homeSource = new Subject<MenuItem>();
    homeHandler = this.homeSource.asObservable();
    public MSDisplayWopiCloseButton: boolean = false;
    setItems(items: MenuItem[]) {
        this.itemsSource.next(items);
    }
    setHomeAsEnvironment() {
        const home = { icon: "pi pi-home", routerLink: "/environment" };
        this.homeSource.next(home);
    }
    public setHomeAsDocumentSearch(environmentName: string) {
        let home: MenuItem = {
            icon: "pi pi-home",
            routerLink: RoutePath.NayaRoles,
            label: `      ${environmentName}`,
        };
        this.homeSource.next(home);
    }

    public SetLandingPageBreadcrumb(label: string) {
        this.setItems([
            {
                label: label.getDisplayName(),
                routerLink: null
            }
        ]);
    }

    public SetEditPageBreadcrumb(label: string, routerLink: string, id: number | null) {

        this.setItems([
            {
                label: label.getDisplayName(),
                routerLink: [routerLink]
            },
            {
                label: id ? 'Edit' : 'Add',
                routerLink: null
            }
        ]);
    }

    public SetSimple(crumbs: string[]) {
        const items: MenuItem[] = crumbs.map(s => (
            {
                label: s.getDisplayName(),
                //routerLink: [ this._environmentRoutePathService.GetBasePath()]
            }
        ));

        this.setItems(items);
    }

    // // Case: multiple layer breadcrumb
    // public SetLandingPageBreadcrumb_v2(
    //     routePath1: string,
    //     routePath2: string, routeLink2: string | null, routeParam: string | number | null
    // ) {
    //     const items: MenuItem[] = [
    //         { label: routePath1.getDisplayName(), routerLink: [routePath1] },
    //         { label: routePath2.getDisplayName(), routerLink: routeLink2 ? [routePath1, routeParam, routeLink2] : null },
    //     ];

    //     this.setItems(items);
    // }

    // public SetEditPageBreadcrumb_v2(label1: string, routerLink1: string, id: number | null) {

    //     this.setItems([
    //         {
    //             label: label1,
    //             routerLink: [routerLink1]
    //         },
    //         {
    //             label: id ? 'Edit' : 'Add',
    //             routerLink: null
    //         }
    //     ]);
    // }
}
