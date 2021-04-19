[@bemoje/trie-map](../README.md) / [Exports](../modules.md) / TrieMap

# Class: TrieMap<T\>

Class for a fast trie map.

## Type parameters

Name |
:------ |
`T` |

## Table of contents

### Constructors

- [constructor](triemap.md#constructor)

### Properties

- [root](triemap.md#root)

### Accessors

- [count](triemap.md#count)

### Methods

- [[Symbol.iterator]](triemap.md#[symbol.iterator])
- [clear](triemap.md#clear)
- [delete](triemap.md#delete)
- [deleteStrict](triemap.md#deletestrict)
- [ensureValidKey](triemap.md#ensurevalidkey)
- [entries](triemap.md#entries)
- [find](triemap.md#find)
- [forEach](triemap.md#foreach)
- [get](triemap.md#get)
- [getNode](triemap.md#getnode)
- [getStrict](triemap.md#getstrict)
- [has](triemap.md#has)
- [keys](triemap.md#keys)
- [load](triemap.md#load)
- [nodeDeleteValue](triemap.md#nodedeletevalue)
- [nodeGetValue](triemap.md#nodegetvalue)
- [nodeHasValue](triemap.md#nodehasvalue)
- [nodeSetValue](triemap.md#nodesetvalue)
- [nodeUpdateValue](triemap.md#nodeupdatevalue)
- [set](triemap.md#set)
- [setNode](triemap.md#setnode)
- [toArray](triemap.md#toarray)
- [toJson](triemap.md#tojson)
- [update](triemap.md#update)
- [values](triemap.md#values)
- [fromIterable](triemap.md#fromiterable)
- [fromJSON](triemap.md#fromjson)

## Constructors

### constructor

\+ **new TrieMap**<T\>(): [*TrieMap*](triemap.md)<T\>

Creates a new TrieMap instance.

**`example`** 
```js
const trie = new TrieMap();
```

#### Type parameters:

Name |
:------ |
`T` |

**Returns:** [*TrieMap*](triemap.md)<T\>

Defined in: index.ts:49

## Properties

### root

• **root**: *Record*<string, any\>

The TrieMap data structure root.

Defined in: index.ts:49

## Accessors

### count

• get **count**(): *number*

Returns the number of values in the TrieMap.

**`example`** 
```js
const trie = new TrieMap();

trie.
  .set(['some', 'path'], 'value')
  .count;
//=> 1
```

**Returns:** *number*

Defined in: index.ts:76

## Methods

### [Symbol.iterator]

▸ **[Symbol.iterator]**(`prefix?`: *string*[]): *Iterable*<[*string*[], T]\>

Returns an Iterable that yields each entry ([prefix, value]) in the TrieMap with the given prefix.

**`example`** 
```js
const trie = new TrieMap()
  .set(['src', 'classes'], 2)
  .set(['src', 'modules'], 2)
  .set(['docs'], 8);

[...trie];
//=> [
//   [['src', 'classes'], 2],
//   [['src', 'modules'], 2],
//   [['docs', 8]]
// ]
```

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`prefix?` | *string*[] | A string array.    |

**Returns:** *Iterable*<[*string*[], T]\>

Defined in: index.ts:599

___

### clear

▸ **clear**(): [*TrieMap*](triemap.md)<T\>

Deletes all entries from the TrieMap

**`example`** 
```js
const trie = new TrieMap();
trie.set(['some', 'path'], 'value');
trie.clear();
trie.count;
//=> 0
```

**Returns:** [*TrieMap*](triemap.md)<T\>

this/self (chainable)

Defined in: index.ts:112

___

### delete

▸ **delete**(`prefix`: *string*[]): *boolean*

Deletes the value at the given prefix. Returns whether the operation was successful.

**`example`** 
```js
const trie = new TrieMap();
trie.set(['some', 'path'], 'value');

trie.has(['some', 'path']);
//=> true

trie.delete(['some', 'path']);
//=> true (means operation was successful)

trie.has(['some', 'path']);
//=> false
```

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`prefix` | *string*[] | A string array.   |

**Returns:** *boolean*

Defined in: index.ts:353

___

### deleteStrict

▸ **deleteStrict**(`prefix`: *string*[]): *void*

Deletes the value at the given prefix or all values with the given prefix if ´prune´ is set to true.

**`throws`** {Error} if the operation was unsuccessful.

**`example`** 
```js
const trie = new TrieMap();

trie.delete(['nonexistent', 'path']);
//=> false (operation unsuccessful)

trie.deleteStrict(['nonexistent', 'path']);
//=> throws Error
```

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`prefix` | *string*[] | A string array.   |

**Returns:** *void*

Defined in: index.ts:408

___

### ensureValidKey

▸ `Protected`**ensureValidKey**(`key`: *string*): *void*

Ensures a string key of a string[] prefix is valid.

**`throws`** {Error} if illegal character encountered in prefix.

#### Parameters:

Name | Type |
:------ | :------ |
`key` | *string* |

**Returns:** *void*

Defined in: index.ts:89

___

### entries

▸ **entries**(`prefix?`: *string*[]): *Iterable*<[*string*[], T]\>

Returns an Iterable that yields each entry ([prefix, value]) in the TrieMap with the given prefix.

**`example`** 
```js
const trie = new TrieMap()
  .set(['src', 'classes'], 2)
  .set(['src', 'modules'], 2)
  .set(['docs'], 8);

[...trie.entries()];
//=> [
//   [['src', 'classes'], 2],
//   [['src', 'modules'], 2],
//   [['docs', 8]]
// ]
```

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`prefix` | *string*[] | A string array.    |

**Returns:** *Iterable*<[*string*[], T]\>

Defined in: index.ts:571

___

### find

▸ **find**(`prefix`: *string*[], `valueToFind`: T, `f`: (`value`: T, `prefix`: *string*[]) => *void*): [*TrieMap*](triemap.md)<T\>

Iterates all (value, prefix) where value === ´valueToFind´.

**`example`** 
```js
const directoryFileCounts = new TrieMap()
  .set(['src', 'classes'], 2)
  .set(['src', 'modules'], 2)
  .set(['docs'], 8);

const directoryPathsWithTwoFiles = [];
directoryFileCounts.find([], (value, prefix) => {
  if(value === 2) {
    directoryPathsWithTwoFiles.push(prefix);
  }
});
// directoryPathsWithTwoFiles will now contain: [
//   ['src', 'classes'],
//   ['src', 'modules']
// ]
```

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`prefix` | *string*[] | A string array.   |
`valueToFind` | T | The value to look for.   |
`f` | (`value`: T, `prefix`: *string*[]) => *void* | A callback function.    |

**Returns:** [*TrieMap*](triemap.md)<T\>

Defined in: index.ts:486

___

### forEach

▸ **forEach**(`prefix`: *string*[], `f`: (`value`: T, `prefix`: *string*[]) => *void*): [*TrieMap*](triemap.md)<T\>

Iterate each (value, prefix) with the given prefix.

**`example`** 
```js
const directoryFileCounts = new TrieMap()
  .set(['src', 'classes'], 2)
  .set(['src', 'modules'], 6)
  .set(['docs'], 8);

let totalFiles = 0;
directoryFileCounts.forEach([], (value, prefix) => {
  totalFiles += value;
});
// totalFiles (2 + 6 + 8) is now = 16

let totalSourceFiles = 0;
directoryFileCounts.forEach(['src'], (value, prefix) => {
  totalSourceFiles += value;
});
// totalSourceFiles (2 + 6) is now = 8
```

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`prefix` | *string*[] | A string array.   |
`f` | (`value`: T, `prefix`: *string*[]) => *void* | A callback function.    |

**Returns:** [*TrieMap*](triemap.md)<T\>

Defined in: index.ts:440

___

### get

▸ **get**(`prefix`: *string*[]): *undefined* \| T

Returns the value at a given prefix or undefined if no node is found.

**`example`** 
```js
const trie = new TrieMap();
trie.set(['some', 'path'], 4);

trie.get(['some', 'path']);
//=> 4
```

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`prefix` | *string*[] | A string array.    |

**Returns:** *undefined* \| T

Defined in: index.ts:280

___

### getNode

▸ `Protected`**getNode**(`prefix`: *string*[]): *undefined* \| *Record*<string, any\>

Returns the node at the given prefix.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`prefix` | *string*[] | A string array.    |

**Returns:** *undefined* \| *Record*<string, any\>

Defined in: index.ts:157

___

### getStrict

▸ **getStrict**(`prefix`: *string*[]): T

Returns the value at a given prefix.

**`throws`** {Error} if there is no value at the given prefix.

**`example`** 
```js
const trie = new TrieMap();

trie.get(['nonexistent', 'path']);
//=> undefined

trie.getStrict(['nonexistent', 'path']);
//=> throws Error
```

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`prefix` | *string*[] | A string array.   |

**Returns:** T

Defined in: index.ts:303

___

### has

▸ **has**(`prefix`: *string*[]): *boolean*

Returns whether a value exists at the given prefix.

**`example`** 
```js
const trie = new TrieMap();

trie.has(['some', 'path']);
//=> false

trie.set(['some', 'path'], 'value');

trie.has(['some', 'path']);
//=> true
```

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`prefix` | *string*[] | A string array.    |

**Returns:** *boolean*

Defined in: index.ts:327

___

### keys

▸ **keys**(`prefix?`: *string*[]): *Iterable*<string[]\>

Returns an Iterable that yields each prefix in the TrieMap with the given prefix.

**`example`** 
```js
const trie = new TrieMap()
  .set(['src', 'classes'], 2)
  .set(['src', 'modules'], 2)
  .set(['docs'], 8);

[...trie.keys()];
//=> [
//   ['src', 'classes'],
//   ['src', 'modules'],
//   ['docs']
// ]
```

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`prefix` | *string*[] | A string array.    |

**Returns:** *Iterable*<string[]\>

Defined in: index.ts:519

___

### load

▸ **load**(`iterable`: *Iterable*<[*string*[], T]\>): [*TrieMap*](triemap.md)<T\>

Insert multiple entries into the TrieMap.

**`example`** 
```js
const trie = new Trie().load([
  [['some', 'path'], 'value1'],
  [['other', 'path'], 'value2']
]);
```

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`iterable` | *Iterable*<[*string*[], T]\> | An array or other iterable that yields entries.   |

**Returns:** [*TrieMap*](triemap.md)<T\>

this/self (chainable)

Defined in: index.ts:131

___

### nodeDeleteValue

▸ `Protected`**nodeDeleteValue**(`node`: *Record*<string, any\>): *boolean*

Deletes the value at the given node.

#### Parameters:

Name | Type |
:------ | :------ |
`node` | *Record*<string, any\> |

**Returns:** *boolean*

Defined in: index.ts:203

___

### nodeGetValue

▸ `Protected`**nodeGetValue**(`node`: *Record*<string, any\>): *undefined* \| T

Gets the value at the given node.

#### Parameters:

Name | Type |
:------ | :------ |
`node` | *Record*<string, any\> |

**Returns:** *undefined* \| T

Defined in: index.ts:194

___

### nodeHasValue

▸ `Protected`**nodeHasValue**(`node`: *Record*<string, any\>): *boolean*

Returns whether a node has a value.

#### Parameters:

Name | Type |
:------ | :------ |
`node` | *Record*<string, any\> |

**Returns:** *boolean*

Defined in: index.ts:212

___

### nodeSetValue

▸ `Protected`**nodeSetValue**(`node`: *Record*<string, any\>, `value`: T): *void*

Assigns a value to the given node.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`node` | *Record*<string, any\> | - |
`value` | T | The value.    |

**Returns:** *void*

Defined in: index.ts:175

___

### nodeUpdateValue

▸ `Protected`**nodeUpdateValue**(`node`: *Record*<string, any\>, `f`: (`value`: T) => T): *void*

Updates a value at the given node.

#### Parameters:

Name | Type |
:------ | :------ |
`node` | *Record*<string, any\> |
`f` | (`value`: T) => T |

**Returns:** *void*

Defined in: index.ts:185

___

### set

▸ **set**(`prefix`: *string*[], `value`: T): [*TrieMap*](triemap.md)<T\>

Insert a value into the TrieMap.

**`example`** 
```js
const trie = new TrieMap()
  .set(['some', 'path'], 'value1');
  .set(['other', 'path'], 'value2');
```

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`prefix` | *string*[] | A string array.   |
`value` | T | The value to insert.   |

**Returns:** [*TrieMap*](triemap.md)<T\>

this/self (chainable)

Defined in: index.ts:230

___

### setNode

▸ `Protected`**setNode**(`prefix`: *string*[]): *Record*<string, any\>

Creates and sets an empty node at the given prefix.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`prefix` | *string*[] | A string array.    |

**Returns:** *Record*<string, any\>

Defined in: index.ts:143

___

### toArray

▸ **toArray**(`prefix?`: *string*[]): [*string*[], T][]

Returns an Iterable that yields each entry ([prefix, value]) in the TrieMap with the given prefix.

**`example`** 
```js
const trie = new TrieMap()
  .set(['src', 'classes'], 2)
  .set(['src', 'modules'], 2)
  .set(['docs'], 8);

trie.toArray();
//=> [
//   [['src', 'classes'], 2],
//   [['src', 'modules'], 2],
//   [['docs', 8]]
// ]
```

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`prefix` | *string*[] | A string array.    |

**Returns:** [*string*[], T][]

Defined in: index.ts:623

___

### toJson

▸ **toJson**(`pretty?`: *boolean*): *string*

Returns the trie map data structure as pretty printed JSON.

**`example`** 
```js
const trie = new TrieMap()
  .set(['src', 'classes'], 2)
  .set(['src', 'modules'], 2)
  .set(['docs'], 8);

trie.toJson();
//=> "{root:{src:{classes:2,modules:2,},docs:8,}}"

trie.toJson(true);
//=> {
//   root: {
//     src: {
//       classes: 2,
//       modules: 2,
//     },
//     docs: 8,
//   },
// }
```

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`pretty` | *boolean* | false | Whether to return a pretty formatted JSON string rather than a condensed machine readble string.    |

**Returns:** *string*

Defined in: index.ts:654

___

### update

▸ **update**(`prefix`: *string*[], `f`: (`value`: T) => T): [*TrieMap*](triemap.md)<T\>

Updates a value in the TrieMap.

**`example`** 
```js
const trie = new TrieMap();
trie.set(['some', 'path'], 4);

trie.get(['some', 'path']);
//=> 4

trie.update(['some', 'path'], (value) => {
  return value + 2
});

trie.get(['some', 'path']);
//=> 6
```

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`prefix` | *string*[] | A string array.   |
`f` | (`value`: T) => T | A function that when passed the current value, will return another replacement value.   |

**Returns:** [*TrieMap*](triemap.md)<T\>

this/self (chainable)

Defined in: index.ts:258

___

### values

▸ **values**(`prefix?`: *string*[]): *Iterable*<T\>

Returns an Iterable that yields each value in the TrieMap with the given prefix.

**`example`** 
```js
const trie = new TrieMap()
  .set(['src', 'classes'], 2)
  .set(['src', 'modules'], 2)
  .set(['docs'], 8);

[...trie.values()];
//=> [2, 2, 8]
```

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`prefix` | *string*[] | A string array.    |

**Returns:** *Iterable*<T\>

Defined in: index.ts:543

___

### fromIterable

▸ `Static`**fromIterable**<T\>(`iterable`: *Iterable*<[*string*[], T]\>): [*TrieMap*](triemap.md)<T\>

Creates a new instance from existing data.

**`example`** 
```js
const trie = Trie.fromIterable([
  [['some', 'path'], 'value1'],
  [['other', 'path'], 'value2']
]);
```

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`iterable` | *Iterable*<[*string*[], T]\> | An interable that yields entries.    |

**Returns:** [*TrieMap*](triemap.md)<T\>

Defined in: index.ts:40

___

### fromJSON

▸ `Static`**fromJSON**<T\>(`json`: *string*): [*TrieMap*](triemap.md)<T\>

Creates a new instance from existing data.

**`example`** 
```js
const json = new TrieMap()
  .set(['some', 'path'], 'value')
  .toJson();

const trie = Trie.fromJSON(json);
```

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`json` | *string* | A JSON-string (a previously strinfified TrieMap instance).    |

**Returns:** [*TrieMap*](triemap.md)<T\>

Defined in: index.ts:23