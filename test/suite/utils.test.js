const assert = require("assert")
const utils = require("../../src/utils")

suite("Various utility functions", () => {

  test("csv - split values to array", () => {
    const csv = "a, b, c"
    assert.deepStrictEqual(['a', 'b', 'c'], utils.csvToArray(csv))
  })

  test("csv - values are trimmed", () => {
    const csv = "a, b    , c   "
    assert.deepStrictEqual(['a', 'b', 'c'], utils.csvToArray(csv))
  })

  test("csv - no comma yields single element array", () => {
    const csv = "something"
    assert.deepStrictEqual(['something'], utils.csvToArray(csv))
  })

})

