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


export const useTranslate = (): ((text: string, translations?: { [key: string]: string }) => string) => {
  const { selectedLanguage, developmentLanguage, jsonFiles, useGoogleTranslate } =
    useLanguage();

  return (
    text: string,
    translations: { [key: string]: string } = {}
  ): string => {
    if (selectedLanguage.code === developmentLanguage?.code) {
      return text;
    }

    if (translations[selectedLanguage.code]) {
      return translations[selectedLanguage.code];
    }

    const storageKey = `${selectedLanguage.code}-${text}`;
    const storedText = localStorage.getItem(storageKey);

    if (storedText) {
      return storedText;
    }

    const translateText = async (): Promise<string> => {
      try {
        if (jsonFiles) {
          const jsonPath = jsonFiles[selectedLanguage.code];
          if (jsonPath) {
            const response = await fetch(jsonPath);
            if (response.ok) {
              const json = await response.json();
              if (json[text]) {
                localStorage.setItem(storageKey, json[text]);
                return json[text];
              }
            }
          }
        }

        if (useGoogleTranslate === true) {
          const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${selectedLanguage.code}&dt=t&q=${text}`
          );
          const json = await response.json();
          const translatedText = json[0][0][0];
          localStorage.setItem(storageKey, translatedText);
          return translatedText;
        }
      } catch (error) {
        console.error("Translation error:", error);
      }
      return text;
    };

    translateText();

    return text;
  };
};
