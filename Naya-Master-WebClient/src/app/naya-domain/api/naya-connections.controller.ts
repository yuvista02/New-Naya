// Naya Auto Generated (1.6.0) at 4/10/2024 11:11:15 AM
import { Injectable } from "@angular/core";
// NS Imports
import {
  ApiContentResult,
  ApiResult
} from '@naya-core/models/api-result';
import { NayaApiClient } from '@naya-core/services/naya-api.client';
import { UserConnection } from "@naya-domain/api/request/naya-connections.request";
import { UserConnectionGet } from "@naya-domain/api/response/naya-connections-get.response";
import { ConstantString } from "@naya-shared/constants/constant-string";

@Injectable()
export class UserConnectionController {

  private getBaseUrl(): string {
    return this._nayaApi.getDomainUrl(ConstantString.NayaConnections);
  };

  constructor(private _nayaApi: NayaApiClient) { }

  /**
   *   GET: domain/v1/UserConnection
   */
  public async GetList(
  ): Promise<ApiContentResult<UserConnectionGet[]>> {

    const url = this.getBaseUrl();
    return this._nayaApi.getAsync<UserConnectionGet[]>(url);
  }

  /**
   *   POST: domain/v1/UserConnection
   */
  public async Create(userConnection: UserConnection
  ): Promise<ApiContentResult<number>> {

    const url = this.getBaseUrl();
    return this._nayaApi.postWithResultAsync(url, userConnection);
  }

  /**
   *   GET: domain/v1/UserConnection/{documentID}
   */
  public async GetByID(userConnectionID: number
  ): Promise<ApiContentResult<UserConnectionGet>> {

    const url = this._nayaApi.combineUrl(this.getBaseUrl(), userConnectionID);
    return this._nayaApi.getAsync<UserConnectionGet>(url);
  }

  /**
   *   PUT: domain/v1/UserConnection/{documentID}
   */
  public async Update(userConnectionID: number, userConnection: UserConnection
  ): Promise<ApiResult> {

    const url = this._nayaApi.combineUrl(this.getBaseUrl(), userConnectionID);
    return this._nayaApi.putAsync(url, userConnection);
  }

  /**
   *   DELETE: domain/v1/UserConnection/{documentID}
   */
  public async Delete(userConnectionID: number
  ): Promise<ApiResult> {

    const url = this._nayaApi.combineUrl(this.getBaseUrl(), userConnectionID);
    return this._nayaApi.deleteAsync(url);
  }
}
