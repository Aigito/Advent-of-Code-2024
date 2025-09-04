import { assert } from "chai";
import { validate, sort } from "../day5-part2.js";

describe("incorrect values", () => {
  it("should be corrected and passed", () => {
    // assert.equal(validate([75, 97, 47, 61, 53]), false);
    console.log(validate(sort([75, 97, 47, 61, 53])))
    assert.equal(validate(sort([75, 97, 47, 61, 53])), true);
  })
});