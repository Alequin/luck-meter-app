import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { luckModifier } from "../luck-modifier";
import { LuckBar } from "./luck-bar";
import { luckSegmentColours } from "./luck-segment-colours";
import { LUCK_SEGMENT_COUNT } from "./luck-segment-count";
import { last } from "lodash";

const MAX_OVERFLOW = 2;
const MAX_SCORE = LUCK_SEGMENT_COUNT + MAX_OVERFLOW;

export const CurrentLuckPage = () => {
  const [luckScore, setLuckScore] = useState(
    Math.round(LUCK_SEGMENT_COUNT * 0.75)
  );

  useEffect(() => {
    const interval = setInterval(
      () =>
        setLuckScore((currentLuckScore) => {
          const newScore = shouldModifyFate(currentLuckScore)
            ? currentLuckScore + 1
            : currentLuckScore + luckModifier();
          if (newScore < 0) return 0;
          if (newScore > MAX_SCORE) return MAX_SCORE;
          return newScore;
        }),
      1000
    );
    return () => clearTimeout(interval);
  }, []);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white" }}>How lucky are you right now?</Text>
      <Text
        style={{
          color: luckSegmentColours[luckScore] || last(luckSegmentColours),
          fontWeight: "bold",
        }}
      >
        {luckDescription(luckScore)}
      </Text>
      <LuckBar luckScore={luckScore} />
    </View>
  );
};

const luckDescription = (luckScore) => {
  const scorePercentage = luckScore / LUCK_SEGMENT_COUNT;
  if (scorePercentage > 0.8) return "Super Lucky";
  if (scorePercentage > 0.6) return "Very Lucky";
  if (scorePercentage > 0.4) return "A Little Lucky";
  if (scorePercentage > 0.2) return "Unlucky";
  return "Very Unlucky";
};

const shouldModifyFate = (() => {
  let count = 1;
  const maxIterationValue = 100;
  return (currentLuckScore) => {
    count++;
    if (count > maxIterationValue) count = 1;

    const percentage = currentLuckScore / LUCK_SEGMENT_COUNT;
    const iterationToModifyFateOn = Math.round(maxIterationValue * percentage);

    return count % iterationToModifyFateOn === 0;
  };
})();
