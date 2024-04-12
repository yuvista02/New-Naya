import { Injectable }                       from "@angular/core";
// MS Imports
import { ConnectUserDto }                   from "@naya-core/models/connect-user-dto.model";
import { DbConnectApiService }         from "@naya-core/api/db-connect-api.service";
import { NayaApplicationInsight }           from "@naya-core/services/naya-application-insight.service";
import { NayaMessageService }               from "@naya-shared/services/naya-message.service";
import { NayaApp }                     from "src/naya-config/naya-app";
import { ApiContentResult } from "../models/api-result";
import { UserConnection } from "../api/response/user-session.response";
import { NayaFetchAPIService } from "./naya-fetch-api.service";
import { MessageSeverity } from "@naya-shared/constants/message-severity";
import { MsalWrapperService } from "@app/naya-core/services/msal-wrapper-service";
@Injectable()
export class UserConnectionService {
    private _isConnectedToDatabase: boolean = false;
    private _nayaUserSessionHeader!: string;
    private _currentUserConnection!: UserConnection;

    constructor(
        private _dbConnectApiService: DbConnectApiService,
        private _nayaMessageService: NayaMessageService,
        private _nayaApplicationInsights: NayaApplicationInsight,
        private _nayaFetchAPIService: NayaFetchAPIService,
        private _msalWrapperService: MsalWrapperService,
    ) { }

    public GetNayaUserSessionHeader(): string {
        return this._nayaUserSessionHeader;
    }

    public IsConnectedToDatabase(): boolean {
        return this._isConnectedToDatabase;
    }

    public get GetCurrentUserSession(): UserConnection {
        return this._currentUserConnection;
    }

    public OnDisclaimerReject() {
        this._isConnectedToDatabase = false;
        this._nayaMessageService.showToastMessage(MessageSeverity.Warn, 'Disclaimer Rejected.');
    }

    public async ConnectUser(forceDisconnect: string): Promise<ApiContentResult<UserConnection>> {

        const userConnectionDto = this.getUserConnectionDto(forceDisconnect);
        this._nayaApplicationInsights.logEvent(`Naya Session: INITIATED`);
        
        const connectResult = await this._dbConnectApiService.ConnectUserAsync(userConnectionDto);
        if (connectResult.success){
            
            const userSession: UserConnection = connectResult.content;

            this._nayaApplicationInsights.MSSetNayaUserDetail(userSession.preferredUserName, userSession.userConnectionID);
            this.logEvent(`Naya Session: START`);

            this._currentUserConnection = userSession;
            this._nayaUserSessionHeader = btoa(JSON.stringify(userSession));
            localStorage.setItem(NayaApp.ApplicationName, this._currentUserConnection.userConnectionID?.toString());
            this._isConnectedToDatabase = true;
        }
        else {
            this.logEvent(`Naya Session: FAILED`);
            this._isConnectedToDatabase = false;
        }
        return connectResult;
    }
    
    public async DisconnectUserAsync(): Promise<void> {
        this._nayaApplicationInsights.logEvent(`Naya Session (Terminate): App Close`);

        const disconnectUserDto = { reason: "UserClosing" };

        const apiResult = await this._dbConnectApiService.DisconnectUserAsync(disconnectUserDto);
        if (apiResult.success){
            this.onCloseNayaSession();
        }
        else {
            this.logEvent(`Naya Session (Terminate): FAILED`);
            throw new Error(apiResult.message);
        }
    }

    private getUserConnectionDto(forceDisconnect: string): ConnectUserDto {
        const connectUserDto = new ConnectUserDto();
        connectUserDto.applicationName = NayaApp.ApplicationName;
        connectUserDto.applicationVersion = NayaApp.ApplicationVersion;
        connectUserDto.forceDisconnect = forceDisconnect;
        connectUserDto.connectionName = NayaApp.ConnectionName;
        connectUserDto.externalUserName = this._msalWrapperService.GetLoggedUserName;

        return connectUserDto;
    }

    public getDisplayString(): string {
        const currentDateTime = new Date().toUTCString();
        if (this._currentUserConnection == null) {
            return `Unidentified user on ${currentDateTime}`
        }
        const userConnectionID = this._currentUserConnection.userConnectionID;
        const userName = this._currentUserConnection.preferredUserName;
        return `User: ${userName} at $(${userConnectionID}) on ${currentDateTime}`;
    }
    
    private onCloseNayaSession() {
        this.logEvent(`Naya Session: END`);
        this._isConnectedToDatabase = false;
        localStorage.removeItem(NayaApp.ApplicationName);
    }

    private logEvent(event: string) {
        this._nayaApplicationInsights.logEvent(event);
    }

    
    public HandleWindowBeforeUnload(): void {
        if (this._isConnectedToDatabase) {

            const body = { DisconnectReason: "OnWindowBeforeUnload" };
            this._nayaFetchAPIService.doFetchPOST('DatabaseConnect/disconnectuser', this._nayaUserSessionHeader, body);            
        }
    }
}
