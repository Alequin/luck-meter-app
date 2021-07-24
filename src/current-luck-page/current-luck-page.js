import { last } from "lodash";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { LuckBar } from "./luck-bar";
import { MAX_LUCK_SCORE } from "./max-luck-score";
import { initialLuckScore } from "./utils/initial-luck-score";
import { luckDescription } from "./utils/luck-description";
import { luckModifier } from "./utils/luck-modifier";
import { luckSegmentColours } from "./utils/luck-segment-colours";

export const CurrentLuckPage = () => {
  const luckScore = useLuckScore();

  return (
    <View
      style={{
        width: "100%",
        padding: "5%",
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 18, marginVertical: 20 }}>
        How lucky are you right now?
      </Text>
      <Text
        style={{
          color: luckSegmentColours[luckScore] || last(luckSegmentColours),
          fontWeight: "bold",
          fontSize: 18,
          marginVertical: 20,
        }}
      >
        {luckDescription(luckScore)}
      </Text>
      <View
        style={{
          width: "100%",
          height: 50,
          marginVertical: 20,
        }}
      >
        <LuckBar luckScore={luckScore} />
      </View>
    </View>
  );
};

const useLuckScore = () => {
  const [luckScore, setLuckScore] = useState(initialLuckScore());

  useEffect(() => {
    const interval = setInterval(
      () =>
        setLuckScore((currentLuckScore) => {
          if (currentLuckScore === 0) return 1;
          if (currentLuckScore === MAX_LUCK_SCORE) return MAX_LUCK_SCORE - 1;

          const newScore =
            currentLuckScore + luckModifier(currentLuckScore / MAX_LUCK_SCORE);

          if (newScore < 0) return 0;
          if (newScore > MAX_LUCK_SCORE) return MAX_LUCK_SCORE;
          return newScore;
        }),
      1000
    );
    return () => clearTimeout(interval);
  }, []);

  return luckScore;
};
