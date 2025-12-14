"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useScrollToTopOnRouteChange({
  dependencies,
}: {
  dependencies?: string[] | number[];
}) {
  const pathname = usePathname();
  const deps = dependencies || []
  useEffect(() => {
    // Scroll to top smoothly on every route or dependency change
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, ...deps]);  
} 
