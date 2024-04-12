import {Component, Input} from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NgFor, NgStyle } from '@angular/common';
import { NayaFormControlComponent } from '@app/naya-shared/components/naya-form-control/naya-form-control.component';

@Component({
    selector: 'naya-radio',
    templateUrl: './radio.component.html',
    standalone: true,
    imports: [NayaFormControlComponent, FormsModule, ReactiveFormsModule, NgFor, RadioButtonModule, NgStyle]
})
export class RadioComponent {
    @Input() field: any = {};
    @Input() form!: UntypedFormGroup;
}
