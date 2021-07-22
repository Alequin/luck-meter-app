export const startColour = {
  red: 255,
  green: 0,
  blue: 0,
};

export const endColour = {
  red: 0,
  green: 255,
  blue: 0,
};

export const colourObjectToString = (colour) =>
  `rgb(${colour.red}, ${colour.green}, ${colour.blue})`;
