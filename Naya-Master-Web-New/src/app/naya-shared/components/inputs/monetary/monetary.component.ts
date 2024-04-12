import {Component, Input} from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { NayaFormControlComponent } from '@app/naya-shared/components/naya-form-control/naya-form-control.component';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'naya-monetary',
    templateUrl: './monetary.component.html',
    standalone: true,
    imports: [NayaFormControlComponent, ReactiveFormsModule, InputTextModule]
})
export class MonetaryComponent {
    @Input() field: any = {};
    @Input() form!: UntypedFormGroup;

    constructor() {
    }
}
