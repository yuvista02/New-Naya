import {Component} from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-contactus',
    templateUrl: './app.contactus.component.html',
    standalone: true,
    imports: [
        RouterLink,
        ButtonModule,
        RippleModule,
        InputTextModule,
        InputTextareaModule,
    ],
})
export class AppContactusComponent{

}
