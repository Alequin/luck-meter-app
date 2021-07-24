import { render, waitFor } from "@testing-library/react-native";

export const asyncRender = async (component) =>
  waitFor(() => render(component));
