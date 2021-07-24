import { last } from "lodash";
import React, { useEffect, useMemo, useRef } from "react";
import { Animated, View } from "react-native";
import { MAX_LUCK_SCORE } from "./max-luck-score";
import { luckSegmentColours } from "./utils/luck-segment-colours";

const TEMPLATE_ARRAY = new Array(MAX_LUCK_SCORE).fill(null);

export const LuckBar = ({ luckScore }) => {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        flexDirection: "row",
      }}
    >
      {TEMPLATE_ARRAY.map((_, index) => {
        const colour = useMemo(
          () => luckSegmentColours[index] || last(luckSegmentColours),
          [index]
        );
        return (
          <LuckSegment
            key={`${index}-${JSON.stringify(colour)}`}
            colour={colour}
            isActive={luckScore > index}
            isPreActive={luckScore === index}
          />
        );
      })}
    </View>
  );
};

const LuckSegment = ({ colour, isActive, isPreActive }) => {
  const backgroundOpacity = useRef(
    new Animated.Value(segmentOpacity(isActive, isPreActive))
  ).current;

  useEffect(() => {
    Animated.timing(backgroundOpacity, {
      toValue: segmentOpacity(isActive, isPreActive),
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [isActive, isPreActive]);

  return (
    <Animated.View
      testID={luckSegmentTestId(isActive, isPreActive)}
      style={{
        height: "100%",
        flex: 1,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        backgroundColor: colour,
        opacity: backgroundOpacity,
      }}
    />
  );
};

const luckSegmentTestId = (isActive, isPreActive) => {
  if (isActive) return "active-luck-segment";
  if (isPreActive) return "preactive-luck-segment";
  return "inactive-luck-segment";
};

const segmentOpacity = (isActive, isPreActive) => {
  if (isActive) return 1;
  if (isPreActive) return 0.5;
  return 0.2;
};
