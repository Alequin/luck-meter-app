jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("../src/current-luck-page/utils/initial-luck-score", () => ({
  initialLuckScore: jest.fn(),
}));
jest.mock("expo-constants", () => ({
  sessionId: "current-session-id",
}));

import React from "react";
import { App } from "../App";
import { asyncRender } from "../src/test-utils";
import { initialLuckScore } from "../src/current-luck-page/utils/initial-luck-score";
import { MAX_LUCK_SCORE } from "../src/current-luck-page/max-luck-score";
import * as asyncStorage from "../src/async-storage";

describe("App", () => {
  let storedSetIntervalDefinition = global.setInterval;
  beforeAll(() => {
    global.setInterval = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    global.setInterval = storedSetIntervalDefinition;
  });

  it("Displays the text 'Super Lucky' when the luck score greater than 80%", async () => {
    initialLuckScore.mockReturnValue(MAX_LUCK_SCORE * 0.81);

    const screen = await asyncRender(<App />);

    expect(screen.getByText("Super Lucky"));
  });

  it("Displays the text 'Very Lucky' when the luck score greater than 60% but less than 80%", async () => {
    initialLuckScore.mockReturnValue(MAX_LUCK_SCORE * 0.61);

    const screen = await asyncRender(<App />);

    expect(screen.getByText("Very Lucky"));
  });

  it("Displays the text 'A Little Lucky' when the luck score greater than 40% but less than 60%", async () => {
    initialLuckScore.mockReturnValue(MAX_LUCK_SCORE * 0.41);

    const screen = await asyncRender(<App />);

    expect(screen.getByText("A Little Lucky"));
  });

  it("Displays the text 'Unlucky' when the luck score greater than 20% but less than 40%", async () => {
    initialLuckScore.mockReturnValue(MAX_LUCK_SCORE * 0.21);

    const screen = await asyncRender(<App />);

    expect(screen.getByText("Unlucky"));
  });

  it("Displays the text 'Very Unlucky' when the luck score greater than 0% but less than 20%", async () => {
    initialLuckScore.mockReturnValue(0);

    const screen = await asyncRender(<App />);

    expect(screen.getByText("Very Unlucky"));
  });

  describe("Lights up the expected number of segments", () => {
    it.each(new Array(MAX_LUCK_SCORE).fill(null).map((_, index) => index + 1))(
      "When the luck score is %s",
      async (count) => {
        initialLuckScore.mockReturnValue(count);

        const screen = await asyncRender(<App />);

        expect(screen.queryAllByTestId("active-luck-segment")).toHaveLength(
          count
        );
      }
    );
  });

  describe("Partially lights up one segment when the luck score is below the max", () => {
    it.each(new Array(MAX_LUCK_SCORE).fill(null).map((_, index) => index))(
      "When the luck score is %s",
      async (count) => {
        initialLuckScore.mockReturnValue(count);

        const screen = await asyncRender(<App />);

        expect(screen.getByTestId("preactive-luck-segment")).toBeTruthy();
      }
    );
  });

  it("Uses the saved luck score if one is available and the apps session has not changed", async () => {
    jest
      .spyOn(asyncStorage.luckScore, "read")
      .mockResolvedValue(MAX_LUCK_SCORE);
    jest
      .spyOn(asyncStorage.sessionId, "read")
      .mockResolvedValue("current-session-id");

    const screen = await asyncRender(<App />);

    expect(screen.getByText("Super Lucky"));
  });

  it("Does not use the saved luck score if one is available but the apps session has changed", async () => {
    initialLuckScore.mockReturnValue(0);
    jest
      .spyOn(asyncStorage.luckScore, "read")
      .mockResolvedValue(MAX_LUCK_SCORE);
    jest
      .spyOn(asyncStorage.sessionId, "read")
      .mockResolvedValue("old-session-id");

    const screen = await asyncRender(<App />);

    expect(screen.getByText("Very Unlucky"));
  });
});
