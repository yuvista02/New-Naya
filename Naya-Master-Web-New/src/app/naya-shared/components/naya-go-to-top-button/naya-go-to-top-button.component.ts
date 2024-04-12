import { ViewportScroller, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'naya-go-to-top-button',
    templateUrl: './naya-go-to-top-button.component.html',
    styleUrls: ['./naya-go-to-top-button.component.scss'],
    standalone: true,
    imports: [NgIf, ButtonModule, RippleModule]
})
export class NayaGoToTopButtonComponent {
  private readonly VIEWPORT_THRESHOLD: number = 250;
  public NSShowBackToTopButton: boolean = false;
  constructor(private _viewportScroller: ViewportScroller) { }
  public NSScrollToTop(): void {
    this._viewportScroller.scrollToPosition([0, 0]);
  }

  @HostListener('window:scroll', [])
  public MSOnWindowScroll(): void {
    this.checkScrollPosition();
  }

  private checkScrollPosition(): void {
    // Check the page offset to determine whether to show the button
    const yOffset = this._viewportScroller.getScrollPosition()[1];
    this.NSShowBackToTopButton = yOffset > this.VIEWPORT_THRESHOLD;
  }
}
