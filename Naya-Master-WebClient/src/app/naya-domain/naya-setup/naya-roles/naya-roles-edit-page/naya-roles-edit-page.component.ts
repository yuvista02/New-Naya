// Naya Auto Generated (1.6.0) at 4/10/2024 10:06:44 AM
import { NgIf }                         from '@angular/common';
import { Component, ElementRef,
         OnInit, ViewChild }            from '@angular/core';
import { ActivatedRoute }               from '@angular/router';
// Naya Imports
import { AppBreadcrumbService }         from '@app/app-layout/services/app.breadcrumb.service';
import { ApiContentResult, ApiResult }  from '@naya-core/models/api-result';
import { ComponentUtilityService }      from '@naya-core/services/component-utility.service';
import { NayaRoleGet }                      from '@naya-domain/api/response/naya-roles-get.response';
import { NayaRoleController }               from '@naya-domain/api/naya-roles.controller';
import { DomainRouter }                 from "@naya-domain/domain.router";
import { NayaRoleFormComponent }            from '@naya-domain/naya-setup/naya-roles/naya-roles-form/naya-roles-form.component';
import { NayaRoleTableComponent }           from '@naya-domain/naya-setup/naya-roles/naya-roles-table/naya-roles-table.component';
import { NayaLoadingComponent }         from '@naya-shared/components/naya-loading/naya-loading.component';
import { NayaEditPageComponent }        from '@naya-shared/components/naya-maintenance-page/naya-edit-page/naya-edit-page.component';
import { ConstantString }               from '@naya-shared/constants/constant-string';
import { FieldNames }                   from '@naya-shared/constants/field-names';

@Component({
    selector: 'naya-roles-add-page',
    templateUrl: './naya-roles-edit-page.component.html',
    styleUrls: ['./naya-roles-edit-page.component.css'],
    standalone: true,
    imports: [NgIf,
      NayaLoadingComponent, NayaEditPageComponent, NayaRoleTableComponent, NayaRoleFormComponent],
    providers: [NayaRoleController, DomainRouter]
})
export class NayaRoleEditPageComponent implements OnInit {

  public NSNayaRoleID: number | null = null;
  public NSNayaRoleGet!: NayaRoleGet;
  public NSLoading = true;
  public NSPageTitle = ConstantString.NayaRoles;
  public NSEnvironmentName = String.empty;

  @ViewChild("NSForm") NSForm!: ElementRef;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _appBreadcrumbService: AppBreadcrumbService,
    private _componentUtilityService: ComponentUtilityService,
    private _nayaRoleController: NayaRoleController,
    private _domainRouter: DomainRouter
  ) { }

  async ngOnInit() {
    this.readRouteParameters();
    this.setBreadcrumb();
    if (this.NSNayaRoleID){
      await this.getNayaRoleByID(this.NSNayaRoleID);
    }
    this.NSLoading = false;
  }

  // Start: Button Click Event Handlers

  public OnClickRemove(): void {
    if (this.NSNayaRoleID){
      this.doRemove(this.NSNayaRoleID);
    }
  }

  public get NSDisplayRemoveButton(): boolean {
    return this.NSNayaRoleID !== null;
  }

  // End: Button Click Event Handlers

  private setBreadcrumb() {
    this._appBreadcrumbService.SetEditPageBreadcrumb(this.NSPageTitle, "", this.NSNayaRoleID);
  }

  private readRouteParameters() {
    const nayaRoleID = this._activatedRoute.snapshot.paramMap.get(FieldNames.NayaRoleID);
    this.NSNayaRoleID = nayaRoleID ? +nayaRoleID : null;
  }

  private async getNayaRoleByID(nayaRoleID: number) {
    if (nayaRoleID) {
      const apiResult: ApiContentResult<NayaRoleGet> = await this._nayaRoleController.GetByID(nayaRoleID);
      if (this._componentUtilityService.WasSuccessful(apiResult)) {
        this.NSNayaRoleGet = apiResult.content;
      }
    }
  }

  private async doRemove(nayaRoleID: number) {
    const apiResult: ApiResult = await this._nayaRoleController.Delete(nayaRoleID);
    if (this._componentUtilityService.WasSuccessful(apiResult)) {
        this._domainRouter.RouteToNayaRole();
    }
  }
}
