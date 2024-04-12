import { Component, OnDestroy, OnInit } from '@angular/core';
// MS Imports
import { NayaNotification } from '@naya-shared/models/naya-notification/naya-notification.model';
import { NayaNotificationService } from '@naya-shared/services/naya-notification.service';
import { NayaNotificationTimelineViewComponent } from '../naya-notification-timeline-view/naya-notification-timeline-view.component';
import { SharedModule } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { NgIf, NgFor, NgClass } from '@angular/common';

@Component({
    selector: 'naya-notification',
    templateUrl: './naya-notification.component.html',
    styleUrls: ['./naya-notification.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, NgClass, ButtonModule, RippleModule, TooltipModule, OverlayPanelModule, SharedModule, NayaNotificationTimelineViewComponent]
})
export class NayaNotificationComponent implements OnInit, OnDestroy {

    constructor(private _notificationService: NayaNotificationService,
    ) {
    }
    ngOnInit(): void {
    }
    public get NotificationList() {
        return this._notificationService.NotificationList;
    }

    public ClearNotifications() {
        this._notificationService.ClearNotification();
    }

    public ReadNotifications() {
        this._notificationService.ReadNotifications();
    }

    public OnDownloadFileClick(notification: NayaNotification) {
        this._notificationService.OnDownloadFileClick(notification);
    }

    public OnViewLogsClick(notification: NayaNotification) {
        this._notificationService.OnViewLogsClick(notification);
    }


    ngOnDestroy(): void {
        this.ReadNotifications();
    }

}
