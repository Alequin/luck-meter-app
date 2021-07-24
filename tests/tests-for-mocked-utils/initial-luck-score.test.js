import { MAX_LUCK_SCORE } from "../../src/max-luck-score";
import { initialLuckScore } from "../../src/utils/initial-luck-score";
import { times } from "lodash";

describe("Initial Luck Score", () => {
  it("Returns a number between 60% & 80% of the max luck score", () => {
    times(100_000, () => {
      const scoreToTest = initialLuckScore();
      expect(scoreToTest).toBeLessThan(MAX_LUCK_SCORE * 0.81);
      expect(scoreToTest).toBeGreaterThan(MAX_LUCK_SCORE * 0.59);
    });
  });
});
