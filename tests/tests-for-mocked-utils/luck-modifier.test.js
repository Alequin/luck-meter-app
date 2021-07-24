import { luckModifier } from "../../src/current-luck-page/utils/luck-modifier";

describe("Luck Modifier", () => {
  beforeEach(() => jest.clearAllMocks());

  it("Returns a modifier of 1 when the given percentage is greater than 20% and 'Math.random' returns a value less than or equal to 0.5", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.5);
    expect(luckModifier(0.2)).toBe(1);

    jest.spyOn(Math, "random").mockReturnValue(0);
    expect(luckModifier(0.2)).toBe(1);
  });

  it("Returns a modifier of -1 when the given percentage is greater than 20% and 'Math.random' returns a value greater than  0.5", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.51);
    expect(luckModifier(0.2)).toBe(-1);

    jest.spyOn(Math, "random").mockReturnValue(1);
    expect(luckModifier(0.2)).toBe(-1);
  });

  it("Returns a modifier of 1 when the given percentage is less than than 20% and 'Math.random' returns a value less than or equal to 0.55", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.55);
    expect(luckModifier(0.19)).toBe(1);

    jest.spyOn(Math, "random").mockReturnValue(0);
    expect(luckModifier(0.19)).toBe(1);
  });

  it("Returns a modifier of -1 when the given percentage is less than than 20% and 'Math.random' returns a value greater than to 0.55", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.56);
    expect(luckModifier(0.19)).toBe(-1);

    jest.spyOn(Math, "random").mockReturnValue(1);
    expect(luckModifier(0.19)).toBe(-1);
  });
});
