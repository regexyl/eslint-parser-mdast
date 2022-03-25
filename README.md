# eslint-parser-mdast
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> An ESLint custom parser for generating markdown abstract syntax trees (in this case - [mdast](https://github.com/syntax-tree/mdast)). Uses [`mdast-util-from-markdown`](https://github.com/syntax-tree/mdast-util-from-markdown) under the hood.

Unlike a usual custom parser which parses JS files, this receives input from markdown (`.md`) files. 

This means that the `Program` node returned as part of the JS abstract syntax tree (AST) contains mostly dummy values, except for its property `markdown` which returns [`Root`](https://github.com/syntax-tree/mdast#root).

## Usage
1. Install package as a dev dependency:

```bash
yarn add -D eslint-parser-mdast
```

2. Include parser in your `.eslintrc` config:
```js
// .eslintrc
module.exports = {
  overrides: {
    '*.md': {
      parser: 'eslint-parser-mdast',
    },
  },
}
```

3. Retrieve `mdast` in your custom ESLint plugin rule:
```js
// src > rules > myCustomRule.js
module.exports = {
  meta: { ... },
  create: function(context) {
    return {
      Program(node) {
        // retrieve `mdast` with `node.markdown` here
      }
    }
  }
}
```
