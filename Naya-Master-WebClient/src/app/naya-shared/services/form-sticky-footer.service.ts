import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class FormStickyFooterService {
    public resize$: EventEmitter<any>;

    constructor() {
        this.resize$ = new EventEmitter();
    }

    toggleResize(e?: any): void {
        this.resize$.emit(e);
    }
}
