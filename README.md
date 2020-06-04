# to-csv

convert arrays of nonuniform json objects to csvs.

```
type JSON = string | number | null | undefined | Record<string, JSON>

declare function toCsv(jsons: Array<JSON>): string
```

- it is ok if not every object has the same structure. all found keys will be included in the output.

- in the case of a nested object, keys will be joined with " - ". For example, {a: {b: 5}} will produce the csv `a - b\n5`.

- use the second optional `keys` parameter to specify a subset of keys you are interested in.
