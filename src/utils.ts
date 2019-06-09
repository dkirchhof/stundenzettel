export function isUndefined(...args: any[]) {
    return args.some(a => a === undefined);
}

export function assignDefinedProperties<S extends any>(target: any, source: S, properties: (keyof S)[]) {
    properties.forEach(p => {
        if(source[p] !== undefined) {
            if(source[p] === "null") {
                delete target[p];
            } else {
                target[p] = source[p];
            }
        }
    });

    return target;
}

// Object.fromEntries(Object.entries(x).filter(([,v]) => v.length))