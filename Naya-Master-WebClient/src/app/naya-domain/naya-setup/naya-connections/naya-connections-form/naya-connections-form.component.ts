// Naya Auto Generated (1.6.0) at 4/10/2024 11:11:15 AM
import { Component, Input, OnInit } from '@angular/core';
import {
    FormControl, FormGroup, FormsModule,
    ReactiveFormsModule, Validators
} from '@angular/forms';
// Third Party Imports
import { SelectItem, SharedModule } from 'primeng/api';
// Naya Imports
import { IApiResult } from '@naya-core/models/api-result';
import { ComponentUtilityService } from '@naya-core/services/component-utility.service';
import { UserConnection } from '@naya-domain/api/request/naya-connections.request';
import { UserConnectionGet } from "@naya-domain/api/response/naya-connections-get.response";
import { UserConnectionController } from '@naya-domain/api/naya-connections.controller';
import { DomainRouter } from "@naya-domain/domain.router";
import { NayaFormControlComponent } from '@naya-shared/components/naya-form-control/naya-form-control.component';
import { NayaFormPageComponent } from '@naya-shared/components/naya-maintenance-page/naya-form-page/naya-form-page.component';
import { FormGroupOf } from '@naya-shared/types/form-group-of.type';
import { FieldNames } from '@app/naya-shared/constants/field-names';
import { SystemListService } from '@app/naya-domain/service/system-list.service';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
    selector: 'naya-connections-form',
    templateUrl: './naya-connections-form.component.html',
    styleUrls: ['./naya-connections-form.component.css'],
    standalone: true,
    imports: [
        FormsModule, ReactiveFormsModule, SharedModule,
        InputTextModule, InputNumberModule,
        NayaFormPageComponent, NayaFormControlComponent
    ],
    providers: [UserConnectionController, SystemListService]
})
export class UserConnectionFormComponent implements OnInit {
    @Input() public NSUserConnectionGet!: UserConnectionGet;
    @Input() public NSUserConnectionID: number | null = null;
    @Input() public NSParentForm: FormGroup<FormGroupOf<UserConnection>> = new FormGroup<FormGroupOf<UserConnection>>({
        // FormBuilder PlaceHolder - DO NOT REMOVE
        connectionName: new FormControl(String.empty, { nonNullable: true, validators: [Validators.required] }),
        dataURL: new FormControl(String.empty, { nonNullable: true, validators: [Validators.required] }),
        webAppURL: new FormControl(String.empty, { nonNullable: true, validators: [Validators.required] }),
        aiWebAppURL: new FormControl(String.empty, { nonNullable: true, validators: [Validators.required] }),
        productName: new FormControl(String.empty, { nonNullable: true, validators: [Validators.required] }),
        clientEnvironment: new FormControl(false, { nonNullable: true, validators: [Validators.required] }),
        testEnvironment: new FormControl(false, { nonNullable: true, validators: [Validators.required] }),
        nayaEnvironment: new FormControl(false, { nonNullable: true, validators: [Validators.required] }),
        enableCombined: new FormControl(false, { nonNullable: true, validators: [Validators.required] }),
    });

    public NSIsFormSubmitting: boolean = false;
    public NSEnvironmentName = String.empty;

    public NSRoleCodeSelectItem: SelectItem[] = [];
    // Declare Options PlaceHolder

    constructor(
        private _userConnectionController: UserConnectionController,
        private _componentUtilityService: ComponentUtilityService,
        private _domainRouter: DomainRouter,
        private _systemListService: SystemListService
    ) {
    }

    ngOnInit(): void {
        this.doInitializeFormControls();
        this.doMapGetDataToFormControl(this.NSUserConnectionGet);
        this.getSelectItems();
    }

    // Start: Button Click Event Handlers
    public OnClickSubmit() {
        if (this.NSIsFormSubmitting) {
            return;
        }
        if (this._componentUtilityService.IsFormValid(this.NSParentForm)) {
            this.doSubmitForm();
        }
    }

    public OnClickCancel() {
        this.routeToBasePage();
    }

    // End: Button Click Event Handlers

    private doInitializeFormControls() {
    }

    private doMapGetDataToFormControl(userConnection: UserConnectionGet) {
        if (!userConnection) {
            return;
        }
        this.NSUserConnectionGet = userConnection;
        this.NSParentForm.patchValue(userConnection);
    }

    private async doSubmitForm() {
        this.NSIsFormSubmitting = true;
        const apiResult: IApiResult = this.NSUserConnectionID
            ? await this._userConnectionController.Update(this.NSUserConnectionID, this.NSParentForm.getRawValue())
            : await this._userConnectionController.Create(this.NSParentForm.getRawValue());
        if (this._componentUtilityService.WasSubmitSuccessful(apiResult, this.NSParentForm)) {
            this.routeToBasePage();
        };
        this.NSIsFormSubmitting = false;
    }

    private async getSelectItems(): Promise<void> {
        this.NSRoleCodeSelectItem = await this._systemListService.NSGetSystemListAsSelectItems(FieldNames.RoleCode, false);
        // Set Options PlaceHolder
    }

    private routeToBasePage(): void {
        this._domainRouter.RouteToUserConnection();
    }
}
