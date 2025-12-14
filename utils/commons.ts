import { PaginationProps, ResProps } from "@/lib/common";
import { Updater, UseQueryResult } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { HttpStatus } from "./errors"; 
// import * as notify from './notify';
import dayjs from "dayjs"; 
// import { ChatbotReplyProps } from "@/lib/app";
import { Country } from "react-phone-number-input";
import countryNames from "react-phone-number-input/locale/en.json"; 
import { parsePhoneNumberFromString, PhoneNumber } from "libphonenumber-js";

// Extracts error message from API responses  

export const parseResMsg = (message?: string | string[]) =>
  Array.isArray(message)
    ? message?.[0]
    : typeof message === "string"
    ? message
    : "Something failed. If the issue persists please contact support.";
// Pagination range with dots
export function calPaginationRangeWithDots(c: number, m: number) {
  const current = c,
    last = m,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [];

  let l;

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}

// Util fn to get newer pagination state from previous state
export const getNextPaginationState = (
  updater: Updater<PaginationState, PaginationState>,
  oldState: PaginationState
) => {
  if (updater instanceof Function) {
    return updater(oldState);
  }

  return oldState;
};

// Util fn to generate random ID
export const generateRandomUUID = () =>
  "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      Number(c) ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))
    ).toString(16)
  );

// Util fn to camelize a space seperated string
export const camelizeString = (str: string) =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");

// Filter link from editor text
export const filterAnchorTagByInnerHref = (
  content: string,
  hrefToMatch: string
) => {
  // Regular expression to match anchor tags with specified href attribute value
  const regex = new RegExp(
    `<a\\s+(?:[^>]*?\\s+)?href=["'][^"']*${hrefToMatch}[^"']*["'][^>]*>.*?<\\/a>`,
    "g"
  );

  // Remove matching anchor tags from the HTML content
  const modifiedHtml = content.replace(regex, "");
  return modifiedHtml;
};

// Gets pagination date from react-query response
export type PaginationQueryResProps<T> = UseQueryResult<
  ResProps<{
    data: T[];
    pagination: PaginationProps;
  }>,
  unknown
>;

export const getPaginationDataFromQuery = <T>(
  query?: PaginationQueryResProps<T>
) => {
  const { isLoading, isFetching, isFetched, error, data } = query || {};

  const isLoadingData = isLoading || isFetching;
  const paginationData = query?.data?.data?.pagination;
  const totalItemsCount = Number(paginationData?.totalItem || 0);
  const pageCount = Number(paginationData?.totalPage || 0);

  const errorProps = error as typeof data;
  const fetchIsErrored = isFetched && !!errorProps;

  return {
    isLoadingData,
    totalItemsCount,
    pageCount,
    fetchIsErrored,
    errorProps,
  };
};

export const processNetworkResponse = <T>(res: ResProps<T>) => {
  if (res.statusCode !== HttpStatus.OK) {
    // notify.error({
    //   message: "Something failed",
    //   subtitle: parseResMsg(res.message),
    // });
    throw res;
  }
  return res;
};

export const getDate = (val: Date | undefined, format?: string) => {
  if (format) {
    return dayjs(val).format(format);
  }
  return dayjs(val).format("DD MMM, YYYY");
};
export const getDateTime = (
  val: Date | undefined,
  format?: string,
  isCommaSeperator?: boolean
) => {
  if (format) {
    return dayjs(val).format(format);
  }
  return `${dayjs(val).format("DD MMM, YYYY")} ${
    isCommaSeperator ? "," : "|"
  }  ${dayjs(val).format("h:mma")}`;
};

export const removeUrlPrefix = (inputString: string) => {
  // Define an array of prefixes to remove
  const prefixes = [
    "https://",
    "http://",
    "https:",
    "http:",
    "www.",
    "https://www.",
    "http://www.",
  ];

  // Iterate through the prefixes
  for (const prefix of prefixes) {
    // Check if the inputString starts with the current prefix
    if (inputString.startsWith(prefix)) {
      // Remove the prefix from the inputString
      inputString = inputString.slice(prefix.length);
      // Since we found and removed a prefix, break out of the loop
    }
  }

  // Return the modified string
  return inputString;
};

export function combineDates(
  timeDate: Date | null,
  dateOnly: Date | null
): Date | null {
  // Check if parsing was successful
  if (!timeDate || !dateOnly) {
    return null;
  }
  if (isNaN(timeDate.getTime()) || isNaN(dateOnly.getTime())) {
    return null;
  }

  // Extract individual components from each Date object
  const hours = timeDate.getHours();
  const minutes = timeDate.getMinutes();
  const seconds = timeDate.getSeconds();

  const day = dateOnly.getDate();
  const month = dateOnly.getMonth();
  const year = dateOnly.getFullYear();

  // Create a new Date object with the desired combination of components
  const combinedDate = new Date(year, month, day, hours, minutes, seconds);

  return combinedDate;
}

