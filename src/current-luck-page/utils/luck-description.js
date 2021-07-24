import { MAX_LUCK_SCORE } from "../../max-luck-score";

export const luckDescription = (luckScore) => {
  const scorePercentage = luckScore / MAX_LUCK_SCORE;
  if (scorePercentage > 0.8) return "Super Lucky";
  if (scorePercentage > 0.6) return "Very Lucky";
  if (scorePercentage > 0.4) return "A Little Lucky";
  if (scorePercentage > 0.2) return "Unlucky";
  return "Very Unlucky";
};
