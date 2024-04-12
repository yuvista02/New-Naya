import { Injectable } from '@angular/core';
// MS Imports
import { ConnectUserDto } from '@naya-core/models/connect-user-dto.model';
import { NayaApiClient } from '@naya-core/services/naya-api.client';
import { ApiContentResult, ApiResult } from '@naya-core/models/api-result';
import { DisclaimerAgreement } from '@naya-core/models/disclaimer-agreement.model';
import { Disclaimer } from '@naya-core/api/response/disclaimer.response';
import { UserConnection } from '@naya-core/api/response/user-session.response';
import { FieldValues } from '@naya-shared/constants/field-values';
import { ConstantString } from '@naya-shared/constants/constant-string';

@Injectable()
export class DbConnectApiService {
    
    constructor(private _nayaApiClient: NayaApiClient) { }
    
    private get baseUrl(): string {
        return `${ConstantString.Version1}/DatabaseConnect`;
    }

    public async ConnectUserAsync(connectUserDto: ConnectUserDto): Promise<ApiContentResult<UserConnection>> {
        
        const url = `${this.baseUrl}/connectuser`;
        return this._nayaApiClient.postWithResultAsync<ConnectUserDto, UserConnection>(url, connectUserDto);
    }
    
    public async DisconnectUserAsync(disconnectUserDto: { reason: string }): Promise<any> {
        
        const url = `${this.baseUrl}/DisconnectUser`;
        return this._nayaApiClient.postWithResultAsync(url, disconnectUserDto);
    }
    
    public async GetDisclaimerAsync(): Promise<ApiContentResult<Disclaimer>> {
        
        const url = `${this.baseUrl}/getDisclaimer/${FieldValues.WEB}`;
        return this._nayaApiClient.getAsync<Disclaimer>(url);
    }
    
    public async AcceptDisclaimerAsync(disclaimerID: number, userSession: UserConnection): Promise<ApiResult> {

        const disclaimerAgreement = new DisclaimerAgreement();
        disclaimerAgreement.disclaimerID = disclaimerID;
        disclaimerAgreement.userSessionID = userSession.userConnectionID;
        disclaimerAgreement.preferredUserName = userSession.preferredUserName;
        
        const url = `${this.baseUrl}/acceptdisclaimer`;
        return this._nayaApiClient.putAsync(url, disclaimerAgreement);
    }
}
