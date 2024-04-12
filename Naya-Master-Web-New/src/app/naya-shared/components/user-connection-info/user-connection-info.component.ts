import { Component } from '@angular/core';
// Naya Imports
import { MsalWrapperService } from '@naya-core/services/msal-wrapper-service';
import { UserConnectionService } from '@naya-core/services/user-session.service';
import { NayaApp } from 'src/naya-config/naya-app';
import { UserConnection } from '@naya-core/api/response/user-session.response';
import { DatabaseDto } from '@naya-core/api/response/database.response';

@Component({
    selector: 'user-connection-info',
    templateUrl: './user-connection-info.component.html',
    styleUrls: ['./user-connection-info.component.css'],
    standalone: true
})
export class UserConnectionInfoComponent {
    
    private _databaseDto: DatabaseDto;
    
    constructor(private _msalWrapperService: MsalWrapperService,
        private _userSessionService: UserConnectionService) {
            this._databaseDto = this._msalWrapperService.MSDiagnostic;
    }

    public get NSWebApiName(): string {
        return this._databaseDto?.apiName ?? String.empty;
    }

    public get NSWebApiVersion(): string {
        return this._databaseDto?.apiVersion ?? String.empty;
    }

    public get NSDatabaseName(): string {
        return this._databaseDto?.databaseName ?? String.empty;
    }
    get LoggedUserName(): string {
        return this._msalWrapperService.GetLoggedUserName;
    }

    get LoggedUserFullName(): string {
        return this._msalWrapperService.GetLoggedUserName;
    }

    get nayaConnectionDetail(): UserConnection | null {
        return this._userSessionService.GetCurrentUserSession;
    }

    public getWebApplicationVersion(): string {
        return NayaApp.ApplicationVersion;
    }
}
