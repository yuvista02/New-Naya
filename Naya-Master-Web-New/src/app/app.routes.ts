import { Route, UrlSegment }                from '@angular/router';
// Third party imports
import { AppMainComponent }                 from '@app-main/app.main.component';
import { AppErrorComponent }                from '@app-pages/app.error.component';
import { NayaPostLogoutComponent }          from '@app-pages/naya-post-logout/naya-post-logout.component';
import { DomainRoutes } from '@app/naya-domain/domain.routes';
import { MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';
// MS Imports
import { DisclaimerAgreementComponent }     from '@naya-core/components/disclaimer-agreement/disclaimer-agreement.component';
import { NayaExternalComponent }            from '@naya-core/components/naya-external/naya-external.component';
import { NayaLoginComponent }               from '@naya-core/components/naya-login/naya-login.component';
import { RoutePath }                        from '@naya-shared/constants/route-path';
/**
 * MSAL Angular can protect routes in your application using MsalGuard. For more info, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/initialization.md#secure-the-routes-in-your-application
 */
export const appRoutes: Route[] = [
    { path: RoutePath.External, component: NayaExternalComponent },
    {
        path: RoutePath.Empty,
        component: AppMainComponent,
        canActivate: [MsalGuard],
        children: [
            ...DomainRoutes,
            { path: RoutePath.DisclaimerAgreement, component: DisclaimerAgreementComponent, canActivate: [MsalGuard] },
            { path: RoutePath.Empty, redirectTo: RoutePath.Dashboard, pathMatch: 'full' }
        ]
    },
    // This is to handle double navigation from msal.
    // MSAL redirects to a route starting with code={randomString}
    // Ref: https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/6772#issuecomment-1856494337
    {
        component: MsalRedirectComponent,
        matcher: (url: UrlSegment[]) => {
            return url.length === 1 && (url[0]?.path.startsWith('code=') || url[0]?.path.startsWith('state=')) ? { consumed: url } : null;
        },
    },
    { path: RoutePath.Error, component: AppErrorComponent },
    { path: RoutePath.PostLogout, component: NayaPostLogoutComponent },
    { path: RoutePath.Login, component: NayaLoginComponent },
];
