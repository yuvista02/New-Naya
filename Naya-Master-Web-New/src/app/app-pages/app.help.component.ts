import { Component } from '@angular/core';
import {AppBreadcrumbService} from '../app-layout/services/app.breadcrumb.service';
import { SharedModule } from 'primeng/api';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-help',
    templateUrl: './app.help.component.html',
    standalone: true,
    imports: [
        InputTextModule,
        AccordionModule,
        SharedModule,
    ],
})
export class AppHelpComponent {

    constructor(private _appBreadcrumbService: AppBreadcrumbService) {
        this._appBreadcrumbService.setItems([
            { label: 'Pages' },
            { label: 'Help', routerLink: ['/pages/help'] }
        ]);
    }
}
