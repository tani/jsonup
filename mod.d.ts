/*! (c) 2022 TANIGUCHI Masaya. https://git.io/mit-license */
declare type StringifyArgs = Parameters<typeof JSON.stringify>;
declare type ParseArgs = Parameters<typeof JSON.parse>;
export declare class JSONUP {
    static parse<T extends string>(string: T, reviver?: ParseArgs[1]): ObjectLike<T>;
    static stringify<T extends string>(object: ObjectLike<T>, replacer?: StringifyArgs[1], space?: StringifyArgs[2]): T;
}
export declare type ObjectLike<T> = JsonValue<T> extends [infer L, ''] ? L : never;
declare type Trim<T> = T extends `${' ' | ' \t' | '\n' | '\r'}${infer S}` ? Trim<S> : T extends `${infer S}${' ' | ' \t' | '\n' | '\r'}` ? Trim<S> : T;
declare type JsonValue<T> = JsonStringValue<T> | JsonNumber<T> | JsonNull<T> | JsonBoolean<T> | JsonArray<T> | JsonObject<T>;
declare type JsonStringKeyInner<T, U extends string> = Trim<T> extends `\\"${infer S}` ? JsonStringKeyInner<S, `${U}"`> : Trim<T> extends `"${infer S}` ? [U, Trim<S>] : Trim<T> extends `${infer L}${infer R}` ? JsonStringKeyInner<R, `${U}${L}`> : never;
declare type JsonStringKey<T> = Trim<T> extends `"${infer S}` ? JsonStringKeyInner<S, ''> : never;
declare type JsonStringValueInner<T, U extends string> = Trim<T> extends `\\"${infer S}` ? JsonStringValueInner<S, `${U}"`> : Trim<T> extends `"${infer S}` ? [string, Trim<S>] : Trim<T> extends `${infer L}${infer R}` ? JsonStringValueInner<R, `${U}${L}`> : never;
declare type JsonStringValue<T> = Trim<T> extends `"${infer S}` ? JsonStringValueInner<S, ''> : never;
declare type JsonNumber<T> = Trim<T> extends `${number}` ? [number, ''] : Trim<T> extends `${number}]${infer R}` ? [number, Trim<`]${R}`>] : Trim<T> extends `${number}}${infer R}` ? [number, Trim<`}${R}`>] : Trim<T> extends `${number},${infer R}` ? [number, Trim<`,${R}`>] : never;
declare type JsonNull<T> = Trim<T> extends `${null}` ? [null, ''] : Trim<T> extends `${null}]${infer R}` ? [null, Trim<`]${R}`>] : Trim<T> extends `${null}}${infer R}` ? [null, Trim<`}${R}`>] : Trim<T> extends `${null},${infer R}` ? [null, Trim<`,${R}`>] : never;
declare type JsonBoolean<T> = Trim<T> extends `${boolean}` ? [boolean, ''] : Trim<T> extends `${boolean}]${infer R}` ? [boolean, Trim<`]${R}`>] : Trim<T> extends `${boolean}}${infer R}` ? [boolean, Trim<`}${R}`>] : Trim<T> extends `${boolean},${infer R}` ? [boolean, Trim<`,${R}`>] : never;
declare type JsonArrayInner<T, L> = JsonValue<T> extends [infer V, `,${infer R}`] ? JsonArrayInner<R, V | L> : JsonValue<T> extends [infer V, `]${infer R}`] ? [(V | L)[], Trim<R>] : never;
declare type JsonArray<T> = Trim<T> extends `[]${infer R}` ? [[], Trim<R>] : Trim<T> extends `[${infer S}` ? JsonArrayInner<S, never> : never;
declare type JsonKeyValue<T> = JsonStringKey<T> extends [infer K extends string, `:${infer R}`] ? (JsonValue<R> extends [infer V, infer Q] ? [{
    [_ in K]: V;
}, Trim<Q>] : never) : never;
declare type Flatten<T> = T extends Record<string, unknown> ? {
    [k in keyof T]: T[k];
} : never;
declare type JsonObjectInner<T, L> = JsonKeyValue<T> extends [infer KV, `,${infer R}`] ? JsonObjectInner<R, L & KV> : JsonKeyValue<T> extends [infer KV, `}${infer R}`] ? [Flatten<L & KV>, Trim<R>] : never;
declare type JsonObject<T> = Trim<T> extends `{}${infer R}` ? [{}, Trim<R>] : Trim<T> extends `{${infer S}` ? JsonObjectInner<S, {}> : never;
export {};
