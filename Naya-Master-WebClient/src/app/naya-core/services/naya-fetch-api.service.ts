import { Injectable }               from "@angular/core";
// MS Imports
import { MsalWrapperService }       from "@naya-core/services/msal-wrapper-service";
import { NayaAppConfigService } from "./naya-app-config.service";

// This service helps to keep the api request alive even after the application is closed.
@Injectable()
export class NayaFetchAPIService {
  
    private readonly _apiUrl: string;

    constructor(
        private _nayaConfig: NayaAppConfigService,
        private _msalWrapperService: MsalWrapperService
    ) { 
        this._apiUrl = this._nayaConfig.GetNayaConfig().apiUrl;
    }

    public doFetchPOST<T>(endPoint: string, nayaHeader: string, body: T): Promise<Response> {
        return this.fetch(FetchMethods.POST, nayaHeader, endPoint, body);
    }
    
    private async fetch<T>(method: string, nayaHeader: string, endPoint: string, body: T
        ): Promise<Response> {

        const url = `${this._apiUrl}/v1/${endPoint}`;
        const accessToken = await this._msalWrapperService.GetAccessToken();
        try {
            return await fetch(url, {
                keepalive: true,
                method: method,
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`,
                  'NayaUserConnection': nayaHeader
                },
                body: JSON.stringify(body),
              });
        }
        catch(error) {
            throw error;
        }       
   }

}
class FetchMethods {
    public static readonly POST: string = "POST";
    public static readonly PUT: string = "PUT";
}