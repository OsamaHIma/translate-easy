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
}

interface LanguageContextValue {
  selectedLanguage: Language;
  handleChangeLanguage: (languageCode: string) => void;
  languages: Language[];
  defaultLanguage: Language;
}

interface LanguageProviderProps {
  children: React.ReactNode;
  languages?: Language[];
  defaultLanguage: Language;
}

export const LanguageContext = createContext<LanguageContextValue>({
  selectedLanguage: { code: "", name: "" },
  handleChangeLanguage: () => {},
  languages: [{ code: "", name: "" }],
  defaultLanguage: { code: "", name: "" },
});

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguage must be used within a LanguageProvider component"
    );
  }
  return context;
};

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

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  languages = defaultLanguages,
  defaultLanguage = { code: "en", name: "English" },
}) => {
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

    // const userLanguage =
    //   typeof navigator !== "undefined" && navigator.language.split("-")[0];

    // const detectedLanguage = languages.find(
    //   (language) => language.code === userLanguage
    // );

    // return detectedLanguage || defaultLanguage;
    return defaultLanguage;
  });

  const handleChangeLanguage = (languageCode: string) => {
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
  }, [selectedLanguage]);

  useEffect(() => {
    document.documentElement.dir =
      selectedLanguage.code === "ar" ? "rtl" : "ltr";
  }, [selectedLanguage]);

  const value = useMemo(() => {
    return {
      selectedLanguage,
      handleChangeLanguage,
      languages,
      defaultLanguage,
    };
  }, [selectedLanguage, handleChangeLanguage, languages, defaultLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
