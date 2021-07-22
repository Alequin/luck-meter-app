import { random } from "lodash";

export const luckModifier = () => (isEven(random(1, 2)) ? 1 : -1);
const isEven = (number) => number % 2 === 0;
