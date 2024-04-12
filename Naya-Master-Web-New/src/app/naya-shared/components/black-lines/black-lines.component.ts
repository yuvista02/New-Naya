import { Component, Input, OnInit } from '@angular/core';
// MS Imports
import { DMP_FindDifference } from '@naya-shared/helper/diffmatchpatch/diffmatchpatch';
import { DMPResult } from '@naya-shared/helper/diffmatchpatch/dmp-result';
import { BlackLinesMode } from '../../types/black-lines-algorithm.type';
import { NgIf, NgFor, NgClass } from '@angular/common';

@Component({
    selector: 'ms-black-lines[MSOriginalText][MSModifiedText]',
    templateUrl: './black-lines.component.html',
    styleUrls: ['./black-lines.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, NgClass]
})
export class BlackLinesComponent implements OnInit {
    @Input() public MSOriginalText: string = String.empty;
    @Input() public MSModifiedText: string = String.empty;
    @Input() public MSBlackLineAlgorithm: BlackLinesMode = "Word Mode";
    public NSBlackLineResult: DMPResult[] = [];

    ngOnInit() {
        this.getBlackLineResult();
    }

    public MSResetBlackLine(): void{
        this.MSOriginalText = String.empty;
        this.MSModifiedText = String.empty;
        this.NSBlackLineResult = [];
    }
    private getBlackLineResult() {
        this.NSBlackLineResult = DMP_FindDifference(
            this.MSOriginalText,
            this.MSModifiedText,
            this.MSBlackLineAlgorithm
        );
    }    
}