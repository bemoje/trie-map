export declare type obj = Record<string, any>;
/**
 * Class for a fast trie map.
 */
export declare class TrieMap<T> {
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
    static fromJSON<T>(json: string): TrieMap<T>;
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
    static fromIterable<T>(iterable: Iterable<[string[], T]>): TrieMap<T>;
    /**
     * The TrieMap data structure root.
     */
    root: obj;
    /**
     * Creates a new TrieMap instance.
     *
     * @example
     * ```js
     * const trie = new TrieMap();
     * ```
     */
    constructor();
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
    get count(): number;
    /**
     * Ensures a string key of a string[] prefix is valid.
     *
     * @throws {Error} if illegal character encountered in prefix.
     */
    protected ensureValidKey(key: string): void;
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
    clear(): TrieMap<T>;
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
    load(iterable: Iterable<[string[], T]>): TrieMap<T>;
    /**
     * Creates and sets an empty node at the given prefix.
     *
     * @param prefix - A string array.
     */
    protected setNode(prefix: string[]): obj;
    /**
     * Returns the node at the given prefix.
     *
     * @param prefix - A string array.
     */
    protected getNode(prefix: string[]): obj | undefined;
    /**
     * Assigns a value to the given node.
     *
     * @param prefix - A string array.
     * @param value - The value.
     */
    protected nodeSetValue(node: obj, value: T): void;
    /**
     * Updates a value at the given node.
     *
     * @param prefix - A string array.
     * @param value - The value.
     */
    protected nodeUpdateValue(node: obj, f: (value: T) => T): void;
    /**
     * Gets the value at the given node.
     *
     * @param prefix - A string array.
     */
    protected nodeGetValue(node: obj): T | undefined;
    /**
     * Deletes the value at the given node.
     *
     * @param prefix - A string array.
     */
    protected nodeDeleteValue(node: obj): boolean;
    /**
     * Returns whether a node has a value.
     *
     * @param prefix - A string array.
     */
    protected nodeHasValue(node: obj): boolean;
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
    set(prefix: string[], value: T): TrieMap<T>;
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
    update(prefix: string[], f: (value: T) => T): TrieMap<T>;
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
    get(prefix: string[]): T | undefined;
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
    getStrict(prefix: string[]): T;
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
    has(prefix: string[]): boolean;
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
    delete(prefix: string[]): boolean;
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
    deleteStrict(prefix: string[]): void;
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
    forEach(prefix: string[], f: (value: T, prefix: string[]) => void): TrieMap<T>;
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
    find(prefix: string[], valueToFind: T, f: (value: T, prefix: string[]) => void): TrieMap<T>;
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
    keys(prefix?: string[]): Iterable<string[]>;
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
    values(prefix?: string[]): Iterable<T>;
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
    entries(prefix?: string[]): Iterable<[string[], T]>;
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
    [Symbol.iterator](prefix?: string[]): Iterable<[string[], T]>;
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
    toArray(prefix?: string[]): Array<[string[], T]>;
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
    toJson(pretty?: boolean): string;
}
export default TrieMap;
//# sourceMappingURL=index.d.ts.map