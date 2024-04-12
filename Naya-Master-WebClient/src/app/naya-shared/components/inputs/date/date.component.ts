import {Component, Input} from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { NayaFormControlComponent } from '@naya-shared/components/naya-form-control/naya-form-control.component'

@Component({
    selector: 'naya-date',
    templateUrl: './date.component.html',
    standalone: true,
    imports: [NayaFormControlComponent, FormsModule, ReactiveFormsModule, CalendarModule]
})
export class DateComponent {
    @Input() field: any = {};
    @Input() form: UntypedFormGroup;
    currentYear = new Date().getFullYear();

    constructor() {
    }
}
