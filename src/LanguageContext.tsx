"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

interface Language {
  code: string;
  name: string;
  isRtl?: boolean;
}

/**
 * Default array of languages.
 * @type {Language[]}
 */
const defaultLanguages: Language[] = [
  { code: "ar", name: "العربية", isRtl: true },
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "de", name: "Deutsch" },
  { code: "hi", name: "हिन्दी" },
  { code: "it", name: "Italiano" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "zh-CN", name: "中文（简体）" },
  { code: "zh-TW", name: "中文（繁體）" },
];

interface LanguageContextValue {
  selectedLanguage: Language;
  handleChangeLanguage: (languageCode: string) => void;
  languages?: Language[];
  userSelectedLanguage?: Language;
  developmentLanguage?: Language;
  jsonFiles?: { [key: string]: string };
  useGoogleTranslate?: boolean;
}

interface LanguageProviderProps {
  children: React.ReactNode;
  languages?: Language[];
  useGoogleTranslate?: boolean;
  userSelectedLanguage?: Language;
  developmentLanguage?: Language;
  jsonFiles?: { [key: string]: string };
}

/**
 * Represents the value of the LanguageContext.
 * @typedef {Object} LanguageContextValue
 * @property {Language} selectedLanguage - The selected language.
 * @property {(languageCode: string) => void} handleChangeLanguage - A function to change the selected language.
 * @property {Language[]} languages - An array of available languages.
 * @property {Language} userSelectedLanguage - The language selected by the user during runtime.
 * @property {Language} developmentLanguage - The language used during development.
 */

/**
 * Represents the properties of the LanguageProvider component.
 * @typedef {Object} LanguageProviderProps
 * @property {ReactNode} children - The children components.
 * @property {Language[]} [languages] - An optional array of available languages.
 * @property {Language} userSelectedLanguage - The language selected by the user during runtime.
 * @property {Language} developmentLanguage - The language used during development.
 */

/**
 * The context for managing language settings.
 * @type {React.Context<LanguageContextValue>}
 */
export const LanguageContext: React.Context<LanguageContextValue> =
  createContext<LanguageContextValue>({
    selectedLanguage: { code: "", name: "" },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    handleChangeLanguage: () => {},
    languages: [{ code: "", name: "" }],
    userSelectedLanguage: { code: "", name: "" },
    developmentLanguage: { code: "", name: "" },
  });

/**
 * Custom hook to access the language context.
 * @returns {LanguageContextValue} The language context value.
 */
export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguage must be used within a LanguageProvider component"
    );
  }
  return context;
};

/**
 * The provider component for managing language settings.
 * @param {LanguageProviderProps} props - The component props.
 * @returns {JSX.Element} The JSX element.
 */
export const LanguageProvider = ({
  children,
  languages = defaultLanguages,
  userSelectedLanguage = { code: "en", name: "English" },
  developmentLanguage = { code: "en", name: "English" }, // Default to English for development
  jsonFiles,
  useGoogleTranslate = true,
}: LanguageProviderProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(() => {
    const storedLanguageCode =
      typeof window !== "undefined" &&
      window.localStorage.getItem("selectedLanguage");

    if (storedLanguageCode) {
      const storedLanguage = languages.find(
        (language) => language.code === storedLanguageCode
      );
      if (storedLanguage) {
        return storedLanguage;
      }
    }

    return userSelectedLanguage || developmentLanguage;
  });

  /**
   * Function to change the selected language.
   * @param {string} languageCode - The code of the language to set.
   * @returns {void}
   */
  const handleChangeLanguage = (languageCode: string): void => {
    const selectedLanguage = languages.find(
      (language) => language.code === languageCode
    );
    if (selectedLanguage) {
      setSelectedLanguage(selectedLanguage);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && selectedLanguage.code) {
      window.localStorage.setItem("selectedLanguage", selectedLanguage.code);
    }

    if (selectedLanguage.isRtl === true) {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
  }, [selectedLanguage]);

  const value = useMemo(() => {
    return {
      selectedLanguage,
      handleChangeLanguage,
      languages,
      userSelectedLanguage,
      developmentLanguage,
      jsonFiles,
      useGoogleTranslate,
    };
  }, [
    selectedLanguage,
    handleChangeLanguage,
    languages,
    userSelectedLanguage,
    developmentLanguage,
    jsonFiles,
    useGoogleTranslate,
  ]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
