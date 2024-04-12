interface Array<T> {
    isEmpty(): boolean;
    /**
     * Orders the array by multiple fields specified as strings.
     * @param fields - The fields to sort the array by.
     * @returns The sorted array.
     */
    orderBy(...fields: (keyof T)[]): T[];
    /**
    * Orders the array by multiple fields specified as strings in the descending order
    * @param fields - The fields to sort the array by.
    * @returns The sorted array in descending order.
    */
    orderByDescending(...fields: (keyof T)[]): T[];
}

if (!Array.prototype.isEmpty) {
    Array.prototype.isEmpty = function () {
        return Array.isArray(this) && this.length === 0;
    }
}

if (!Array.prototype.orderBy) {
    Array.prototype.orderBy = function (...fields: string[]) {
        const compareFn = (objectA: any, objectB: any, field: string): number => {
            const valueA = objectA ? objectA[field] : null;
            const valueB = objectB ? objectB[field] : null;

            if (valueA === valueB) {
                return 0;
            }
            if (valueA === null || valueA === undefined) {
                return 1; // Place objectA after objectB if valueA is null or undefined
            }
            if (valueB === null || valueB === undefined) {
                return -1; // Place objectB after objectA if valueB is null or undefined
            }
            if (valueA < valueB) {
                return -1;
            }
            return 1;
        };


        return this.sort((elementA: any, elementB: any) => {
            for (const field of fields) {
                const order = compareFn(elementA, elementB, field);
                if (order !== 0) {
                    return order;
                }
            }
            return 0;
        });
    };
}

if (!Array.prototype.orderByDescending) {
    Array.prototype.orderByDescending = function (...fields: string[]) {
        const compareFn = (objectA: any, objectB: any, field: string): number => {
            const valueA = objectA ? objectA[field] : null;
            const valueB = objectB ? objectB[field] : null;

            if (valueA === valueB) {
                return 0;
            }
            if (valueA === null || valueA === undefined) {
                return -1; // Place objectA after objectB if valueA is null or undefined
            }
            if (valueB === null || valueB === undefined) {
                return 1; // Place objectB after objectA if valueB is null or undefined
            }
            if (valueA < valueB) {
                return 1;
            }
            return -1;
        };


        return this.sort((elementA: any, elementB: any) => {
            for (const field of fields) {
                const order = compareFn(elementA, elementB, field);
                if (order !== 0) {
                    return order;
                }
            }
            return 0;
        });
    };
}

