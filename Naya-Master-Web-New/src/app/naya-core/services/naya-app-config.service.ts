import { Injectable }                                           from "@angular/core";
// MS Imports
import { NayaConfig, NayaEnvironmentConfig, NayaMsalConfig, }   from "@naya-core/api/response/naya-environment-config.response";
import { environment }                                          from 'src/environments/environment';

@Injectable()
export class NayaAppConfigService {
    private readonly _prodConfigFilePath = "naya-config/naya-config.json";
    private readonly _debugRunConfigFilePath = `naya-config/staging/naya-config.json`;
    private _nayaEnvironmentConfig!: NayaEnvironmentConfig;

    constructor() { }

    public LoadAppConfig(): Promise<void> {
        const nayaConfigFilePath = environment.production ? this._prodConfigFilePath : this._debugRunConfigFilePath;

        return fetch(nayaConfigFilePath)
            .then((response: Response) => response.json())
            .then((config) => {
                this._nayaEnvironmentConfig = config;
            })
            .catch((error) => {
                console.log(error)
            });
    }

    public GetNayaConfig(): NayaConfig {
        return this._nayaEnvironmentConfig.naya;
    }

    public GetMsalConfig(): NayaMsalConfig {
        return this._nayaEnvironmentConfig.msal;
    }

    public GetAppInsightsInstrumentationKey(): string {
        return this._nayaEnvironmentConfig.appInsightsInstrumentationKey;
    }
}