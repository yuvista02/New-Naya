import { CommonModule }             from '@angular/common';
import { Component, OnInit }        from '@angular/core';
// Third party imports
import { MsalBroadcastService }     from '@azure/msal-angular';
import { EventMessage, EventType }  from '@azure/msal-browser';
import { filter }                   from 'rxjs';
// Naya Imports
import { AppRouter }                from '@app/app.router';
import { ComponentUtilityService }  from '@naya-core/services/component-utility.service';
import { MsalWrapperService }       from '@naya-core/services/msal-wrapper-service';
import { UserConnectionService }       from '@naya-core/services/user-session.service';
import { NayaLoadingComponent }     from '@naya-shared/components/naya-loading/naya-loading.component';
import { DefaultValues }            from '@naya-shared/constants/default-values';

@Component({
  selector: 'naya-external',
  standalone: true,
  imports: [CommonModule, NayaLoadingComponent],
  templateUrl: './naya-external.component.html',
  styleUrls: ['./naya-external.component.scss']
})
export class NayaExternalComponent implements OnInit {
  constructor(
    private _appRouter: AppRouter,
    private _msalBroadcastService: MsalBroadcastService,
    private _msalWrapperService: MsalWrapperService,
    private _userSessionService: UserConnectionService,
    private _componentUtilityService: ComponentUtilityService
  ) { 
  }
  ngOnInit(): void {
    this.tryConnectUser();
  }

  private async tryConnectUser(): Promise<void> {
    if (this._msalWrapperService.IsConnectedToAzure() === false) {
      this.doConnectToAzure();
      return;
    }
    if (this._userSessionService.IsConnectedToDatabase() === false) {
      this.dbConnectUser(DefaultValues.Y)
      return;
    }
    this._appRouter.RouteToDefault();
  }

  private doConnectToAzure() {
    this._msalWrapperService.ConnectToAzure();
    this._msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((_: any) => {
        this.dbConnectUser(DefaultValues.Y);
      });
  }

  private async dbConnectUser(forceDisconnect: string) {
    const connectResult = await this._userSessionService.ConnectUser(forceDisconnect);
    if (this._componentUtilityService.WasSuccessful(connectResult)) {
      this._appRouter.RouteToDefault();
    }
    else {
      this._appRouter.RouteToLogin();
    }
  }
}
