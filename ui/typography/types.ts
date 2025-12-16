import React from "react";

export const variantMapping = {
  "text-xs": "p",
  "text-sm": "p",
  "text-md": "p",
  "text-lg": "p",
  "text-xl": "p",
  "display-xs": "p",
  "display-sm": "p",
  "display-md": "p",
  "display-lg": "p",
  "display-xl": "p",
  "display-2xl": "p",
};

export type TypographyVariant = keyof typeof variantMapping;

export type TypographyColors =
  | "white"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warn"
  | "gray-1"
  | "gray-600"
  | "gray-500"
  | "gray-700"
  | "tertiary-600";

export type TypographyAlign =
  | "start"
  | "end"
  | "left"
  | "right"
  | "center"
  | "justify";

export type TypographyFontWeight =
  | "thin"
  | "extra-light"
  | "light"
  | "regular"
  | "medium"
  | "semi-bold"
  | "bold"
  | "extra-bold"
  | "black";

export type TypographyFont = "inter" | "agile";

type IntrinsicElementProps = {
  [K in keyof React.JSX.IntrinsicElements]: React.JSX.IntrinsicElements[K];
}[keyof React.JSX.IntrinsicElements];

export interface TypographyProps
  extends Omit<IntrinsicElementProps, "color" | "tag"> {
  tag?: keyof React.JSX.IntrinsicElements;
  variant?: TypographyVariant;
  color?: TypographyColors;
  fontWeight?: TypographyFontWeight;
  gutterBottom?: boolean;
  align?: TypographyAlign;
  noWrap?: boolean;
  underline?: "none" | "always" | "hover";
  className?: string;
  children?: React.ReactNode;
  font?: TypographyFont;
}
