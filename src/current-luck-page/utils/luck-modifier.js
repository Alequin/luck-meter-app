export const luckModifier = (scorePercentage) => {
  return scorePercentage < 0.2 ? modifier(0.55) : modifier(0.5);
};

const modifier = (probabilityOfIncreasing) => {
  return Math.random() <= probabilityOfIncreasing ? 1 : -1;
};
