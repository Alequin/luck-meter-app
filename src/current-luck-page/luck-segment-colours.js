import { last } from "lodash";
import { colourObjectToString, endColour, startColour } from "./colour-objects";
import { LUCK_SEGMENT_COUNT } from "./luck-segment-count";

const getLuckSegmentColours = () => {
  const redIncrement = colourIncrementValue("red");
  const greenIncrement = colourIncrementValue("green");
  const blueIncrement = colourIncrementValue("blue");

  return new Array(LUCK_SEGMENT_COUNT).fill(null).reduce((colours) => {
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
  (endColour[colourName] - startColour[colourName]) / LUCK_SEGMENT_COUNT;

export const luckSegmentColours =
  getLuckSegmentColours().map(colourObjectToString);
