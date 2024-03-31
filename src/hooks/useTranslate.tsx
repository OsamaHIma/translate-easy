import { useState, useEffect } from "react";
import { useLanguage } from "../LanguageContext";

/**
 * Hook for translating text based on the selected language.
 * @param {string} text The text to translate.
 * @param {{ [key: string]: string }} translations (Optional)
 *  Custom translations for the current language.
 * @returns {string} The translated text.
 */
export const useTranslate = (
  text: string,
  translations: { [key: string]: string } = {}
) => {
  const {
    selectedLanguage,
    developmentLanguage,
    jsonFiles,
    useGoogleTranslate,
  } = useLanguage();

  const [translatedText, setTranslatedText] = useState(
    translations[selectedLanguage.code] || text
  );

  useEffect(() => {
    const translateText = async () => {
      if (selectedLanguage.code === developmentLanguage?.code) {
        setTranslatedText(text);
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

      const storageKey = `${selectedLanguage.code}-${text}`;
      const storedText = localStorage.getItem(storageKey);
      if (storedText) {
        setTranslatedText(storedText);
        return;
      }

      if (useGoogleTranslate) {
        try {
          const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${selectedLanguage.code}&dt=t&q=${text}`
          );
          const json = await response.json();
          const translatedText = json[0][0][0];
          setTranslatedText(translatedText);
          localStorage.setItem(storageKey, translatedText);
        } catch (error) {
          console.error("Google Translate fallback failed:", error);
        }
      }
    };

    translateText();
  }, [text, selectedLanguage, translations, developmentLanguage]);

  return translatedText;
};
