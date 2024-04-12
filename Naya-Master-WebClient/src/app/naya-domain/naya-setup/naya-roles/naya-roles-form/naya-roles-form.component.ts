// Naya Auto Generated (1.6.0) at 4/10/2024 10:06:44 AM
import { Component, Input, OnInit }         from '@angular/core';
import { FormControl, FormGroup, FormsModule, 
         ReactiveFormsModule, Validators }  from '@angular/forms';
// Third Party Imports
import { SharedModule }                     from 'primeng/api';
// Naya Imports
import { IApiResult }                       from '@naya-core/models/api-result';
import { ComponentUtilityService }          from '@naya-core/services/component-utility.service';
import { NayaRole }                             from '@naya-domain/api/request/naya-roles.request';
import { NayaRoleGet }                          from "@naya-domain/api/response/naya-roles-get.response";
import { NayaRoleController }                   from '@naya-domain/api/naya-roles.controller';
import { DomainRouter }                 from "@naya-domain/domain.router";
import { NayaFormControlComponent }         from '@naya-shared/components/naya-form-control/naya-form-control.component';
import { NayaFormPageComponent }            from '@naya-shared/components/naya-maintenance-page/naya-form-page/naya-form-page.component';
import { FormGroupOf }                      from '@naya-shared/types/form-group-of.type';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'naya-roles-form',
    templateUrl: './naya-roles-form.component.html',
    styleUrls: ['./naya-roles-form.component.css'],
    standalone: true,
    imports: [
        FormsModule, ReactiveFormsModule, SharedModule,
        InputTextModule,
        NayaFormPageComponent, NayaFormControlComponent
    ],
    providers: [NayaRoleController, DomainRouter]
})
export class NayaRoleFormComponent implements OnInit {
    @Input() public NSNayaRoleGet!: NayaRoleGet;
    @Input() public NSNayaRoleID: number | null = null;
    @Input() public NSParentForm: FormGroup<FormGroupOf<NayaRole>> = new FormGroup<FormGroupOf<NayaRole>>({
        // FormBuilder PlaceHolder - DO NOT REMOVE
		roleName: new FormControl('', {nonNullable: true }),
		externalRoleID: new FormControl(null, [Validators.required]),

    });
    
    public NSIsFormSubmitting: boolean = false;
    public NSEnvironmentName = String.empty;

    // Declare Options PlaceHolder

    constructor(
        private _nayaRoleController: NayaRoleController,
        private _componentUtilityService: ComponentUtilityService,
        private _domainRouter: DomainRouter
    ) {
    }

    ngOnInit(): void {
        this.doInitializeFormControls();
        this.doMapGetDataToFormControl(this.NSNayaRoleGet);
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

    private doMapGetDataToFormControl(nayaRole: NayaRoleGet) {
        if (!nayaRole) {
            return;
        }        
        this.NSNayaRoleGet = nayaRole;
        this.NSParentForm.patchValue(nayaRole);
    }

    private async doSubmitForm() {
        this.NSIsFormSubmitting = true;
        const apiResult: IApiResult = this.NSNayaRoleID
            ? await this._nayaRoleController.Update(this.NSNayaRoleID, this.NSParentForm.getRawValue())
            : await this._nayaRoleController.Create(this.NSParentForm.getRawValue());
        if (this._componentUtilityService.WasSubmitSuccessful(apiResult, this.NSParentForm)) {
            this.routeToBasePage();
        };
        this.NSIsFormSubmitting = false;
    }

    private getSelectItems(): void {
        // Set Options PlaceHolder
    }

    private routeToBasePage(): void {
        this._domainRouter.RouteToNayaRole();
    }
}
