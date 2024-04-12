interface ObjectConstructor {
    /**
         * Safely Define Property in an Object if it does not already exist.
         *
         * This utility function defines a new property on the specified object `target` with the given `propertyName`,
         * if the property does not already exist. The `propertyValue` is assigned to the newly created property.
         *
         * @param target The object to which the property will be added if it does not already exist.
         * @param propertyName The name of the property to be defined on the object.
         * @param propertyValue The value to be assigned to the newly created property.
         */
    safelyDefineProperty<T, K extends keyof T>(target: T, propertyName: K, propertyValue: T[K]): void;
    /**
     * This TypeScript function checks whether a specified property name exists within a given object.
     */
    isPropertyExists<T extends Object, K extends keyof T>(obj: T, propertyName: K): boolean;

    safelyDeleteProperty<T extends Object, K extends keyof T>(obj: T, propertyName: K): void;
}

Object.safelyDefineProperty = function <T, K extends keyof T>(
    target: T,
    propertyName: K,
    propertyValue: T[K]
) {
    if (target == null) return;
    if (typeof target !== "object") return;
    if (!(propertyName in target)) {
        Object.defineProperty(target, propertyName, {
            value: propertyValue,
            writable: true,
            enumerable: true,
            configurable: true,
        });
    }
    else {
        (target as T)[propertyName] = propertyValue;
    }
}


Object.isPropertyExists = function hasProperty<T extends Object, K extends keyof T>(obj: T, propertyName: K): boolean {
    return propertyName in obj;
}

Object.safelyDeleteProperty = function hasProperty<T extends Object, K extends keyof T>(obj: T, propertyName: K): void {
    if (Object.isPropertyExists(obj, propertyName)) {
        delete obj[propertyName];
    }
}