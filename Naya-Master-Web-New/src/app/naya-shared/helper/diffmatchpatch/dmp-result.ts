enum DMPOperation {
    deleted = -1,
    equal = 0,
    inserted = 1
}

class DMPOperationClass {
    static [DMPOperation.deleted]: string = "word-removed";
    static [DMPOperation.inserted] = "word-added";
    static [DMPOperation.equal] = "word-unchanged";
}
export class DMPResult {
    status: DMPOperation = DMPOperation.equal;
    word: string = String.empty;
    class: string = String.empty;
    constructor(diffOnWords: [number, string]) {
        this.status = diffOnWords[0];
        this.word = diffOnWords[1];
        this.class = DMPOperationClass[this.status];
    }
}
