import { last } from "lodash";
import { colourObjectToString, endColour, startColour } from "./colour-objects";
import { MAX_LUCK_SCORE } from "../max-luck-score";

const getLuckSegmentColours = () => {
  const redIncrement = colourIncrementValue("red");
  const greenIncrement = colourIncrementValue("green");
  const blueIncrement = colourIncrementValue("blue");

  return new Array(MAX_LUCK_SCORE).fill(null).reduce((colours) => {
    const previousColour = last(colours);
    if (!previousColour) return [startColour];

    return [
      ...colours,
      {
        red: previousColour.red + redIncrement,
        green: previousColour.green + greenIncrement,
        blue: previousColour.blue + blueIncrement,
      },
    ];
  }, []);
};

const colourIncrementValue = (colourName) =>
  (endColour[colourName] - startColour[colourName]) / MAX_LUCK_SCORE;

export const luckSegmentColours =
  getLuckSegmentColours().map(colourObjectToString);
