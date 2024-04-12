import {Component, Input} from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'naya-empty-state',
    templateUrl: './empty-state.component.html',
    styleUrls: ['./empty-state.component.scss'],
    standalone: true,
    imports: [NgIf]
})

export class EmptyStateComponent {
    @Input() label: string = String.empty;

    constructor() {
    }


}
