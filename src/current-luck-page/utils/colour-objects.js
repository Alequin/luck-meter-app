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
  `rgb(${Math.round(colour.red)}, ${Math.round(colour.green)}, ${Math.round(
    colour.blue
  )})`;
