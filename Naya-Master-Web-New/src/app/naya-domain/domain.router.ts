// Naya Auto Generated (1.6.0) at 4/10/2024 11:11:11 AM
// Naya Auto Generated (1.6.0) at 4/10/2024 7:47:51 AM
import { Injectable }   from "@angular/core";
import { Router }       from "@angular/router";
import { RoutePath }    from '@naya-shared/constants/route-path';

@Injectable()
export class DomainRouter {
    constructor(private _router: Router) { }

    // NayaRole Start
    public RouteToNayaRole(...command: (string | number)[]) {
        this._router.navigate([RoutePath.NayaRoles, ...command]);
    }

    public RouteToNayaRoleCreate(): void {
        this.RouteToNayaRole(RoutePath.Add);
    }

    public RouteToNayaRoleEdit(nayaRoleID: number) {
        this.RouteToNayaRole(nayaRoleID, RoutePath.Edit);
    }
    // NayaRole End


    // UserConnection Start
    public RouteToUserConnection(...command: (string | number)[]) {
        this._router.navigate([RoutePath.UserConnection, ...command]);
    }

    public RouteToUserConnectionCreate(): void {
        this.RouteToUserConnection(RoutePath.Add);
    }

    public RouteToUserConnectionEdit(userConnectionID: number) {
        this.RouteToUserConnection(userConnectionID, RoutePath.Edit);
    }
    // UserConnection End

    // Placeholder Router
}
