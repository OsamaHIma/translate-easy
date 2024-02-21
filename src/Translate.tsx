'use client';
import * as React from "react";
import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

interface TranslateProps {
  children: string;
  translations?: { [key: string]: string };
  saveToLocalStorage?: boolean;
}

/**
 * Props for the Translate component.
 * @typedef {Object} TranslateProps
 * @property {string} children - The text to be translated.
 * @property {{ [key: string]: string }} [translations] - Optional translations for specific languages.
 */

/**
 * Component for translating text based on the selected language.
 * @param {TranslateProps} props - The component props.
 * @returns {JSX.Element} The translated text.
 * @example
 * // Example 1: Basic usage without translations
 * <Translate>Hello, world!</Translate>
 *
 * // Example 2: Usage with specific translations
 * <Translate translations={{ 'ar': 'مرحبا بالعالم', 'fr': 'Bonjour le monde!' }}>Hello, world!</Translate>
 */

export const Translate: React.FC<TranslateProps> = ({
  children,
  translations = {},
  saveToLocalStorage = true,
}: TranslateProps): JSX.Element => {
  const { selectedLanguage, defaultLanguage,jsonFiles } = useLanguage();
  const [translatedText, setTranslatedText] = useState("");

  useEffect(() => {
    const translateText = async () => {
      const storageKey = `${children}`;

      const storedText = localStorage.getItem(storageKey);

      if (storedText && saveToLocalStorage) {
        setTranslatedText(storedText);
        return;
      }

      if (selectedLanguage.code === defaultLanguage.code) {
        setTranslatedText(children);
        return;
      }

      if (translations[selectedLanguage.code]) {
        setTranslatedText(translations[selectedLanguage.code]);
        if (saveToLocalStorage) {
          localStorage.setItem(storageKey, translations[selectedLanguage.code]);
        }
        return;
      }

       // Check if JSON file path exists for the selected language
       if(jsonFiles)
       {const jsonPath = jsonFiles[selectedLanguage.code];
       if (jsonPath) {
         try {
           const response = await fetch(jsonPath);
           if (response.ok) {
             const json = await response.json();
             if (json[children]) {
               setTranslatedText(json[children]);
               localStorage.setItem(storageKey, json[children]);
               return;
             } else {
               // If translation not found, create a new entry in the JSON file
               json[children] = children;
               const updatedResponse = await fetch(jsonPath, {
                 method: 'PUT', // or 'POST' if needed
                 headers: {
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(json),
               });
               if (updatedResponse.ok) {
                 setTranslatedText(children);
                 localStorage.setItem(storageKey, children);
                 return;
               }
             }
           }
         } catch (error) {
           console.error("Error loading translation JSON file:", error);
         }
       }}

      try {
        // Fallback to Google Translate
        const response = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${selectedLanguage.code}&dt=t&q=${children}`
        );
        const json = await response.json();
        const translatedText = json[0][0][0];
        setTranslatedText(translatedText);
        localStorage.setItem(storageKey, translatedText);
      } catch (fallbackError) {
        console.error("Google Translate fallback failed:", fallbackError);
        setTranslatedText(children);
      }
    };

    translateText();
  }, [
    children,
    selectedLanguage,
    translations,
    saveToLocalStorage,
    defaultLanguage,
  ]);

  return <>{translatedText.toString() || children || ''}</>;
};
