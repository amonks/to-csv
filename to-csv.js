module.exports.toCsv = function toCsv(objs, _keys) {
  const flatObjs = objs.map(flatten());
  const keys = _keys || getKeys(flatObjs);
  const header = keys.join(`, `);
  const rows = [header];
  for (const obj of flatObjs) {
    rows.push(print(keys, obj));
  }
  return rows.join("\n");
};

function flatten(...path) {
  return (obj) => {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      const key = buildKey(...path, k);

      // null case
      if (v === null || v === undefined) {
        out[key] = "";
        continue;
      }

      // serializable case
      const typeofV = typeof v;
      if (typeofV === "string" || typeofV === "number") {
        out[key] = JSON.stringify(v);
        continue;
      }

      // object case (recur)
      // consider a trampoline or something to avoid busting stack
      Object.assign(out, flatten(...path, k)(v));
    }

    return out;
  };
}

function buildKey(...path) {
  return path.join(" - ");
}

function getKeys(objs) {
  const ks = new Set();
  for (const obj of objs) {
    for (const k of Object.keys(obj)) {
      ks.add(k);
    }
  }
  return Array.from(ks).sort();
}

function print(keys, obj) {
  const out = [];
  for (const key of keys) {
    const val = obj[key];
    out.push(val || "");
  }
  return out.join(", ");
}
