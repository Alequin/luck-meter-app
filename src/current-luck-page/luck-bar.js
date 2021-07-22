import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, View } from "react-native";
import { luckSegmentColours } from "./luck-segment-colours";
import { LUCK_SEGMENT_COUNT } from "./luck-segment-count";

const TEMPLATE_ARRAY = new Array(LUCK_SEGMENT_COUNT).fill(null);

export const LuckBar = ({ luckScore }) => {
  return (
    <View
      style={{
        width: "90%",
        height: 50,
        flexDirection: "row",
      }}
    >
      {TEMPLATE_ARRAY.map((_, index) => {
        const colour = useMemo(() => luckSegmentColours[index], [index]);
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
  const backgroundAnimation = useRef(new Animated.Value(colour)).current;
  const backgroundOpacity = useRef(
    new Animated.Value(segmentOpacity(isActive, isPreActive))
  ).current;

  useEffect(() => {
    Animated.timing(backgroundAnimation, {
      toValue: colour,
      duration: 1000,
    }).start();
  }, [colour]);

  useEffect(() => {
    Animated.timing(backgroundOpacity, {
      toValue: segmentOpacity(isActive, isPreActive),
      duration: 1000,
    }).start();
  }, [isActive, isPreActive]);

  return (
    <Animated.View
      style={{
        height: "100%",
        flex: 1,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        backgroundColor: backgroundAnimation,
        opacity: backgroundOpacity,
      }}
    />
  );
};

const segmentOpacity = (isActive, isPreActive) => {
  if (isActive) return 1;
  if (isPreActive) return 0.5;
  return 0.2;
};
