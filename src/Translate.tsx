import * as React from "react";
import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

interface TranslateProps {
  children: string;
  translations?: { [key: string]: string };
}

export const Translate = ({ children, translations = {} }: TranslateProps) => {
  const { selectedLanguage, defaultLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState("");

  useEffect(() => {
    const translateText = async () => {
      const storageKey = `translatedText_${selectedLanguage.code}_${children}`;

      const storedText = localStorage.getItem(storageKey);

      if (storedText) {
        setTranslatedText(storedText);
        return;
      }

      if (selectedLanguage.code === defaultLanguage.code) {
        setTranslatedText(children);
        return;
      }
      if (translations[selectedLanguage.code]) {
        setTranslatedText(translations[selectedLanguage.code]);
        return;
      }

      // ChatGPT translation disabled cause there is no api key at the moment

      // try {
      //   // Translate using ChatGPT
      //   const translation = await translateWithChatGPT(children, selectedLanguage.code);
      //   setTranslatedText(translation);
      //   console.log("translation done by chatgpt")
      //   localStorage.setItem(storageKey, translation);
      // } catch (error) {
      //   console.error("ChatGPT translation failed:", error);

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
      // }
    };

    translateText();
  }, [children, selectedLanguage, translations]);

  // Helper function to translate using ChatGPT

  // const translateWithChatGPT = async (text: string, targetLanguage: string) => {
  //   try {
  //     // Make an API call to ChatGPT for translation
  //     const response = await fetch(
  //       "https://api.openai.com/v1/engines/davinci-codex/completions",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  //         },
  //         body: JSON.stringify({
  //           prompt: `Translate the following text to ${targetLanguage}: "${text}"`,
  //           max_tokens: 100,
  //           temperature: 0.5,
  //           top_p: 1.0,
  //           n: 1,
  //           stop: "\n",
  //         }),
  //       }
  //     );

  //     const data = await response.json();
  //     const translation = data.choices[0].text.trim();
  //     return translation;
  //   } catch (error) {
  //     console.warn("ChatGPT translation failed");
  //   }
  // };

  return <>{translatedText.toString() || children}</>;
};
