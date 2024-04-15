// Naya Auto Generated (1.6.0) at 4/10/2024 11:11:15 AM
import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// Naya Imports
import { AppBreadcrumbService } from '@app/app-layout/services/app.breadcrumb.service';
import { UserConnectionGet } from '@app/naya-domain/api/response/naya-connections-get.response';
import { DomainRouter } from '@app/naya-domain/domain.router';
import { NayaMessageService } from '@app/naya-shared/services/naya-message.service';
import { ApiContentResult, ApiResult } from '@naya-core/models/api-result';
import { ComponentUtilityService } from '@naya-core/services/component-utility.service';
import { UserConnectionController } from '@naya-domain/api/naya-connections.controller';
import { UserConnectionFind } from "@naya-domain/api/response/naya-connections-find.response";
import { UserConnectionTableComponent } from '@naya-domain/naya-setup/naya-connections/naya-connections-table/naya-connections-table.component';
import { NayaLoadingComponent } from '@naya-shared/components/naya-loading/naya-loading.component';
import { ConstantString } from '@naya-shared/constants/constant-string';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'naya-connections',
  templateUrl: './naya-connections.component.html',
  styleUrls: ['./naya-connections.component.css'],
  standalone: true,
  imports: [NgIf,
    NayaLoadingComponent, UserConnectionTableComponent],
  providers: [UserConnectionController, DomainRouter]
})
export class UserConnectionComponent implements OnInit {

  public NSUserConnectionList: UserConnectionFind[] = [];
  public NSLoading: boolean = true;

  public NSPageTitle: string = ConstantString.NayaConnections.getDisplayName();
  public NSEnvironmentName = String.empty;

  constructor(
    private _appBreadcrumbService: AppBreadcrumbService,
    private _componentUtilityService: ComponentUtilityService,
    private _userConnectionController: UserConnectionController,
    private _domainRouter: DomainRouter,
    private _nayaMessageService: NayaMessageService
  ) { }

  ngOnInit() {
    this.setBreadcrumb();
    this.loadUserConnectionList();
  }

  private setBreadcrumb() {
    this._appBreadcrumbService.SetLandingPageBreadcrumb(this.NSPageTitle);
  }

  private async loadUserConnectionList() {
    try {
      this.NSLoading = true;
      const apiResult: ApiContentResult<UserConnectionGet[]> = await this._userConnectionController.GetList();
      if (this._componentUtilityService.WasSuccessful(apiResult)) {
        this.NSUserConnectionList = apiResult.content;
        this.NSUserConnectionList.map(nayaConnection => {
          nayaConnection.actions = this.getActions(nayaConnection);
        });
      };
    } finally {
      this.NSLoading = false;
    }
  }
  private getActions(nayaRole: UserConnectionGet): MenuItem[] {
    let actionBtns: MenuItem[] = [
      { icon: PrimeIcons.PENCIL, label: 'Edit Item', command: () => this.onEditNayaConnection(nayaRole) },
      { icon: PrimeIcons.MINUS, label: 'Remove item', command: () => this.onRemoveNayaConnection(nayaRole) }
    ];

    return actionBtns;
  }
  private onEditNayaConnection(nayaRole: UserConnectionGet): void {
    this._domainRouter.RouteToUserConnectionEdit(nayaRole.nayaConnectionID);
  }
  private async onRemoveNayaConnection(nayaRole: UserConnectionGet): Promise<void> {
    try {
      this.NSLoading = true;
      const apiResult: ApiResult = await this._userConnectionController.Delete(nayaRole.nayaConnectionID);
      if (this._componentUtilityService.WasSuccessful(apiResult)) {
        this._nayaMessageService.toastSuccess("Role deleted successfully.");
      };
    } finally {
      this.NSLoading = false;
    }
  }

}
