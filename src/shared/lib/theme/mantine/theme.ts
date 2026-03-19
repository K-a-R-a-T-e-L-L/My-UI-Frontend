import { createTheme, type MantineColorsTuple } from "@mantine/core";

export const brandPrimary: MantineColorsTuple = [
  "#f4e6ff",
  "#e8ccff",
  "#d199ff",
  "#bb66ff",
  "#a640ff",
  "#8900ff",
  "#7d30bf",
  "#5900a6",
  "#4a0088",
  "#3a006b",
];

export const brandSecondaryA: MantineColorsTuple = [
  "#ffe6f7",
  "#ffccf0",
  "#ff99e1",
  "#ff73d8",
  "#ff40ca",
  "#ff00b9",
  "#bf3098",
  "#a60078",
  "#85005f",
  "#650047",
];

export const brandSecondaryB: MantineColorsTuple = [
  "#ebe8ff",
  "#d6d1ff",
  "#ada3ff",
  "#8673ff",
  "#5a40ff",
  "#2300ff",
  "#4430bf",
  "#1700a6",
  "#120084",
  "#0e0066",
];

export const dark: MantineColorsTuple = [
  "#c9c2db",
  "#a79fc0",
  "#847ca6",
  "#655d8e",
  "#4a446f",
  "#332d55",
  "#1f1a36",
  "#140f26",
  "#0d091a",
  "#05030d",
];

export const themeMantine = createTheme({
  primaryColor: "brandPrimary",
  primaryShade: { light: 5, dark: 4 },
  black: "#05030d",
  white: "#ffffff",
  colors: {
    dark,
    brandPrimary,
    brandSecondaryA,
    brandSecondaryB,
  },
  defaultRadius: "md",
  focusRing: "auto",
  fontFamily:
    "var(--font-inter, Inter), system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
  },
  lineHeights: {
    xs: "1.35",
    sm: "1.45",
    md: "1.6",
    lg: "1.6",
    xl: "1.5",
  },
  headings: {
    fontFamily:
      "var(--font-manrope, Manrope), system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    fontWeight: "700",
    sizes: {
      h1: { fontSize: "2.25rem", lineHeight: "1.1", fontWeight: "700" },
      h2: { fontSize: "1.875rem", lineHeight: "1.15", fontWeight: "700" },
      h3: { fontSize: "1.5rem", lineHeight: "1.2", fontWeight: "700" },
      h4: { fontSize: "1.25rem", lineHeight: "1.25", fontWeight: "600" },
      h5: { fontSize: "1.125rem", lineHeight: "1.3", fontWeight: "600" },
      h6: { fontSize: "1rem", lineHeight: "1.35", fontWeight: "600" },
    },
  },
});
