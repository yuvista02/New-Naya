import { Injectable }   from "@angular/core";
import { Router }       from "@angular/router";
import { RoutePath } from "@app/naya-shared/constants/route-path";

@Injectable()
export class AppRouter {
    constructor(private _router: Router) { }

    public RouteToLogin() {
        this._router.navigate([RoutePath.Login], {
            state: { bypassUnsavedChangeGuard: true },
        });
    }

    public RouteToPostLogout() {
        this._router.navigate([RoutePath.PostLogout], {
            state: { bypassUnsavedChangeGuard: true },
        });
    }

    public RouteToConnectUserPage(environmentName: string) {
        this._router.navigate([RoutePath.ConnectUser, environmentName]);
    }

    public RouteToDisclaimerPage() {
        this._router.navigate([RoutePath.DisclaimerAgreement]);
    }

    public RouteToDefault() {
        this._router.navigate([RoutePath.Empty]);
    }
}
