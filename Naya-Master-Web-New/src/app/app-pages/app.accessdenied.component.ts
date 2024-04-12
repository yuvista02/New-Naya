import { Component } from "@angular/core";
import { RippleModule } from "primeng/ripple";
import { ButtonModule } from "primeng/button";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-accessdenied",
    templateUrl: "./app.accessdenied.component.html",
    standalone: true,
    imports: [
        RouterLink,
        ButtonModule,
        RippleModule,
    ],
})
export class AppAccessdeniedComponent {}
