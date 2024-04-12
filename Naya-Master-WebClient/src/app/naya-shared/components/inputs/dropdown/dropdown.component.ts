import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { NayaFormControlComponent } from '@naya-shared/components/naya-form-control/naya-form-control.component';

@Component({
    selector: 'naya-dropdown',
    templateUrl: './dropdown.component.html',
    standalone: true,
    imports: [NayaFormControlComponent, FormsModule, ReactiveFormsModule, DropdownModule]
})
export class DropDownComponent {
    @Input() field: any = {};
    @Input() form!: FormGroup;

    constructor() {
    }
}
