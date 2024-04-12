interface StringConstructor {
    empty: string;
    isNullOrWhiteSpace(str: string | null): boolean;
    currentTimeStamp(): string;
    createRoute(...routeParts: (string | number)[]): string;
}

String.empty = "";

String.isNullOrWhiteSpace = (str : string | null) => {
    if (str == null)
        return true;
    if (typeof str === 'string' && str.trim() === String.empty)
        return true;
    return false;
}

String.currentTimeStamp = function (): string {
    const value: string = performance.now().toString();
    return value;
}

String.createRoute = function (...urlParts: (string | number)[]): string {
    return urlParts.join("/");
}