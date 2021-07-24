import { useEffect, useState } from "react";
import * as asyncStorage from "./async-storage";
import { useIsNewSession } from "./use-is-new-session";
import { MAX_LUCK_SCORE } from "./max-luck-score";
import { initialLuckScore } from "./utils/initial-luck-score";
import { luckModifier } from "./utils/luck-modifier";

export const useLuckScore = () => {
  const { isNewSession, hasLoadedSession } = useIsNewSession();
  const [luckScore, setLuckScore] = useState(null);

  useEffect(() => {
    let hasUnmounted = false;
    if (hasLoadedSession) {
      asyncStorage.luckScore.read().then((recordLuckScore) => {
        if (!hasUnmounted)
          setLuckScore(isNewSession ? initialLuckScore() : recordLuckScore);
      });
    }

    return () => (hasUnmounted = true);
  }, [isNewSession, hasLoadedSession]);

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