export function hexToRgba(hexColor: string): string {
  // Check if the input is a valid hexadecimal color
  const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  if (hexColor.length < 7) {
    hexColor = hexColor + hexColor.substring(1);
  }
  if (hexColor.length > 7) {
    hexColor = hexColor.substring(0, hexColor.length - 1);
  }

  const result = hexRegex.exec(hexColor);
  if (!result) {
    // throw new Error('Invalid hexadecimal color format');
    return "#243665";
  }

  // Extract the RGB values from the hexadecimal color
  const [, r, g, b] = result;

  // Convert hexadecimal to decimal
  const red = parseInt(r, 16);
  const green = parseInt(g, 16);
  const blue = parseInt(b, 16);

  // Construct the RGBA string with alpha value '0.05'
  const rgbaColor = `rgba(${red}, ${green}, ${blue}, 0.05)`;

  return rgbaColor;
}

export const trimNewlines = (input: string): string => {
  // Use regular expressions to remove leading and trailing newlines
  return input.replace(/^\n+|\n+$/g, "");
};

interface DelayValidationResult {
  isValid: boolean;
  message: string;
}

export const validateChatbotOtherResponseDelay = (
  delay: number
): DelayValidationResult => {
  if (typeof delay !== "number" || isNaN(delay)) {
    return {
      isValid: false,
      message: "Duration must be a valid number",
    };
  }

  if (delay < 5) {
    return {
      isValid: false,
      message: "Delay must be at least 5 seconds",
    };
  }

  if (delay > 30) {
    return {
      isValid: false,
      message: "Delay cannot be more than 30 seconds",
    };
  }

  return {
    isValid: true,
    message: "",
  };
};

// export const validateChatbotOtherResponses = (
//   replies: ChatbotReplyProps[] | null
// ): boolean => {
//   if (!replies) {
//     return true;
//   }
//   for (const replyObj of replies) {
//     if (!replyObj.reply || replyObj.delay < 5 || replyObj.delay > 35) {
//       return false;
//     }
//   }
//   return true;
// };

export const hexToARGB = (hex: string): number => {
  // Remove the leading '#' if present
  hex = hex.replace(/^#/, "");

  let a = 255, // Default alpha (fully opaque)
    r = 0,
    g = 0,
    b = 0;

  // If hex is in the format #RRGGBB (6 characters)
  if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }
  // If hex is in the format #AARRGGBB (8 characters)
  else if (hex.length === 8) {
    a = parseInt(hex.substring(0, 2), 16);
    r = parseInt(hex.substring(2, 4), 16);
    g = parseInt(hex.substring(4, 6), 16);
    b = parseInt(hex.substring(6, 8), 16);
  } else {
    throw new Error("Invalid hex color format");
  }

  // Combine ARGB values into a single 32-bit integer
  const argb = (a << 24) | (r << 16) | (g << 8) | b;

  return argb >>> 0; // Return unsigned 32-bit number
};

export const argbToHex = (argb: number): string => {
  // Extract the alpha, red, green, and blue components
  const a = (argb >> 24) & 0xff; // Extract the alpha value
  const r = (argb >> 16) & 0xff; // Extract the red value
  const g = (argb >> 8) & 0xff; // Extract the green value
  const b = argb & 0xff; // Extract the blue value

  // Convert each component to a two-character hex string
  const alpha = a.toString(16).padStart(2, "0").toUpperCase();
  const red = r.toString(16).padStart(2, "0").toUpperCase();
  const green = g.toString(16).padStart(2, "0").toUpperCase();
  const blue = b.toString(16).padStart(2, "0").toUpperCase();

  // If alpha is 255 (fully opaque), return #RRGGBB, otherwise return #AARRGGBB
  return a === 255
    ? `#${red}${green}${blue}`
    : `#${alpha}${red}${green}${blue}`;
};

export const openNewTab = (url: string): void => {
  if (typeof window !== "undefined") {
    window?.open(url, "_blank");
  }
};

export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#8BD8BD" offset="20%" />
      <stop stop-color="#B2EAD6" offset="50%" />
      <stop stop-color="#8BD8BD" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#8BD8BD" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const serlzoYoutubeChannelUrl = "https://www.youtube.com/@serlzo";
export const serlzoTelegramChannel = "https://t.me/serlzo";
export const serlzoWhatsappCommunityUrl =
  "https://chat.whatsapp.com/EOdLRBpwP7Q8r1Z4hXDuHh?mode=ac_t";

export const getCountryCodeByName = (countryName: string) => {
  const countryCode = Object.keys(countryNames).find(
    (key) =>
      countryNames[key as keyof typeof countryNames].toLowerCase().trim() ===
      countryName.toLowerCase().trim()
  ) as Country | undefined;
  return countryCode;
};

