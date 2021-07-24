import { last } from "lodash";
import React from "react";
import { Text, View } from "react-native";
import { LuckBar } from "./luck-bar";
import { luckDescription } from "./utils/luck-description";
import { luckSegmentColours } from "./utils/luck-segment-colours";

export const CurrentLuckPage = ({ luckScore }) => {
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
      <Text
        style={{
          color: "white",
          fontSize: 26,
          marginVertical: 20,
          textAlign: "center",
        }}
      >
        How lucky are you right now?
      </Text>
      <Text
        style={{
          color: luckSegmentColours[luckScore] || last(luckSegmentColours),
          fontWeight: "bold",
          fontSize: 22,
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
