"use client";

import {
  getCountries,
  getCountryCallingCode,
  Country,
} from "react-phone-number-input/input";
import flags from "react-phone-number-input/flags";
import countryNames from "react-phone-number-input/locale/en.json";
import { ReactNode, useMemo, useState } from "react";

type CountryCallCode = ReturnType<typeof getCountryCallingCode>;

export type CountryType = {
  countryName: string;
  countryCode: Country;
  countryCallCode: CountryCallCode;
  flag: ReactNode | undefined;
};

export const useGetCountries = () => {
  const [searchCountry, setSearchCountry] = useState("");

  const countriesInfo = useMemo(() => {
    return getCountries()
      .map((country) => {
        return {
          countryName: countryNames[country],
          countryCode: country,
          countryCallCode: getCountryCallingCode(country),
          flag: flags[country]?.({ title: countryNames[country] }),
        };
      })
      .filter((country) =>
        country.countryName.toLowerCase().includes(searchCountry.toLowerCase())
      );
  }, [searchCountry]);

  function sortCountriesByName(countries: CountryType[]): CountryType[] {
    // Sort the array by the 'countryName' property
    return countries.sort((a, b) => {
      return a.countryName.localeCompare(b.countryName);
    });
  }
  const sortedCountries = useMemo(
    () => sortCountriesByName(countriesInfo),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchCountry]
  );
  return {
    countries: countriesInfo,
    sortedCountries,
    updateSearchCountry: setSearchCountry,
  };
};
