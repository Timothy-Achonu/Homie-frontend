import { clsx, type ClassValue } from "clsx"


import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge<"custom-typography", never>({
    extend: {
        theme: {
            text: ["display-xs", "display-sm", "display-md", "display-lg", "display-xl", "display-2xl"],
        },
        classGroups: {
            // Add custom typography classes as a separate group
            // This ensures they don't conflict with other text utilities
            "custom-typography": [
                "text-xs-fluid",
                "text-sm-fluid",
                "text-md-fluid",
                "text-lg-fluid",
                "text-xl-fluid",
                "text-display-xs-fluid",
                "text-display-sm-fluid", 
                "text-display-md-fluid",
                "text-display-lg-fluid",
                "text-display-xl-fluid",
                "text-display-2xl-fluid",
            ],
        },
        conflictingClassGroups: {
            // Custom typography classes don't conflict with text color classes
            // They can coexist
        },
    },
});


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
