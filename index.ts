export type JSON<T> = JsonValue<T> extends [infer L, ''] ? L : never;

type Trim<T> =
  T extends `${' ' | ' \t' | '\n' | '\r'}${infer S}` ? Trim<S> :
  T extends `${infer S}${' ' | ' \t' | '\n' | '\r'}` ? Trim<S> : T;

type JsonValue<T> =
  JsonStringValue<T> | JsonNumber<T> | JsonNull<T> | JsonBoolean<T> | JsonArray<T> | JsonObject<T>

type JsonStringKeyInner<T, U extends string> =
  Trim<T> extends `\\"${infer S}` ? JsonStringKeyInner<S, `${U}"`> :
  Trim<T> extends `"${infer S}` ? [U, Trim<S>] : 
  Trim<T> extends `${infer L}${infer R}` ? JsonStringKeyInner<R, `${U}${L}`> :
  never;

type JsonStringKey<T> =
  Trim<T> extends `"${infer S}` ? JsonStringKeyInner<S, ''> : never;

type JsonStringValueInner<T, U extends string> =
  Trim<T> extends `\\"${infer S}` ? JsonStringValueInner<S, `${U}"`> :
  Trim<T> extends `"${infer S}` ? [string, Trim<S>] : 
  Trim<T> extends `${infer L}${infer R}` ? JsonStringValueInner<R, `${U}${L}`> :
  never;

type JsonStringValue<T> =
  Trim<T> extends `"${infer S}` ? JsonStringValueInner<S, ''> : never;

type JsonNumber<T> =
  Trim<T> extends `${infer _ extends number}` ? [number, ''] :
  Trim<T> extends `${infer _ extends number}]${infer R}` ? [number, Trim<`]${R}`>] :
  Trim<T> extends `${infer _ extends number}}${infer R}` ? [number, Trim<`}${R}`>] :
  Trim<T> extends `${infer _ extends number},${infer R}` ? [number, Trim<`,${R}`>] :
  never;

type JsonNull<T> =
  Trim<T> extends `${infer _ extends null}` ? [null, ''] :
  Trim<T> extends `${infer _ extends null}]${infer R}` ? [null, Trim<`]${R}`>] :
  Trim<T> extends `${infer _ extends null}}${infer R}` ? [null, Trim<`}${R}`>] :
  Trim<T> extends `${infer _ extends null},${infer R}` ? [null, Trim<`,${R}`>] :
  never;

type JsonBoolean<T> =
  Trim<T> extends `${infer _ extends boolean}` ? [boolean, ''] :
  Trim<T> extends `${infer _ extends boolean}]${infer R}` ? [boolean, Trim<`]${R}`>] :
  Trim<T> extends `${infer _ extends boolean}}${infer R}` ? [boolean, Trim<`}${R}`>] :
  Trim<T> extends `${infer _ extends boolean},${infer R}` ? [boolean, Trim<`,${R}`>] :
  never;

type JsonArrayInner<T, L> =
  JsonValue<T> extends [infer V, `,${infer R}`] ? JsonArrayInner<R, V | L> :
  JsonValue<T> extends [infer V, `]${infer R}`] ? [(V | L)[], Trim<R>] : never;

type JsonArray<T> =
  Trim<T> extends `[]${infer R}` ? [[], Trim<R>] :
  Trim<T> extends `[${infer S}` ? JsonArrayInner<S, never> : never;

type JsonKeyValue<T> =
  JsonStringKey<T> extends [infer K extends string, `:${infer R}`] ? 
    (JsonValue<R> extends [infer V, infer Q] ? [{[_ in K]: V}, Trim<Q>] : never) : never

type Flatten<T> = T extends Record<string, unknown> ? { [k in keyof T] : T[k] } : never

type JsonObjectInner<T, L> =
  JsonKeyValue<T> extends [infer KV, `,${infer R}`] ? JsonObjectInner<R, L & KV> :
  JsonKeyValue<T> extends [infer KV, `}${infer R}`] ? [Flatten<L & KV>, Trim<R>] : never;

type JsonObject<T> =
  Trim<T> extends `{}${infer R}` ? [{}, Trim<R>] :
  Trim<T> extends `{${infer S}` ? JsonObjectInner<S, {}> : never;
