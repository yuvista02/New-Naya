import { Component, Input, OnInit }     from "@angular/core";
//Naya Imports
import { ModifiedField }                from "@naya-shared/models/modified-field.model";
import { FieldValues }                  from "@naya-shared/constants/field-values";
import { NayaNotification }             from "@naya-shared/models/naya-notification/naya-notification.model";
import { CardModule } from "primeng/card";
import { TooltipModule } from "primeng/tooltip";
import { SharedModule } from "primeng/api";
import { TimelineModule } from "primeng/timeline";
import { NgClass } from "@angular/common";

@Component({
    selector: "naya-notification-timeline-view",
    templateUrl: "./naya-notification-timeline-view.component.html",
    styleUrls: ["./naya-notification-timeline-view.component.scss"],
    standalone: true,
    imports: [
        NgClass,
        TimelineModule,
        SharedModule,
        TooltipModule,
        CardModule,
    ],
})
export class NayaNotificationTimelineViewComponent implements OnInit {
    @Input() public NSModifiedFieldList: ModifiedField[];
    @Input() public MSNotificationMessage: string;
    @Input() public MSNotification: NayaNotification;

    public NSNoValue: string = FieldValues.NoValue;
    public NSModifiedBy: string;
    constructor() {}

    ngOnInit(): void {
        this.setModifiedBy();
    }

    public NSHasMultipleData(): boolean {
        return this.NSModifiedFieldList.length >= 4 ? true : false;
    }

    public NSGetPropertyName(propertyName: string): string {        
        return (
            propertyName?.charAt(0).toUpperCase() + propertyName?.slice(1)
        ).getDisplayName();
    }

    public NSGetEntity(): string {
        let name = this.MSNotification.name;
        return  name.slice(0, name.indexOf("was")).trim();
    }

    private setModifiedBy() {
        if (!this.MSNotificationMessage) return;

        this.NSModifiedBy = this.extractText(this.MSNotificationMessage);
    }

    private extractText(message: string) {
        let keywords = ["deleted by", "created by", "modified by"];
        for (let keyword of keywords) {
            let index = message.indexOf(keyword);
            if (index != -1) {
                return `${message.slice(index + keyword.length).trim()}`;
            }
        }
        return String.empty;
    }

}
