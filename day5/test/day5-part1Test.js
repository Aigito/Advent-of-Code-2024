import { assert } from "chai";
import { validate } from "../day5-part1.js";


describe("function", () => {
  describe("should pass", () => {
    it("PASS #1", () => {
      assert.equal(validate([75, 47, 61, 53, 29]), true);
    });

    it("PASS #2", () => {
      assert.equal(validate([97, 61, 53, 29, 13]), true);
    });

    it("PASS #3", () => {
      assert.equal(validate([75, 29, 13]), true);
    });
  });

  describe("should fail", () => {
    it("FAIL #1", () => {
      assert.equal(validate([75, 97, 47, 61, 53]), false);
    });

    it("FAIL #2", () => {
      assert.equal(validate([61, 13, 29]), false);
    });

    it("FAIL #3", () => {
      assert.equal(validate([97, 13, 75, 29, 47]), false);
    });
  });
});