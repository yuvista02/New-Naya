// Naya Auto Generated (1.6.0) at 4/10/2024 7:47:51 AM
import { Injectable } from "@angular/core";
import { NayaRole } from "@app/naya-domain/api/request/naya-roles.request";
import { NayaRoleGet } from "@app/naya-domain/api/response/naya-roles-get.response";
// NS Imports
import { ApiContentResult, ApiResult } from '@naya-core/models/api-result';
import { NayaApiClient } from '@naya-core/services/naya-api.client';
import { ConstantString } from "@naya-shared/constants/constant-string";

@Injectable()
export class NayaRoleController {
  
  private getBaseUrl(): string {
    return this._nayaApi.getDomainUrl(ConstantString.NayaRoles);
  };

  constructor(private _nayaApi: NayaApiClient) { }
  
/**
 *   GET: domain/v1/NayaRole
 */
  public async GetList(
    ): Promise<ApiContentResult<NayaRoleGet[]>> {
    
    const url = this.getBaseUrl();
    return this._nayaApi.getAsync<NayaRoleGet[]>(url);
  }
  
/**
 *   POST: domain/v1/NayaRole
 */
  public async Create(nayaRole: NayaRole
    ): Promise<ApiContentResult<number>> {
    
    const url = this.getBaseUrl();
    return this._nayaApi.postWithResultAsync(url, nayaRole);
  }
  
/**
 *   GET: domain/v1/NayaRole/{documentID}
 */
  public async GetByID(nayaRoleID: number
    ): Promise<ApiContentResult<NayaRoleGet>> {
    
    const url = this._nayaApi.combineUrl(this.getBaseUrl(), nayaRoleID);
    return this._nayaApi.getAsync<NayaRoleGet>(url);
  }
  
/**
 *   PUT: domain/v1/NayaRole/{documentID}
 */
  public async Update(nayaRoleID: number, nayaRole: NayaRole
    ): Promise<ApiResult> {
    
    const url = this._nayaApi.combineUrl(this.getBaseUrl(), nayaRoleID);
    return this._nayaApi.putAsync(url, nayaRole);
  }
  
/**
 *   DELETE: domain/v1/NayaRole/{documentID}
 */
  public async Delete(nayaRoleID: number
    ): Promise<ApiResult> {
    
    const url = this._nayaApi.combineUrl(this.getBaseUrl(), nayaRoleID);
    return this._nayaApi.deleteAsync(url);
  }
}
