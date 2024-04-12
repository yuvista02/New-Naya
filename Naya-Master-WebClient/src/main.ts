import { HashLocationStrategy, LocationStrategy }                               from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi }         from '@angular/common/http';
import { 
    APP_INITIALIZER, ErrorHandler, 
    enableProdMode, importProvidersFrom, inject 
}                                                                               from '@angular/core';
import { FormsModule }                                                          from '@angular/forms';
import { BrowserModule, bootstrapApplication }                                  from '@angular/platform-browser';
import { provideAnimations }                                                    from '@angular/platform-browser/animations';
import {
    NavigationError, Router, provideRouter,
    withComponentInputBinding, withNavigationErrorHandler
}                                                                               from '@angular/router';
// Third party imports
import { AppBreadcrumbService }                                                 from '@app-layout/services/app.breadcrumb.service';
import { MenuService }                                                          from '@app-layout/services/app.menu.service';
import { AppMainComponent }                                                     from '@app-main/app.main.component';
import {
    MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG,
    MsalBroadcastService, MsalGuard,
    MsalInterceptor, MsalService
}                                                                               from '@azure/msal-angular';
import { ConfirmationService, MessageService }                                  from 'primeng/api';
// MS Imports
import { AppComponent }                                                         from '@app/app.component';
import { AppRouter }                                                            from '@app/app.router';
import { appRoutes }                                                            from '@app/app.routes';
import { NayaAppState }                                                         from '@app/naya-app-state';
import { appInitializerFn }                                                     from '@naya-core/factory/app-initializer-factory';
import { 
    msalGuardConfigFactory, msalInstanceFactory, 
    msalInterceptorConfigFactory 
}                                                                               from '@naya-core/factory/msal-auth-factory';
import { NayaUserSessionHeaderInterceptor }                                     from '@naya-core/interceptor/naya-user-session-header.interceptor';
import { NayaErrorHandler }                                                     from '@naya-core/naya-error-handler/naya-error-handler';
import { NayaApiInterceptor }                                                   from '@naya-core/interceptor/naya-api.interceptor';
import { DbConnectApiService }                                                  from '@naya-core/api/db-connect-api.service';
import { EnvironmentApiService }                                                from '@naya-core/api/environment-api.service';
import { ComponentUtilityService }                                              from '@naya-core/services/component-utility.service';
import { NayaAppConfigService }                                                 from '@naya-core/services/naya-app-config.service';
import { NayaApplicationInsight }                                               from '@naya-core/services/naya-application-insight.service';
import { UserConnectionService }                                                   from '@naya-core/services/user-session.service';
import { NayaApiClient }                                                        from '@naya-core/services/naya-api.client';
import { NayaFetchAPIService }                                                  from '@naya-core/services/naya-fetch-api.service';
import { FileSaverService }                                                     from '@naya-core/services/naya-file-saver.service';
import { MsalWrapperService }                                                   from '@naya-core/services/msal-wrapper-service';
import { NayaMenuItemService }                                                  from '@app/naya-menu-item.service';
import { NayaMessageService }                                                   from '@naya-shared/services/naya-message.service';
import { FileService }                                                          from '@naya-shared/services/file.service';
import { environment }                                                          from 'src/environments/environment';

if (environment.production) {
    enableProdMode();
}

const nayaAppState = new NayaAppState();

bootstrapApplication(AppComponent, {
    providers: [
        {
            provide: NayaAppState,
            useValue: nayaAppState
        },
        NayaErrorHandler,
        NayaAppConfigService,
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: ErrorHandler,
            useClass: NayaErrorHandler,
        },
        provideRouter(appRoutes,
            withComponentInputBinding(),
            withNavigationErrorHandler((err: NavigationError) => inject(NayaErrorHandler).HandleRouteError(err)) // disabled initial navigation because it tries to resolve MsalGuard, before appInitializer
        ),
        NayaApplicationInsight,
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFn,
            multi: true,
            deps: [NayaAppConfigService, NayaApplicationInsight, Router],
        },

        // MSAL Injection Start
        {
            provide: MSAL_INSTANCE,
            useFactory: msalInstanceFactory,
            deps: [NayaAppConfigService]
        },
        {
            provide: MSAL_GUARD_CONFIG,
            useFactory: msalGuardConfigFactory,
            deps: [NayaAppConfigService]
        },
        {
            provide: MSAL_INTERCEPTOR_CONFIG,
            useFactory: msalInterceptorConfigFactory,
            deps: [NayaAppConfigService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MsalInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NayaUserSessionHeaderInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NayaApiInterceptor,
            multi: true,
        },
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        MsalService,
        MsalBroadcastService,
        MsalGuard,
        // MSAL Injection End

        // Angular Modules
        importProvidersFrom(BrowserModule, FormsModule,),
        provideAnimations(),

        // Primeng services required for bootstrap: Start
        ConfirmationService,
        MessageService,
        MenuService,
        // Primeng services required for bootstrap: End

        // Naya services required for Bootstrap: Start
        NayaApiClient,
        FileSaverService,
        DbConnectApiService,
        NayaMessageService,
        UserConnectionService,
        NayaFetchAPIService,
        AppBreadcrumbService,
        NayaMenuItemService,
        EnvironmentApiService,
        MsalWrapperService,
        ComponentUtilityService,
        AppRouter,
        // Naya services required for Bootstrap: End

        FileService,
        AppComponent,
        AppMainComponent,

    ]
})
    .catch(err => console.error(err));

