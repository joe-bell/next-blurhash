import type { IGetPlaiceholderOptions } from "./plaiceholder";

export const defaults: IGetPlaiceholderOptions = {
  dir: "./public",
  size: 4,
  format: ["png"],
  brightness: 1,
  saturation: 1.2,
  removeAlpha: true,
  autoOrient: false,
};
