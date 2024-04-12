// Naya Auto Generated (1.6.0) at 4/10/2024 7:47:51 AM
import { NgIf }                     from '@angular/common';
import { Component, OnInit }        from '@angular/core';
// Naya Imports
import { AppBreadcrumbService }     from '@app/app-layout/services/app.breadcrumb.service';
import { NayaRoleGet } from '@app/naya-domain/api/response/naya-roles-get.response';
import { DomainRouter } from '@app/naya-domain/domain.router';
import { NayaMessageService } from '@app/naya-shared/services/naya-message.service';
import { ApiContentResult, ApiResult }         from '@naya-core/models/api-result';
import { ComponentUtilityService }  from '@naya-core/services/component-utility.service';
import { NayaRoleController }           from '@naya-domain/api/naya-roles.controller';
import { NayaRoleTableComponent }       from '@naya-domain/naya-setup/naya-roles/naya-roles-table/naya-roles-table.component';
import { NayaLoadingComponent }     from '@naya-shared/components/naya-loading/naya-loading.component';
import { ConstantString }           from '@naya-shared/constants/constant-string';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'naya-roles',
  templateUrl: './naya-roles.component.html',
  styleUrls: ['./naya-roles.component.css'],
  standalone: true,
  imports: [NgIf,
            NayaLoadingComponent, NayaRoleTableComponent],
  providers: [NayaRoleController, DomainRouter]
})
export class NayaRoleComponent implements OnInit {

  public NSNayaRoleList: NayaRoleGet[] = [];
  public NSLoading: boolean = true;

  public NSPageTitle: string = ConstantString.NayaRoles;
  public NSEnvironmentName = String.empty;

  constructor(
    private _appBreadcrumbService: AppBreadcrumbService,
    private _componentUtilityService: ComponentUtilityService,
    private _nayaRoleController: NayaRoleController,
    private _domainRouter: DomainRouter,
    private _nayaMessageService: NayaMessageService
  ) { }

  ngOnInit() {
    this.setBreadcrumb();
    this.loadNayaRoleList();
  }
  
  private setBreadcrumb() {
    this._appBreadcrumbService.SetLandingPageBreadcrumb(this.NSPageTitle);
  }

  private async loadNayaRoleList() {
    try {
      this.NSLoading = true;
      const apiResult: ApiContentResult<NayaRoleGet[]> = await this._nayaRoleController.GetList();
      if (this._componentUtilityService.WasSuccessful(apiResult)) {
        this.NSNayaRoleList = apiResult.content;
        this.NSNayaRoleList.map(nayaRole => {
          nayaRole.actions = this.getActions(nayaRole);
        });
      };
    } finally {
      this.NSLoading = false;
    }
  }
  private getActions(nayaRole: NayaRoleGet): MenuItem[] {
    let actionBtns: MenuItem[] = [
      { icon: PrimeIcons.PENCIL, label: 'Edit Item', command: () => this.onEditNayaRole(nayaRole) },
      { icon: PrimeIcons.MINUS, label: 'Remove item', command: () => this.onRemoveNayaRole(nayaRole) }
    ];

    return actionBtns;
  }
  private onEditNayaRole(nayaRole: NayaRoleGet): void {
    this._domainRouter.RouteToNayaRoleEdit(nayaRole.nayaRoleID);  }
  private async onRemoveNayaRole(nayaRole: NayaRoleGet): Promise<void> {
    try {
      this.NSLoading = true;
      const apiResult: ApiResult = await this._nayaRoleController.Delete(nayaRole.nayaRoleID);
      if (this._componentUtilityService.WasSuccessful(apiResult)) {
        this._nayaMessageService.toastSuccess("Role deleted successfully.");
      };
    } finally {
      this.NSLoading = false;
    }
  }

}
