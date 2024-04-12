import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { DropDownComponent } from '../dropdown/dropdown.component';

@Component({
    selector: 'naya-system',
    templateUrl: './naya-system.component.html',
    standalone: true,
    imports: [DropDownComponent]
})
export class NayaSystemComponent implements OnInit {
    @Input() field: any = {};
    @Input() form: UntypedFormGroup;

    constructor(    ) {
    }

    ngOnInit() {
    }
}
