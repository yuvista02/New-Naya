import { Directive, Input, TemplateRef } from '@angular/core';

type NayaTemplates = "filter" | "button";

@Directive({
    selector: '[nayaTemplate]',
    standalone: true
})
export class NayaTemplateDirective {
    @Input() nayaTemplate!: NayaTemplates;
    constructor(private _filterTemplateRef: TemplateRef<any>) {
    }

    public MSGetFilterTemplate(): TemplateRef<any> | null {
        if ("filter".equalsIgnoreCase(this.nayaTemplate)) {
            return this._filterTemplateRef
        }
        return null;
    }
    public MSGetButtonTemplate(): TemplateRef<any> | null {
        if ("button".equalsIgnoreCase(this.nayaTemplate)) {
            return this._filterTemplateRef
        }
        return null;
    }
}
