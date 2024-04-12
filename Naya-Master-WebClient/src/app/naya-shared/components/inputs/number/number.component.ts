import {Component, Input} from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NayaFormControlComponent } from '@naya-shared/components/naya-form-control/naya-form-control.component';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'naya-number',
    templateUrl: './number.component.html',
    standalone: true,
    imports: [NayaFormControlComponent, FormsModule, ReactiveFormsModule, InputTextModule]
})
export class NumberComponent {
    @Input() field: any = {};
    @Input() form!: UntypedFormGroup;

    constructor() {
    }
}
