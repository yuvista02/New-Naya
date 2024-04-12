// Naya Auto Generated (1.6.0) at 4/10/2024 11:11:11 AM
import { NgIf }                         from '@angular/common';
import { Component, ElementRef,
         OnInit, ViewChild }            from '@angular/core';
import { ActivatedRoute }               from '@angular/router';
// Naya Imports
import { AppBreadcrumbService }         from '@app/app-layout/services/app.breadcrumb.service';
import { ApiContentResult, ApiResult }  from '@naya-core/models/api-result';
import { ComponentUtilityService }      from '@naya-core/services/component-utility.service';
import { UserConnectionGet }                      from '@naya-domain/api/response/naya-connections-get.response';
import { UserConnectionController }               from '@naya-domain/api/naya-connections.controller';
import { DomainRouter }             from "@naya-domain/domain.router";
import { UserConnectionFormComponent }            from '@naya-domain/naya-setup/naya-connections/naya-connections-form/naya-connections-form.component';
import { UserConnectionTableComponent }           from '@naya-domain/naya-setup/naya-connections/naya-connections-table/naya-connections-table.component';
import { NayaLoadingComponent }         from '@naya-shared/components/naya-loading/naya-loading.component';
import { NayaEditPageComponent }        from '@naya-shared/components/naya-maintenance-page/naya-edit-page/naya-edit-page.component';
import { ConstantString }               from '@naya-shared/constants/constant-string';
import { FieldNames }                   from '@naya-shared/constants/field-names';

@Component({
    selector: 'naya-connections-add-page',
    templateUrl: './naya-connections-edit-page.component.html',
    styleUrls: ['./naya-connections-edit-page.component.css'],
    standalone: true,
    imports: [NgIf,
              NayaLoadingComponent, NayaEditPageComponent, UserConnectionTableComponent, UserConnectionFormComponent],
    providers: [UserConnectionController, DomainRouter]
})
export class UserConnectionEditPageComponent implements OnInit {

  public NSUserConnectionID: number | null = null;
  public NSUserConnectionGet!: UserConnectionGet;
  public NSLoading = true;
  public NSPageTitle = ConstantString.NayaConnections;
  public NSEnvironmentName = String.empty;

  @ViewChild("NSForm") NSForm!: ElementRef;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _appBreadcrumbService: AppBreadcrumbService,
    private _componentUtilityService: ComponentUtilityService,
    private _userConnectionController: UserConnectionController,
    private _domainRouter: DomainRouter
  ) { }

  async ngOnInit() {
    this.readRouteParameters();
    this.setBreadcrumb();
    if (this.NSUserConnectionID){
      await this.getUserConnectionByID(this.NSUserConnectionID);
    }
    this.NSLoading = false;
  }

  // Start: Button Click Event Handlers

  public OnClickRemove(): void {
    if (this.NSUserConnectionID){
      this.doRemove(this.NSUserConnectionID);
    }
  }

  public get NSDisplayRemoveButton(): boolean {
    return this.NSUserConnectionID !== null;
  }

  // End: Button Click Event Handlers

  private setBreadcrumb() {
    this._appBreadcrumbService.SetEditPageBreadcrumb(this.NSPageTitle, "", this.NSUserConnectionID);
  }

  private readRouteParameters() {
    const userConnectionID = this._activatedRoute.snapshot.paramMap.get(FieldNames.UserConnectionID);
    this.NSUserConnectionID = userConnectionID ? +userConnectionID : null;
  }

  private async getUserConnectionByID(userConnectionID: number) {
    if (userConnectionID) {
      const apiResult: ApiContentResult<UserConnectionGet> = await this._userConnectionController.GetByID(userConnectionID);
      if (this._componentUtilityService.WasSuccessful(apiResult)) {
        this.NSUserConnectionGet = apiResult.content;
      }
    }
  }

  private async doRemove(userConnectionID: number) {
    const apiResult: ApiResult = await this._userConnectionController.Delete(userConnectionID);
    if (this._componentUtilityService.WasSuccessful(apiResult)) {
        this._domainRouter.RouteToUserConnection();
    }
  }
}
