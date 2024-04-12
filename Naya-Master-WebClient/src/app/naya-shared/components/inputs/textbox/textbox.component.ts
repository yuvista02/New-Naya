import {Component, Input} from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { NayaFormControlComponent } from '@naya-shared/components/naya-form-control/naya-form-control.component';

@Component({
    selector: 'naya-textbox',
    templateUrl: './textbox.component.html',
    standalone: true,
    imports: [NayaFormControlComponent, FormsModule, ReactiveFormsModule, NgIf, InputTextModule, InputTextareaModule]
})
export class TextBoxComponent {
    @Input() field: any = {};
    @Input() form: UntypedFormGroup;

    constructor() {

    }
}
