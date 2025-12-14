"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const screens = {
  xs: "480px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

/**
 * Checks whether a particular Tailwind CSS viewport size applies.
 *
 * @param size The size to check, which must either be included in Tailwind CSS's
 * list of default screen sizes, or added to the Tailwind CSS config file.
 *
 * @returns A boolean indicating whether the viewport size applies.
 */
export const useBreakpoint = (size: keyof typeof screens) => {
  const subscribe = (callback: () => void) => {
    const media = window.matchMedia(`(min-width: ${screens[size]})`);
    media.addEventListener("change", callback);
    return () => media.removeEventListener("change", callback);
  };

  const getSnapshot = () =>
    window.matchMedia(`(min-width: ${screens[size]})`).matches;

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
