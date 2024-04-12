import { Injectable } from '@angular/core';
// MS Imports
import { DatabaseDto } from '@naya-core/api/response/database.response';
import { NayaApiClient } from '@naya-core/services/naya-api.client';
import { ApiContentResult } from '@naya-core/models/api-result';

@Injectable()
export class DiagnosticApiService {
    
  constructor(private _nayaApiClient: NayaApiClient) { }
    
  private get baseUrl(): string {
    return `/Diagnostic`;
  }

  public async GetDatabaseDto(environmentName: string): Promise<ApiContentResult<DatabaseDto>> {
        
    const url = `${this.baseUrl}/connection/${environmentName}`;
    return this._nayaApiClient.getAsync<DatabaseDto>(url);
  }
}
