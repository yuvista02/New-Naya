import {Component, Input} from '@angular/core';
import { NgClass } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'naya-precedence-actions',
    templateUrl: './precedence-actions.component.html',
    styleUrls: ['./precedence-actions.component.css'],
    standalone: true,
    imports: [TooltipModule, NgClass]
})

export class PrecedenceActionsComponent {
    @Input() item: any;

}
