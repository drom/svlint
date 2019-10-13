# svlint

SystemVerilog Linter

## Install

```
npm i svlint
```

## CLI Use

```
svlint < myblock.sv
```

## API Use

```js

const svlinter = require('svlint/lib/linter.js');

svlinter(tree.rootNode, (node, severity, excerpt) =>
  console.error(node, severity, excerpt));

```
