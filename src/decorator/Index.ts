import {getMetadataArgsStorage} from "../index";
import {IndexMetadataArgs} from "../metadata-args/IndexMetadataArgs";
import {IndexOptions} from "./options/IndexOptions";

/**
 * Composite index must be set on entity classes and must specify entity's fields to be indexed.
 */
export function Index(options?: IndexOptions): Function;

/**
 * Composite index must be set on entity classes and must specify entity's fields to be indexed.
 */
export function Index(name: string, options?: IndexOptions): Function;

/**
 * Composite index must be set on entity classes and must specify entity's fields to be indexed.
 */
export function Index(name: string, fields: string[], options?: IndexOptions): Function;

/**
 * Composite index must be set on entity classes and must specify entity's fields to be indexed.
 */
export function Index(fields: string[], options?: IndexOptions): Function;

/**
 * Composite index must be set on entity classes and must specify entity's fields to be indexed.
 */
export function Index(fields: (object: any) => any[], options?: IndexOptions): Function;

/**
 * Composite index must be set on entity classes and must specify entity's fields to be indexed.
 */
export function Index(name: string, fields: (object: any) => any[], options?: IndexOptions): Function;

/**
 * Composite index must be set on entity classes and must specify entity's fields to be indexed.
 */
export function Index(nameOrFieldsOrOptions: string|string[]|((object: any) => any[])|IndexOptions,
                      maybeFieldsOrOptions?: ((object: any) => any[])|IndexOptions|string[],
                      maybeOptions?: IndexOptions): Function {
    const name = typeof nameOrFieldsOrOptions === "string" ? nameOrFieldsOrOptions : undefined;
    const fields = typeof nameOrFieldsOrOptions === "string" ? <((object: any) => any[])|string[]> maybeFieldsOrOptions : nameOrFieldsOrOptions as string[];
    let options = (typeof nameOrFieldsOrOptions === "object" && !Array.isArray(nameOrFieldsOrOptions)) ? nameOrFieldsOrOptions as IndexOptions : maybeOptions;
    if (!options)
        options = (typeof maybeFieldsOrOptions === "object" && !Array.isArray(maybeFieldsOrOptions)) ? nameOrFieldsOrOptions as IndexOptions : maybeOptions;

    return function (clsOrObject: Function|Object, propertyName?: string) {
        const args: IndexMetadataArgs = {
            target: propertyName ? clsOrObject.constructor : clsOrObject as Function,
            name: name,
            columns: propertyName ? [propertyName] : fields,
            unique: options && options.unique ? true : false
        };
        getMetadataArgsStorage().indices.add(args);
    };
}
