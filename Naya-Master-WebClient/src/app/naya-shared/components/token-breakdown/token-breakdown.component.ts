import { Component, Input } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { TokenBreakdown } from '@naya-shared/models/token-breakdown.model'

@Component({
    selector: 'naya-token-breakdown',
    templateUrl: './token-breakdown.component.html',
    styleUrls: ['./token-breakdown.component.scss'],
    standalone: true,
    imports: [TooltipModule, ProgressBarModule, OverlayPanelModule, SharedModule]
})
export class TokenBreakdownComponent {
  @Input() public NSTokenBreakdown: TokenBreakdown = { promptTokens: 0, inputTokens: 0, maxOutputTokens: 0, used: 0, limit: 0 };
}
