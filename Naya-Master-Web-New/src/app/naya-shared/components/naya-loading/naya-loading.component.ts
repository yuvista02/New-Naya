import {Component, Input} from '@angular/core';

@Component({
    selector: 'naya-loading',
    templateUrl: './naya-loading.component.html',
    styleUrls: ['./naya-loading.component.css'],
    standalone: true
})

export class NayaLoadingComponent {
    @Input() public NSLoadingMessage: string = 'Loading Please wait...';
    constructor() {}
}
