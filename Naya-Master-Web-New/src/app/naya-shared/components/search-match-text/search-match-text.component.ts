import { Component, Input } from '@angular/core';
// MS Imports
import { NgIf, NgFor, NgClass } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'ms-search-match-text',
  templateUrl: './search-match-text.component.html',
  styleUrls: ['./search-match-text.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, NgClass, InputTextModule]
})
export class SearchMatchTextComponent {
  @Input() public MSSearchedText: string = String.empty;
  @Input() public MSSearchedTextList: string[] = [];
  @Input() public MSOriginalContent: string = String.empty;

  private escapeRegExp(input: string): string {
    return input.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  public get NSHighlightedText(): string {
    if (!this.MSSearchedText && this.MSSearchedTextList.length === 0) {
      return this.MSOriginalContent;
    }

    if (this.MSSearchedText) {
      const escapedSearchTerm = this.escapeRegExp(this.MSSearchedText);
      this.MSSearchedTextList.push(escapedSearchTerm);
    }

    this.MSSearchedTextList = this.MSSearchedTextList.map(this.escapeRegExp);

    const regex = new RegExp(this.MSSearchedTextList.join('|'), 'gi');
    return this.MSOriginalContent.replace(regex, match => `<span class="highlightText">${match}</span>`);
  }
}
