import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRouter } from '@app/app.router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'naya-post-logout',
    templateUrl: './naya-post-logout.component.html',
    styleUrls: ['./naya-post-logout.component.scss'],
    standalone: true,
    imports: [ButtonModule, RouterLink]
})
export class NayaPostLogoutComponent {

  constructor(private _appRouter: AppRouter) { }

  public NSOnClickGoBackToLogin(){
    this._appRouter.RouteToLogin();
  }
}
