# Typesafe get

A typesafe way to get nested properties when any parent properties might be undefined, while we wait for the [optional chaining operator](https://tc39.github.io/proposal-optional-chaining/) to finally exist.

With typesafe get, the below TypeScript code will run, without throwing any exceptions, for all valid values of `input`:

```ts
let input: { a: { b?: { c: null | { d: string } } } } | undefined = ...;
let result: string | undefined = get(input, 'a', 'b', 'c', 'd');
```

All parameters are validated as properties at the relevant level, and the return type will always be `finalPropType | undefined` (the type of the property at the very last level, or undefined).

If at any point while following the chain you attempt to follow a path through an undefined object then undefined is immediately returned, and you'll never see the dreaded `Cannot read property '<something>' of undefined` exception. It works with simple iteration over the property names provided, no crazy (and expensive) try/catch magic here.

### Using

```bash
yarn add ovotech/typesafe-get
```

This module ships with TypeScript types, so you should be able to immediately start using it in any environment with no further setup.

```ts
import { get } from 'typesafe-get';

// Equivalent to obj.aPropertyKey
get(obj, 'aPropertyKey');

// Equivalent to obj.key1.key2, but returning undefined if obj.key1 is undefined:
get(obj, 'key1', 'key2');

// Equivalent to obj.key1.key2.key3.key4.key5, but returning undefined if any step en route is undefined:
get(obj, 'key1', 'key2', 'key3', 'key4', 'key5');
```

Each parameter name is checked against the valid parameter names at that level (so a parameter name that definitely doesn't exist will be caught by TS).

The return type will be automatically inferred as the type the final parameter would have, if the whole chain is defined, or `undefined`.

`get` does _not_ support array indexes, only string-indexed object properties. This is a
typing limitation (the runtime implementation can actually handle this).

## Running the tests

```bash
yarn test
```

### Coding style (linting, etc) tests

Style is maintained with prettier and tslint

```
yarn lint
```

## Deployment

To deploy a new version, push to master and then create a new release. CircleCI will automatically build and deploy a the version to the npm registry.

## Contributing

Have a bug? File an issue with a simple example that reproduces this so we can take a look & confirm.

Want to make a change? Submit a PR, explain why it's useful, and make sure you've updated the docs (this file) and the tests (see `test/index.spec.ts`). You can run the tests with `yarn test`.

## Responsible Team

- Boost Internal Tools (BIT)

## License

This project is licensed under the MIT - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- Forked from: [pimterry/typesafe-get](https://github.com/pimterry/typesafe-get)
