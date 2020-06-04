const { toCsv } = require("./to-csv");

const input = [
  { a: 1, b: `"oh wow", he said`, 3: null, nested: { a1: "steak sauce" } },
  { a: "snack", b: "bees", 4: null, nested: { a1: "rib sauce" } },
  { a: 1, b: "bees", 3: null, tested: { a2: "steak sauce" } },
  { 3: "three", 4: "four" },
];

const output = `
3, 4, a, b, nested - a1, tested - a2
, , 1, "\\"oh wow\\", he said", "steak sauce", 
, , "snack", "bees", "rib sauce", 
, , 1, "bees", , "steak sauce"
"three", "four", , , , 
`;

const outputWithTwoKeys = `
3, a
, 1
, "snack"
, 1
"three",
`;

test("regular", () => {
  expect(normalizeLines(toCsv(input))).toEqual(normalizeLines(output));
});

test("given keys", () => {
  expect(normalizeLines(toCsv(input, ["3", "a"]))).toEqual(
    normalizeLines(outputWithTwoKeys)
  );
});

function normalizeLines(csv) {
  return csv
    .trim()
    .split("\n")
    .map((l) => l.trim());
}
