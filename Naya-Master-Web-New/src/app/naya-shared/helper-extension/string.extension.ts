interface String {
    /**
     * Converts a string to camelCase format.
     * ## Example
     * ```ts
     * "CamelCase".toCamelCase(); // returns "camelCase"
     * ```
     */
    toCamelCase(): string;

    /**
     * Returns a formatted display name by inserting spaces before uppercase letters.
     * ## Example
     * ```ts
     * "someDisplayName".getDisplayName(); // returns "Some Display Name"
     * ```
     */
    getDisplayName(): string;

    /**
     * Converts each word in a string to title case (first letter uppercase, the rest lowercase).
     * ## Example
     * ```ts
     * "title case example".toTitleCase(); // returns "Title Case Example"
     * ```
     */
    toTitleCase(): string;

    /**
     * Replaces characters not suitable for a file name with '-'.
     * ## Example
     * ```ts
     * "file?name*example.txt".ensureFileName(); // returns "file-name-example.txt"
     * ```
     */
    ensureFileName(): string;

    /**
     * Returns the file extension, including the dot ('.') separator.
     * ## Example
     * ```ts
     * "exampleFile.txt".getFileExtension(); // returns ".txt"
     * ```
     */
    getFileExtension(): string;

    /**
    * Replaces underscores with spaces in the string.
    * ## Example
    * ```ts
    * "underscored_string".underscoreToSpace(); // returns "underscored string"
    * ```
    */
    underscoreToSpace(): string;
    /**
     * Removes the file extension from a string.
     * ## Example
     * ```ts
     * "exampleFile.txt".removeExtension(); // returns "exampleFile"
     * ```
     */
    removeExtension(): string;

    /**
     * Compares the current string to another string in a case-insensitive manner.
     * 
     * @param secondString - The string to compare with.
     * @returns `true` if the strings are equal (case-insensitive), `false` otherwise.
     * 
     * ## Example
     * 
     * ```ts
     * const path: string = "PATH";
     * path.equalsIgnoreCase("pAth") // returns true
     * ```
     */
    equalsIgnoreCase(secondString?: string | null): boolean;

    /**
     * Formats string to match Angular route parameter.
     * ## Example
     * ```ts
     * "GoldID".toRouteParam(); // returns ":GoldID"
     * ```
     */
    toRouteParam(): string;
    /** Naya Utitlity Code : Converts Utc date string to local date */
    toLocalDate(): Date;
}

String.prototype.toRouteParam = function (): string {
    return ':'+ this;
};

String.prototype.underscoreToSpace = function (): string {
    const parts = this.split('_');
    const spacedString = parts.join(' ');
    return spacedString;
};

String.prototype.toCamelCase = function (): string {
    return this.replace(/(?:^\w|[A-Z]|-|\b\w)/g,
        (ltr, idx) => idx === 0
            ? ltr.toLowerCase()
            : ltr.toUpperCase()
    ).replace(/\s+|-/g, '');
};

String.prototype.getDisplayName = function (): string {
    const trimText = this.replace(/ +/g, "");
    const displayName: string = trimText.replace(/([A-Z])/g, ' $1').trim();
    return displayName[0]?.toUpperCase() + displayName.substring(1);
};

String.prototype.toTitleCase = function (): string {
    return this.replace(/(\w)(\w*)/g,
        function (_g0, g1, g2) { return g1.toUpperCase() + g2.toLowerCase(); });
};

String.prototype.ensureFileName = function (): string {
    return this.replace(/[/\\?%*:|"<>]/g, '-');
};

String.prototype.getFileExtension = function (): string {
    return `.${this.split('.').pop()}`;
}

String.prototype.removeExtension = function (): string {
    return this.replace(/\.[^/.]+$/, "")
}

String.prototype.equalsIgnoreCase = function (secondString?: string | null): boolean {
    // if firstString is null, then this method will not be called and a run-time error will be generated
    if (secondString != null) {
        if (this.toLowerCase() === secondString.toLowerCase())
            return true;
    }
    return false;
}

String.prototype.toLocalDate = function (): Date {
    return new Date(this + 'Z');
}
