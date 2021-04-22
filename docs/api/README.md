@bemoje/trie-map / [Exports](modules.md)

# TrieMap
A fast trie map data structure.

![GitHub Top Language](https://img.shields.io/github/languages/top/bemoje/trie-map)

##### Github
![GitHub Last Commit](https://img.shields.io/github/last-commit/bemoje/trie-map?color=red)
![GitHub Stars](https://img.shields.io/github/stars/bemoje/trie-map)
![GitHub Forks](https://img.shields.io/github/forks/bemoje/trie-map)
![GitHub Watchers](https://img.shields.io/github/watchers/bemoje/trie-map)
![GitHub Repo Size](https://img.shields.io/github/repo-size/bemoje/trie-map)

##### NPM
<span><a href="https://npmjs.org/@bemoje/trie-map" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@bemoje/trie-map" alt="NPM Version" /></a></span>
<span><a href="https://npmjs.org/@bemoje/trie-map" title="NPM Downloads"><img src="https://img.shields.io/npm/dt/@bemoje/trie-map" alt="NPM Downloads" /></a></span>
##### Travis CI
<span><a href="https://npmjs.org/@bemoje/trie-map" title="View this project on NPM"><img src="https://www.travis-ci.com/bemoje/trie-map.svg?branch=main" alt="dependencies" /></a></span>

##### Donate
<span><a href="https://www.patreon.com/user?u=40752770" title="Donate using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon Donation" /></a></span>

## Installation
This library is published in the NPM registry and can be installed using any compatible package manager.

#### NPM
```sh
npm install @bemoje/trie-map
npm install --save @bemoje/trie-map
npm install --save-dev @bemoje/trie-map
```

#### YARN
```sh
yarn add @bemoje/trie-map
```

#### CDN
Get minified ES6 UMD bundle from either of the popular CND's, UNPKG or JSDelivr.

```html
<!-- For UNPKG use the code below. -->
<script src="https://unpkg.com/@bemoje/trie-map"></script>

<!-- For JSDelivr use the code below. -->
<script src="https://cdn.jsdelivr.net/npm/@bemoje/trie-map"></script>

<script>
  // UMD module is exposed through the "TrieMap" global variable.
  console.log(TrieMap);
</script>
```

## Usage
```js
// default export
import TrieMap from '@bemoje/trie-map'

// named exports
import {TrieMap} from '@bemoje/trie-map'
```

See also the **[usage examples](/docs/api/modules.md)**.

## Documentation
- [Public API Documentation](/docs/api/modules.md)
- [Full Documentation](/docs/doc/modules.md)

## Distribution
This library is written in **TypeScript** compiled to ES6 JavaScript.

#### ES6 Module Bundles
- [CommonJS](/dist/index.js)
- [ESM](/dist/index.esm.js)
- [UMD](/dist/index.umd.js)
- [UMD Minified](/dist/index.umd.min.js)

#### Type Declarations
See the [declarations entry point](/types/index.d.ts).

## Tests
Tests are written with Jest. To run tests:

```sh
npm run test
```

## Issues
Please let me know of any bugs or [issues](https://github.com/bemoje/trie-map/issues).

## Contribute
Contributors are welcome to open a [pull request](https://github.com/bemoje/trie-map/pulls).

## License
Released under the [MIT License](./LICENSE).
