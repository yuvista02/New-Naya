import { Component, Input, OnInit } from "@angular/core";
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NayaFormControlComponent } from "@app/naya-shared/components/naya-form-control/naya-form-control.component";
import { InputTextModule } from "primeng/inputtext";

@Component({
    selector: "naya-percentage",
    templateUrl: "./percentage.component.html",
    standalone: true,
    imports: [
        NayaFormControlComponent,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
    ],
})
export class PercentageComponent implements OnInit {
    @Input() field: any = {};
    @Input() form!: UntypedFormGroup;

    ngOnInit() {
    }

    constructor() { }
}
