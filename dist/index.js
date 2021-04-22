/*!
 * @bemoje/trie-map v1.0.7
 * (c) Benjamin Møller Jensen
 * Homepage: https://github.com/bemoje/trie-map
 * Released under the MIT License.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const SENTINEL = String.fromCharCode(0);
/**
 * Class for a fast trie map.
 */
class TrieMap {
    /**
     * Creates a new TrieMap instance.
     *
     * @example
     * ```js
     * const trie = new TrieMap();
     * ```
     */
    constructor() {
        this.root = {};
    }
    /**
     * Creates a new instance from existing data.
     *
     * @param json - A JSON-string (a previously strinfified TrieMap instance).
     *
     * @example
     * ```js
     * const json = new TrieMap()
     *   .set(['some', 'path'], 'value')
     *   .toJson();
     *
     * const trie = Trie.fromJSON(json);
     * ```
     */
    static fromJSON(json) {
        return Object.setPrototypeOf(JSON.parse(json), this.prototype);
    }
    /**
     * Creates a new instance from existing data.
     *
     * @param iterable - An interable that yields entries.
     *
     * @example
     * ```js
     * const trie = Trie.fromIterable([
     *   [['some', 'path'], 'value1'],
     *   [['other', 'path'], 'value2']
     * ]);
     * ```
     */
    static fromIterable(iterable) {
        const instance = new this();
        instance.load(iterable);
        return instance;
    }
    /**
     * Returns the number of values in the TrieMap.
     *
     * @example
     * ```js
     * const trie = new TrieMap();
     *
     * trie.
     *   .set(['some', 'path'], 'value')
     *   .count;
     * //=> 1
     * ```
     */
    get count() {
        let c = 0;
        this.forEach([], () => {
            c++;
        });
        return c;
    }
    /**
     * Ensures a string key of a string[] prefix is valid.
     *
     * @throws {Error} if illegal character encountered in prefix.
     */
    ensureValidKey(key) {
        // TODO why is key !== '0' necessary?
        if (key === SENTINEL || key === '0') {
            throw new Error('Prefix elements cannot be === to neither ' + SENTINEL + ' || "0".');
        }
    }
    /**
     * Deletes all entries from the TrieMap
     *
     * @returns this/self (chainable)
     *
     * @example
     * ```js
     * const trie = new TrieMap();
     * trie.set(['some', 'path'], 'value');
     * trie.clear();
     * trie.count;
     * //=> 0
     * ```
     */
    clear() {
        this.root = Object.create(null);
        return this;
    }
    /**
     * Insert multiple entries into the TrieMap.
     *
     * @param iterable - An array or other iterable that yields entries.
     * @returns this/self (chainable)
     *
     * @example
     * ```js
     * const trie = new Trie().load([
     *   [['some', 'path'], 'value1'],
     *   [['other', 'path'], 'value2']
     * ]);
     * ```
     */
    load(iterable) {
        for (const [prefix, value] of iterable) {
            this.set(prefix, value);
        }
        return this;
    }
    /**
     * Creates and sets an empty node at the given prefix.
     *
     * @param prefix - A string array.
     */
    setNode(prefix) {
        let node = this.root;
        for (let i = 0; i < prefix.length; i++) {
            this.ensureValidKey(prefix[i]);
            node = node[prefix[i]] || (node[prefix[i]] = Object.create(null));
        }
        return node;
    }
    /**
     * Returns the node at the given prefix.
     *
     * @param prefix - A string array.
     */
    getNode(prefix) {
        let node = this.root;
        for (let i = 0; i < prefix.length; i++) {
            this.ensureValidKey(prefix[i]);
            node = node[prefix[i]];
            if (node === undefined) {
                return;
            }
        }
        return node;
    }
    /**
     * Assigns a value to the given node.
     *
     * @param prefix - A string array.
     * @param value - The value.
     */
    nodeSetValue(node, value) {
        node[SENTINEL] = value;
    }
    /**
     * Updates a value at the given node.
     *
     * @param prefix - A string array.
     * @param value - The value.
     */
    nodeUpdateValue(node, f) {
        node[SENTINEL] = f(node[SENTINEL]);
    }
    /**
     * Gets the value at the given node.
     *
     * @param prefix - A string array.
     */
    nodeGetValue(node) {
        return node[SENTINEL];
    }
    /**
     * Deletes the value at the given node.
     *
     * @param prefix - A string array.
     */
    nodeDeleteValue(node) {
        return Reflect.deleteProperty(node, SENTINEL);
    }
    /**
     * Returns whether a node has a value.
     *
     * @param prefix - A string array.
     */
    nodeHasValue(node) {
        return SENTINEL in node;
    }
    /**
     * Insert a value into the TrieMap.
     *
     * @param prefix - A string array.
     * @param value - The value to insert.
     * @returns this/self (chainable)
     *
     * @example
     * ```js
     * const trie = new TrieMap()
     *   .set(['some', 'path'], 'value1');
     *   .set(['other', 'path'], 'value2');
     * ```
     */
    set(prefix, value) {
        this.nodeSetValue(this.setNode(prefix), value);
        return this;
    }
    /**
     * Updates a value in the TrieMap.
     *
     * @param prefix - A string array.
     * @param f - A function that when passed the current value, will return another replacement value.
     * @returns this/self (chainable)
     *
     * @example
     * ```js
     * const trie = new TrieMap();
     * trie.set(['some', 'path'], 4);
     *
     * trie.get(['some', 'path']);
     * //=> 4
     *
     * trie.update(['some', 'path'], (value) => {
     *   return value + 2
     * });
     *
     * trie.get(['some', 'path']);
     * //=> 6
     * ```
     */
    update(prefix, f) {
        const node = this.getNode(prefix);
        if (node) {
            this.nodeUpdateValue(node, f);
        }
        return this;
    }
    /**
     * Returns the value at a given prefix or undefined if no node is found.
     *
     * @param prefix - A string array.
     *
     * @example
     * ```js
     * const trie = new TrieMap();
     * trie.set(['some', 'path'], 4);
     *
     * trie.get(['some', 'path']);
     * //=> 4
     * ```
     */
    get(prefix) {
        const node = this.getNode(prefix);
        if (!node)
            return;
        return this.nodeGetValue(node);
    }
    /**
     * Returns the value at a given prefix.
     *
     * @param prefix - A string array.
     * @throws {Error} if there is no value at the given prefix.
     *
     * @example
     * ```js
     * const trie = new TrieMap();
     *
     * trie.get(['nonexistent', 'path']);
     * //=> undefined
     *
     * trie.getStrict(['nonexistent', 'path']);
     * //=> throws Error
     * ```
     */
    getStrict(prefix) {
        const value = this.get(prefix);
        if (!value)
            throw new Error('Value not found.');
        return value;
    }
    /**
     * Returns whether a value exists at the given prefix.
     *
     * @param prefix - A string array.
     *
     * @example
     * ```js
     * const trie = new TrieMap();
     *
     * trie.has(['some', 'path']);
     * //=> false
     *
     * trie.set(['some', 'path'], 'value');
     *
     * trie.has(['some', 'path']);
     * //=> true
     * ```
     */
    has(prefix) {
        const node = this.getNode(prefix);
        return !!node && this.nodeHasValue(node);
    }
    /**
     * Deletes the value at the given prefix. Returns whether the operation was successful.
     *
     * @param prefix - A string array.
     * @param prune - Whether or not to delete all values with the given prefix.
     *
     * @example
     * ```js
     * const trie = new TrieMap();
     * trie.set(['some', 'path'], 'value');
     *
     * trie.has(['some', 'path']);
     * //=> true
     *
     * trie.delete(['some', 'path']);
     * //=> true (means operation was successful)
     *
     * trie.has(['some', 'path']);
     * //=> false
     * ```
     */
    delete(prefix) {
        let node = this.root;
        let toPrune = null;
        let pruneKey = null;
        let parent;
        for (let i = 0; i < prefix.length; i++) {
            parent = node;
            node = node[prefix[i]];
            // Prefix does not exist
            if (node === undefined) {
                return false;
            }
            // Keeping track of a potential branch to prune
            const numKeys = Object.keys(node).length;
            if (toPrune !== null) {
                if (numKeys > 1) {
                    toPrune = null;
                    pruneKey = null;
                }
            }
            else {
                if (numKeys < 2) {
                    toPrune = parent;
                    pruneKey = prefix[i];
                }
            }
        }
        if (!this.nodeHasValue(node)) {
            return false;
        }
        if (toPrune && pruneKey) {
            Reflect.deleteProperty(toPrune, pruneKey);
        }
        else {
            Reflect.deleteProperty(node, SENTINEL);
        }
        return true;
    }
    /**
     * Deletes the value at the given prefix or all values with the given prefix if ´prune´ is set to true.
     *
     * @param prefix - A string array.
     * @param prune - Whether or not to delete all values with the given prefix.
     * @throws {Error} if the operation was unsuccessful.
     *
     * @example
     * ```js
     * const trie = new TrieMap();
     *
     * trie.delete(['nonexistent', 'path']);
     * //=> false (operation unsuccessful)
     *
     * trie.deleteStrict(['nonexistent', 'path']);
     * //=> throws Error
     * ```
     */
    deleteStrict(prefix) {
        if (!this.delete(prefix)) {
            throw new Error('The node at the prefix not found: ' + prefix.join('/'));
        }
    }
    /**
     * Iterate each (value, prefix) with the given prefix.
     *
     * @param prefix - A string array.
     * @param f - A callback function.
     *
     * @example
     * ```js
     * const directoryFileCounts = new TrieMap()
     *   .set(['src', 'classes'], 2)
     *   .set(['src', 'modules'], 6)
     *   .set(['docs'], 8);
     *
     * let totalFiles = 0;
     * directoryFileCounts.forEach([], (value, prefix) => {
     *   totalFiles += value;
     * });
     * // totalFiles (2 + 6 + 8) is now = 16
     *
     * let totalSourceFiles = 0;
     * directoryFileCounts.forEach(['src'], (value, prefix) => {
     *   totalSourceFiles += value;
     * });
     * // totalSourceFiles (2 + 6) is now = 8
     * ```
     */
    forEach(prefix, f) {
        prefix = prefix.slice();
        (function recurse(node) {
            for (const key in node) {
                prefix.push(key);
                const value = node[key][SENTINEL];
                if (value !== undefined) {
                    f(value, prefix.slice());
                }
                // TODO why is key !== '0' necessary?
                if (key !== '0')
                    recurse(node[key]);
                prefix.pop();
            }
        })(this.getNode(prefix) || {});
        return this;
    }
    /**
     * Iterates all (value, prefix) where value === ´valueToFind´.
     *
     * @param prefix - A string array.
     * @param valueToFind - The value to look for.
     * @param f - A callback function.
     *
     * @example
     * ```js
     * const directoryFileCounts = new TrieMap()
     *   .set(['src', 'classes'], 2)
     *   .set(['src', 'modules'], 2)
     *   .set(['docs'], 8);
     *
     * const directoryPathsWithTwoFiles = [];
     * directoryFileCounts.find([], (value, prefix) => {
     *   if(value === 2) {
     *     directoryPathsWithTwoFiles.push(prefix);
     *   }
     * });
     * // directoryPathsWithTwoFiles will now contain: [
     * //   ['src', 'classes'],
     * //   ['src', 'modules']
     * // ]
     * ```
     */
    find(prefix, valueToFind, f) {
        this.forEach(prefix, (value, prefix) => {
            if (value === valueToFind) {
                f(valueToFind, prefix);
            }
        });
        return this;
    }
    /**
     * Returns an Iterable that yields each prefix in the TrieMap with the given prefix.
     *
     * @param prefix - A string array.
     *
     * @example
     * ```js
     * const trie = new TrieMap()
     *   .set(['src', 'classes'], 2)
     *   .set(['src', 'modules'], 2)
     *   .set(['docs'], 8);
     *
     * [...trie.keys()];
     * //=> [
     * //   ['src', 'classes'],
     * //   ['src', 'modules'],
     * //   ['docs']
     * // ]
     * ```
     */
    *keys(prefix = []) {
        const res = [];
        this.forEach(prefix, (_, prefix) => {
            return res.push(prefix);
        });
        yield* res;
    }
    /**
     * Returns an Iterable that yields each value in the TrieMap with the given prefix.
     *
     * @param prefix - A string array.
     *
     * @example
     * ```js
     * const trie = new TrieMap()
     *   .set(['src', 'classes'], 2)
     *   .set(['src', 'modules'], 2)
     *   .set(['docs'], 8);
     *
     * [...trie.values()];
     * //=> [2, 2, 8]
     * ```
     */
    *values(prefix = []) {
        const res = [];
        this.forEach(prefix, (value) => {
            return res.push(value);
        });
        yield* res;
    }
    /**
     * Returns an Iterable that yields each entry ([prefix, value]) in the TrieMap with the given prefix.
     *
     * @param prefix - A string array.
     *
     * @example
     * ```js
     * const trie = new TrieMap()
     *   .set(['src', 'classes'], 2)
     *   .set(['src', 'modules'], 2)
     *   .set(['docs'], 8);
     *
     * [...trie.entries()];
     * //=> [
     * //   [['src', 'classes'], 2],
     * //   [['src', 'modules'], 2],
     * //   [['docs', 8]]
     * // ]
     * ```
     */
    *entries(prefix = []) {
        const res = [];
        this.forEach(prefix, (value, prefix) => {
            res.push([prefix, value]);
        });
        yield* res;
    }
    /**
     * Returns an Iterable that yields each entry ([prefix, value]) in the TrieMap with the given prefix.
     *
     * @param prefix - A string array.
     *
     * @example
     * ```js
     * const trie = new TrieMap()
     *   .set(['src', 'classes'], 2)
     *   .set(['src', 'modules'], 2)
     *   .set(['docs'], 8);
     *
     * [...trie];
     * //=> [
     * //   [['src', 'classes'], 2],
     * //   [['src', 'modules'], 2],
     * //   [['docs', 8]]
     * // ]
     * ```
     */
    *[Symbol.iterator](prefix) {
        yield* this.entries(prefix);
    }
    /**
     * Returns an Iterable that yields each entry ([prefix, value]) in the TrieMap with the given prefix.
     *
     * @param prefix - A string array.
     *
     * @example
     * ```js
     * const trie = new TrieMap()
     *   .set(['src', 'classes'], 2)
     *   .set(['src', 'modules'], 2)
     *   .set(['docs'], 8);
     *
     * trie.toArray();
     * //=> [
     * //   [['src', 'classes'], 2],
     * //   [['src', 'modules'], 2],
     * //   [['docs', 8]]
     * // ]
     * ```
     */
    toArray(prefix = []) {
        return [...this.entries(prefix)];
    }
    /**
     * Returns the trie map data structure as pretty printed JSON.
     *
     * @param pretty - Whether to return a pretty formatted JSON string rather than a condensed machine readble string.
     *
     * @example
     * ```js
     * const trie = new TrieMap()
     *   .set(['src', 'classes'], 2)
     *   .set(['src', 'modules'], 2)
     *   .set(['docs'], 8);
     *
     * trie.toJson();
     * //=> "{root:{src:{classes:2,modules:2,},docs:8,}}"
     *
     * trie.toJson(true);
     * //=> {
     * //   root: {
     * //     src: {
     * //       classes: 2,
     * //       modules: 2,
     * //     },
     * //     docs: 8,
     * //   },
     * // }
     * ```
     */
    toJson(pretty = false) {
        return JSON.stringify(this, null, pretty ? 2 : void 0);
    }
}

exports.TrieMap = TrieMap;
exports.default = TrieMap;
//# sourceMappingURL=index.js.map
