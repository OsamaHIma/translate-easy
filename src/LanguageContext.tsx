'use client';
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
  { code: "ar", name: "العربية" },
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
  defaultLanguage?: Language;
  jsonFiles?: { [key: string]: string };
  useGoogleTranslate?: boolean;
}

interface LanguageProviderProps {
  children: React.ReactNode;
  languages?: Language[];
  useGoogleTranslate?: boolean;
  defaultLanguage?: Language;
  jsonFiles?: { [key: string]: string };
}

/**
 * Represents a language with a code and name.
 * @typedef {Object} Language
 * @property {string} code - The language code.
 * @property {string} name - The language name.
 */

/**
 * Represents the value of the LanguageContext.
 * @typedef {Object} LanguageContextValue
 * @property {Language} selectedLanguage - The selected language.
 * @property {(languageCode: string) => void} handleChangeLanguage - A function to change the selected language.
 * @property {Language[]} languages - An array of available languages.
 * @property {Language} defaultLanguage - The default language.
 */

/**
 * Represents the properties of the LanguageProvider component.
 * @typedef {Object} LanguageProviderProps
 * @property {ReactNode} children - The children components.
 * @property {Language[]} [languages] - An optional array of available languages.
 * @property {Language} defaultLanguage - The default language.
 */

/**
 * The context for managing language settings.
 * @type {React.Context<LanguageContextValue>}
 */
export const LanguageContext: React.Context<LanguageContextValue> = createContext<LanguageContextValue>({
  selectedLanguage: { code: "", name: "" },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleChangeLanguage: () => {},
  languages: [{ code: "", name: "" }],
  defaultLanguage: { code: "", name: "" },
})

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
 * @example
 * // Example 1: Basic usage with default settings
 * <LanguageProvider defaultLanguage={{ code: "en", name: "English" }}>
 *   <App />
 * </LanguageProvider>
 *
 * // Example 2: Providing custom languages and default language
 * const customLanguages = [
 *   { code: "es", name: "Español" },
 *   { code: "fr", name: "Français" },
 *   { code: "de", name: "Deutsch" },
 * ];
 * <LanguageProvider languages={customLanguages} defaultLanguage={{ code: "es", name: "Español" }}>
 *   <App />
 * </LanguageProvider>
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  languages = defaultLanguages,
  defaultLanguage = { code: "en", name: "English" },
  jsonFiles,
  useGoogleTranslate = true
}: LanguageProviderProps): JSX.Element => {
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

    return defaultLanguage;
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

    if (selectedLanguage.isRtl === true||selectedLanguage.code === 'ar') {
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
      defaultLanguage,
      jsonFiles,
      useGoogleTranslate
    };
  }, [selectedLanguage, handleChangeLanguage, languages, defaultLanguage, jsonFiles,useGoogleTranslate]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
