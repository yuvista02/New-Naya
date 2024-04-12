import { MsalGuardConfiguration, MsalInterceptorConfiguration } from "@azure/msal-angular";
import {
    BrowserCacheLocation, IPublicClientApplication, 
    InteractionType, PublicClientApplication 
}                                                               from "@azure/msal-browser";
import { LogLevel }                                             from "@azure/msal-common";
// MS Imports
import { NayaAppConfigService }                                 from "@naya-core/services/naya-app-config.service";
import { RoutePath }                                            from "@naya-shared/constants/route-path";

/**
 * Set your default interaction type for MSALGuard here. If you have any
 * additional scopes you want the user to consent upon login, add them here as well.
 */
export function msalGuardConfigFactory(config: NayaAppConfigService): MsalGuardConfiguration {
    const msalAuthConfig = config.GetMsalConfig();
    const guardConfig: MsalGuardConfiguration = {
        interactionType: InteractionType.Redirect,
        authRequest: { scopes: msalAuthConfig.scope }
    };
    return guardConfig;
}


/**
 * Here we pass the configuration parameters to create an MSAL instance.
 * For more info, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/configuration.md
 */
export function msalInstanceFactory(config: NayaAppConfigService
    ): IPublicClientApplication {
    
    const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

    const msalAuthConfig = config.GetMsalConfig();
    return new PublicClientApplication({
            auth: {
                clientId: msalAuthConfig.clientID,
                authority: msalAuthConfig.authority,
                redirectUri: msalAuthConfig.redirectUri,
                postLogoutRedirectUri: '/#/' + RoutePath.Login,
                knownAuthorities: [],

                //clientCapabilities: ['CP1'] // This lets the resource server know that this client can handle claim challenges.
                navigateToLoginRequestUrl: false // This stops from double redirect issue, see: "https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/2514#issuecomment-723805679"
            },
            cache: {
                cacheLocation: BrowserCacheLocation.LocalStorage,
                storeAuthStateInCookie: isIE
            },
            system: {
                /**
                 * Below you can configure MSAL.js logs. For more information, visit:
                 * https://docs.microsoft.com/azure/active-directory/develop/msal-logging-js
                 */
                loggerOptions: {
                    loggerCallback(logLevel: LogLevel, message: string) {
                        switch (logLevel) {
                            case LogLevel.Error:
                                console.error(message);
                                return;
                            case LogLevel.Info:
                                console.info(message);
                                return;
                            case LogLevel.Verbose:
                                console.debug(message);
                                return;
                            case LogLevel.Warning:
                                console.warn(message);
                                return;
                        }
                    },
                    logLevel: LogLevel.Info,
                    piiLoggingEnabled: true
                }
            }
        });
}


/**
 * MSAL Angular will automatically retrieve tokens for resources
 * added to protectedResourceMap. For more info, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/initialization.md#get-tokens-for-web-api-calls
 */
export function msalInterceptorConfigFactory(nayaAppConfigService: NayaAppConfigService
    ): MsalInterceptorConfiguration {

    const resourceMap = new Map<string, Array<string> | null>();
    const nayaConfig = nayaAppConfigService.GetNayaConfig();
    const msalConfig = nayaAppConfigService.GetMsalConfig();

    resourceMap.set(nayaConfig.apiUrl, msalConfig.scope);

    return {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: resourceMap,
    };
}