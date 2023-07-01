"use client";
import * as React from "react";
import { createContext, useContext, useMemo, useState, useEffect } from "react";

interface LanguageContextValue {
  selectedLanguage: string;
  handleLanguageChange: (language: string) => void;
  languages: { code: string; name: string }[];
  defaultLanguage?: string;
}

interface LanguageProviderProps {
  children: React.ReactNode;
  languages?: { code: string; name: string }[];
  defaultLanguage?: string;
}

export const LanguageContext = createContext<LanguageContextValue>({
  selectedLanguage: "",
  handleLanguageChange: () => {},
  languages: [{ code: "", name: "" }],
  defaultLanguage: "",
});

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({
  children,
  languages = [
    { code: "ar", name: "Arabic" },
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "es", name: "Spanish" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh-CN", name: "Chinese Simplified" },
    { code: "zh-TW", name: "Chinese Traditional" },
  ],
  defaultLanguage = "en",
}: LanguageProviderProps) => {
  const userLanguage =
    typeof navigator !== "undefined" && navigator.language.split("-")[0];
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    (typeof window !== "undefined" &&
      window.localStorage.getItem("selectedLanguage")) ||
      userLanguage ||
      ""
  );

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    typeof window !== "undefined" &&
      window.localStorage.setItem("selectedLanguage", language);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && selectedLanguage) {
      window.localStorage.setItem("selectedLanguage", selectedLanguage);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    document.documentElement.dir = selectedLanguage === "ar" ? "rtl" : "ltr";
  }, [selectedLanguage]);

  const value = useMemo(() => {
    return {
      selectedLanguage,
      handleLanguageChange,
      languages,
      defaultLanguage,
    };
  }, [selectedLanguage, handleLanguageChange, defaultLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
