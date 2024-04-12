// Naya Auto Generated (1.6.0) at 4/10/2024 11:11:11 AM
// Naya Auto Generated (1.6.0) at 4/10/2024 7:47:51 AM
import { Route } from "@angular/router";
import { UserSessionGuard } from "@app/naya-core/guards/user-session.guard";
import { NayaDashboardComponent } from "@app/naya-domain/naya-dashboard/naya-dashboard.component";
import { UserConnectionEditPageComponent } from "@app/naya-domain/naya-setup/naya-connections/naya-connections-edit-page/naya-connections-edit-page.component";
import { UserConnectionComponent } from "@app/naya-domain/naya-setup/naya-connections/naya-connections.component";
import { NayaRoleEditPageComponent } from "@app/naya-domain/naya-setup/naya-roles/naya-roles-edit-page/naya-roles-edit-page.component";
import { NayaRoleComponent } from "@app/naya-domain/naya-setup/naya-roles/naya-roles.component";
import { RouteParameter } from "@app/naya-shared/constants/route-parameter";
import { MsalGuard } from "@azure/msal-angular";
import { RoutePath } from "@naya-shared/constants/route-path";

export const DomainRoutes: Route[] = [
    {
        path: RoutePath.Dashboard,
        component: NayaDashboardComponent,
        canActivate: [MsalGuard, UserSessionGuard],
    },
    {
        path: RoutePath.NayaRoles,
        canActivate: [MsalGuard, UserSessionGuard],
        children: [
            { path: RoutePath.Empty, component: NayaRoleComponent },
            { path: RoutePath.Add, component: NayaRoleEditPageComponent },
            { path: String.createRoute(RouteParameter.NayaRoleID.toRouteParam(), RoutePath.Edit), component: NayaRoleEditPageComponent },
        ]
    },
    {
        path: RoutePath.UserConnection,
        canActivate: [MsalGuard, UserSessionGuard],
        children: [
            { path: RoutePath.Empty, component: UserConnectionComponent },
            { path: RoutePath.Add, component: UserConnectionEditPageComponent },
            { path: String.createRoute(RouteParameter.UserConnectionID.toRouteParam(), RoutePath.Edit), component: UserConnectionEditPageComponent },
        ]
    },
    // Placeholder for route
];
