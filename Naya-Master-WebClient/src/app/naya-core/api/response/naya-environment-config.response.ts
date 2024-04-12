export interface NayaEnvironmentConfig {
    msal: NayaMsalConfig;
    naya: NayaConfig;
    appInsightsInstrumentationKey: string;
}

export interface NayaConfig {
    apiUrl: string;
}

export interface NayaMsalConfig {
    clientID: string;
    authority: string;
    scope: [];
    redirectUri: string;
}