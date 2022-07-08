# jsonup

This is a zero dependency compile-time json-parser written in TypeScript.

## Usage

```typescript
import { JSONUP, ObjectLike } from 'jsonup'

const src = `{ "name": "jsonup" }` as const

type Str = typeof src      // Type: `'{ "name": "jsonup" }'`
type Obj = ObjectLike<Str> // Type: `{ name: string }`

/**
 * JSONUP.parse infers the type from a given object.
 * The type parameter is optional.
 */
// Type: `{ name: string }` the given record type
// Value: `{ name: "jsonup" }` the generated object
let obj = JSONUP.parse(src) 
    obj = JSONUP.parse<Obj>(src)

/**
 * JSONUP.stringify guarantees the semantic equality between 
 * the generated string and the given literal type. 
 * the type parameter is required (maybe).
 */
// Type: `'{ "name": "jsonup" }'` the given literal type
// Value: `'{ "name": "jsonup" }'` the generated string
const str = JSONUP.stringify<Str>(obj) 
```

## Copyright and License

(c) 2022 TANIGUCHI Masaya. https://git.io/mit-license
