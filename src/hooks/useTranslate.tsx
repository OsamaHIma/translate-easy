import { useState, useEffect } from "react";
import { useLanguage } from "../LanguageContext";

/**
 * Hook for translating text based on the selected language.
 * @returns {(text: string, translations?: { [key: string]: string }) => string} The translation function.
 */

/**
 * Example of usage:
 * 
 * ```
 * import useTranslate from "./useTranslate";
 * 
 * const MyComponent = () => {
 *   const translate = useTranslate();
 * 
 *   return <p>{translate("Enter your name", { ar: "ادخل اسمك" })}</p>;
 * };
 * 
 * export default MyComponent;
 * ```
 * 
 * @returns {string} The translated text.
 */


export const useTranslate = (): ((
  text: string,
  translations?: { [key: string]: string }
) => string) => {
  const { selectedLanguage, defaultLanguage, jsonFiles, useGoogleTranslate } =
    useLanguage();

  return (
    text: string,
    translations: { [key: string]: string } = {}
  ): string => {
    const [translatedText, setTranslatedText] = useState<string>("");

    useEffect(() => {
      const translateText = async () => {
        try {
          if (selectedLanguage.code === defaultLanguage?.code) {
            setTranslatedText(text);
            return;
          }

          if (translations[selectedLanguage.code]) {
            setTranslatedText(translations[selectedLanguage.code]);
            return;
          }

          const storageKey = `${selectedLanguage.code}-${text}`;
          const storedText = localStorage.getItem(storageKey);

          if (storedText) {
            setTranslatedText(storedText);
            return;
          }

          if (jsonFiles) {
            const jsonPath = jsonFiles[selectedLanguage.code];
            if (jsonPath) {
              try {
                const response = await fetch(jsonPath);
                if (response.ok) {
                  const json = await response.json();
                  if (json[text]) {
                    setTranslatedText(json[text]);
                    return;
                  }
                }
              } catch (error) {
                console.error("Error loading translation JSON file:", error);
              }
            }
          }

          if (useGoogleTranslate === true) {
            try {
              const response = await fetch(
                `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${selectedLanguage.code}&dt=t&q=${text}`
              );
              const json = await response.json();
              const translatedText = json[0][0][0];
              setTranslatedText(translatedText);
              localStorage.setItem(storageKey, translatedText);
            } catch (fallbackError) {
              console.error("Google Translate fallback failed:", fallbackError);
              setTranslatedText(text);
            }
          }
        } catch (error) {
          console.error("Translation error:", error);
          setTranslatedText(text);
        }
      };

      translateText();
    }, [text, selectedLanguage, translations, defaultLanguage]);

    return translatedText.toString() || text || "";
  };
};
