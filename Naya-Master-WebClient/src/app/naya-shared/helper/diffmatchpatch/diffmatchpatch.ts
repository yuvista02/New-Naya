// @ts-expect-error
import { diff_match_patch } from "diffmatchpatch";
import { DMPResult } from "./dmp-result";
import { BlackLinesMode } from "@naya-shared/types/black-lines-algorithm.type";

export function DMP_IsExactMatch(originalText: string, modifiedText: string, algorithm: BlackLinesMode
    ): boolean {
    
    let exactMatch = false;
    let blackLineResult: DMPResult[] = DMP_FindDifference(originalText, modifiedText, algorithm);
    if (blackLineResult.length === 1) {
        exactMatch = true;
    }
    return exactMatch;
}

export function DMP_FindDifference(originalText: string, modifiedText: string, algorithm: BlackLinesMode
    ): DMPResult[] {
    
    // Trimming the texts before lets exact match work better
    originalText = originalText.trim();
    modifiedText = modifiedText.trim();

    if (algorithm === "Semantic Search")
        return DMP_FindSemanticDifference(originalText, modifiedText);
    else if (algorithm === "Line Mode")
        return DMP_FindSemanticDifferenceLineMode(originalText, modifiedText);
    else
        return DMP_FindSemanticDifferenceWordMode(originalText, modifiedText);
}

/**
 * Find and return semantic differences between two pieces of text, treating characters as units.
 *
 * @param originalText The original text to compare.
 * @param modifiedText The modified text to compare against the original.
 * @returns An array of semantic differences between the two texts.
 */
function DMP_FindSemanticDifference(originalText: string, modifiedText: string) {
    let dmp = new diff_match_patch();
    let differenceOnCharacters = dmp.diff_main(originalText, modifiedText);
    let differenceOnWords: [number, string][] = differenceOnCharacters;
    dmp.diff_cleanupSemantic(differenceOnWords);

    return differenceOnWords.map(d => new DMPResult(d));
}

/**
 * Find and return semantic differences between two pieces of text, treating lines as units.
 *
 * For more information about line or word diffs, refer to:
 * https://github.com/google/diff-match-patch/wiki/Line-or-Word-Diffs
 * 
 * @param originalText The original text to compare.
 * @param modifiedText The modified text to compare against the original.
 * @returns An array of semantic differences between the two texts.
 */
function DMP_FindSemanticDifferenceLineMode(originalText: string, modifiedText: string) {
    let dmp = new diff_match_patch();
    let a = dmp.diff_linesToChars_(originalText, modifiedText);
    let lineText1 = a.chars1;
    let lineText2 = a.chars2;
    let lineArray = a.lineArray;
    let differenceOnWords: [number, string][] = dmp.diff_main(lineText1, lineText2, false);
    dmp.diff_charsToLines_(differenceOnWords, lineArray);
    dmp.diff_cleanupSemantic(differenceOnWords);
    return differenceOnWords.map(d => new DMPResult(d));
    
}

/**
 * Find and return semantic differences between two pieces of text, treating words as units.
*
* For more information about line or word diffs, refer to:
 * https://github.com/google/diff-match-patch/wiki/Line-or-Word-Diffs
 * 
 * @param originalText The original text to compare.
 * @param modifiedText The modified text to compare against the original.
 * @returns An array of semantic differences between the two texts.
*/
function DMP_FindSemanticDifferenceWordMode(originalText: string, modifiedText: string) {
    let dmp = new diff_match_patch();
    let a = dmp.diff_linesToWords_(originalText, modifiedText);
    let lineText1 = a.chars1;
    let lineText2 = a.chars2;
    let lineArray = a.lineArray;
    let differenceOnWords: [number, string][] = dmp.diff_main(lineText1, lineText2, false);
    dmp.diff_charsToLines_(differenceOnWords, lineArray);
    dmp.diff_cleanupSemantic(differenceOnWords);
    return differenceOnWords.map(d => new DMPResult(d));
}