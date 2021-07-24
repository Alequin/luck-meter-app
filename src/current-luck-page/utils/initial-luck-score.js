import { random } from "lodash";
import { MAX_LUCK_SCORE } from "../max-luck-score";

export const initialLuckScore = () =>
  Math.round(random(MAX_LUCK_SCORE * 0.6, MAX_LUCK_SCORE * 0.8));