export const expectedNSNLengths: Partial<Record<Country, number[]>> = {
  US: [10], // United States: +1 10‐digit NSN (e.g. +1 2025550123)
  GB: [10], // United Kingdom: +44 10‐digit NSN (e.g. +44 7911123456)

  // === Major African countries ===
  NG: [10], // Nigeria: +234 10‐digit NSN (e.g. +234 7012345678)
  EG: [10], // Egypt: +20 10‐digit NSN (e.g. +20 1012345678)
  ZA: [9], // South Africa: +27 9‐digit NSN (e.g. +27 812345678)
  KE: [9], // Kenya: +254 9‐digit NSN (e.g. +254 712345678)
  GH: [9], // Ghana: +233 9‐digit NSN (e.g. +233 241234567)
  UG: [9], // Uganda: +256 9‐digit NSN (e.g. +256 712345678)
  TZ: [9], // Tanzania: +255 9‐digit NSN (e.g. +255 712345678)

  MA: [9], // Morocco: +212 9‐digit NSN (e.g. +212 612345678)
  SN: [9], // Senegal: +221 9‐digit NSN (e.g. +221 771234567)
  CI: [8], // Côte d’Ivoire: +225 8‐digit NSN (e.g. +225 01234567)
  CM: [8, 9], // Cameroon: +237 8‐digit NSN (e.g. +237 675123456)
  DZ: [9], // Algeria: +213 9‐digit NSN (e.g. +213 661234567)

  ET: [9], // Ethiopia: +251 9‐digit NSN (e.g. +251 911234567)
  SD: [9], // Sudan: +249 9‐digit NSN (e.g. +249 912345678)
  ZW: [9], // Zimbabwe: +263 9‐digit NSN (e.g. +263 771234567)
  ZM: [9], // Zambia: +260 9‐digit NSN (e.g. +260 971234567)
  MW: [9], // Malawi: +265 9‐digit NSN (e.g. +265 912345678)

  MZ: [9], // Mozambique: +258 9‐digit NSN (e.g. +258 821234567)
  AO: [9], // Angola: +244 9‐digit NSN (e.g. +244 923456789)
  BF: [8], // Burkina Faso: +226 8‐digit NSN (e.g. +226 70123456)
  ML: [8], // Mali: +223 8‐digit NSN (e.g. +223 70123456)

  GM: [7, 8], // The Gambia: +220 7 or 8‐digit NSN (formats vary by region)
  GW: [8], // Guinea‐Bissau: +245 8‐digit NSN
  GN: [8], // Guinea: +224 8‐digit NSN
  MR: [8], // Mauritania: +222 8‐digit NSN

  TG: [8], // Togo: +228 8‐digit NSN (e.g. +228 90123456)
  BJ: [8, 10, 9], // Benin: +229 8‐digit NSN (e.g. +229 90123456)

  // You can keep adding other country codes as needed...
};

export function validateSingleNumber(rawEntry: string): PhoneNumber | null {
  //strip out spaces/hyphens/parentheses/dots, etc.
  let entry = rawEntry.replace(/[^\d+]/g, "");

  if (!entry.startsWith("+")) {
    entry = "+" + entry;
  }

  /*It must be exactly “+” followed by digits. Anything else fails.
    ^\+\d+$ means “one + at the start, then one or more digits, and nothing else.” */
  if (!/^\+\d+$/.test(entry)) {
    return null;
  }

  const phoneNumber = parsePhoneNumberFromString(entry);

  const nationalNumber = phoneNumber?.nationalNumber; // string of digits with no country code
  const country = phoneNumber?.country; // e.g. "NG", "KE", "ZA", etc.

  if (country && Array.isArray(expectedNSNLengths[country]) && nationalNumber) {
    const allowed = expectedNSNLengths[country];

    if (allowed && !allowed.includes(nationalNumber.length)) {
      return null;
    }
  }
  /*if this (phoneNumber.isValid()) gives too much trouble I would just stop doing the isValid check
  and just make sure the number is not undefined then return phoneNumber
  */
  if (phoneNumber && phoneNumber.isValid()) {
    return phoneNumber;
  }

  return null;
}

export const stripHTML = (input: string): string => {
  // Remove all HTML tags
  const withoutTags = input.replace(/<[^>]*>/g, "");

  // Create a temporary element to decode HTML entities
  const textarea = document.createElement("textarea");
  textarea.innerHTML = withoutTags;

  return textarea.value;
};


export const  parseStatusCode =(status: number | undefined): { success: boolean }  => {
  if(!status) {
    return {success: false}
  }
  return { success: status >= 200 && status < 300 };
}



export const getNationalityAdjective = (countryName?: string): string | null => {
  if(!countryName) return null
  const mapping: Record<string, string> = {
    nigeria: "Nigerian",
    usa: "American",
    canada: "Canadian",
    germany: "German",
    france: "French",
    spain: "Spanish",
    ghana: "Ghanian",
    // add more countries here
  };

  return mapping[countryName.toLowerCase()];
};


