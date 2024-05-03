import { Dimensions } from "react-native";

export function hexToRgb(hex: string) {
  // Remove '#' if present
  hex = hex.replace(/^#/, "");

  // Parse hexadecimal into RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Return RGB values
  return {
    r: r,
    g: g,
    b: b,
  };
}

export function getOrientation() {
  let o: "portrait" | "landscape" = "portrait";
  const { height, width } = Dimensions.get("window");
  if (width > height) {
    o = "landscape";
  }
  return o;
}
