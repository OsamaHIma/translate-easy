import { __awaiter, __generator } from "tslib";
import * as React from "react";
import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
export var Translate = function (_a) {
    var children = _a.children, _b = _a.translations, translations = _b === void 0 ? {} : _b;
    var _c = useLanguage(), selectedLanguage = _c.selectedLanguage, defaultLanguage = _c.defaultLanguage;
    var _d = useState(""), translatedText = _d[0], setTranslatedText = _d[1];
    useEffect(function () {
        var translateText = function () { return __awaiter(void 0, void 0, void 0, function () {
            var storageKey, storedText, response, json, translatedText_1, fallbackError_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storageKey = "translatedText_".concat(selectedLanguage.code, "_").concat(children);
                        storedText = localStorage.getItem(storageKey);
                        if (storedText) {
                            setTranslatedText(storedText);
                            return [2 /*return*/];
                        }
                        if (selectedLanguage.code === defaultLanguage.code) {
                            setTranslatedText(children);
                            return [2 /*return*/];
                        }
                        if (translations[selectedLanguage.code]) {
                            setTranslatedText(translations[selectedLanguage.code]);
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=".concat(selectedLanguage.code, "&dt=t&q=").concat(children))];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        json = _a.sent();
                        translatedText_1 = json[0][0][0];
                        setTranslatedText(translatedText_1);
                        localStorage.setItem(storageKey, translatedText_1);
                        return [3 /*break*/, 5];
                    case 4:
                        fallbackError_1 = _a.sent();
                        console.error("Google Translate fallback failed:", fallbackError_1);
                        setTranslatedText(children);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
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
    return React.createElement(React.Fragment, null, translatedText.toString() || children);
};
//# sourceMappingURL=Translate.js.map