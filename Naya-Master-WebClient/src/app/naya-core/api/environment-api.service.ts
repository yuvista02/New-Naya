import { Injectable } from '@angular/core';
// MS Imports
import { NayaApiClient } from '@naya-core/services/naya-api.client';
import { ApiContentResult } from '@naya-core/models/api-result';
import { EnvironmentGet } from './response/environment-get.response';
import { NayaApp } from 'src/naya-config/naya-app';
import { ConstantString } from '@naya-shared/constants/constant-string';

@Injectable()
export class EnvironmentApiService {
    
  constructor(private _nayaClient: NayaApiClient) { }
    
  private get baseUrl(): string {
    return `${ConstantString.Version1}/Environment`;
  }

  public async GetEnvironmentList(): Promise<ApiContentResult<EnvironmentGet[]>> {
        
    const url = `${this.baseUrl}/${NayaApp.ApplicationName}`;
    return this._nayaClient.getAsync<EnvironmentGet[]>(url);
  }
}
