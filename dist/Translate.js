import { __awaiter, __generator } from "tslib";
import * as React from "react";
import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
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
export var Translate = function (_a) {
    var children = _a.children, _b = _a.translations, translations = _b === void 0 ? {} : _b, _c = _a.saveToLocalStorage, saveToLocalStorage = _c === void 0 ? true : _c;
    var _d = useLanguage(), selectedLanguage = _d.selectedLanguage, defaultLanguage = _d.defaultLanguage;
    var _e = useState(""), translatedText = _e[0], setTranslatedText = _e[1];
    useEffect(function () {
        var translateText = function () { return __awaiter(void 0, void 0, void 0, function () {
            var storageKey, storedText, response, json, translatedText_1, fallbackError_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storageKey = "translatedText_".concat(selectedLanguage.code, "_").concat(children);
                        storedText = localStorage.getItem(storageKey);
                        if (storedText && saveToLocalStorage) {
                            setTranslatedText(storedText);
                            return [2 /*return*/];
                        }
                        if (selectedLanguage.code === defaultLanguage.code) {
                            setTranslatedText(children);
                            return [2 /*return*/];
                        }
                        if (translations[selectedLanguage.code]) {
                            setTranslatedText(translations[selectedLanguage.code]);
                            if (saveToLocalStorage) {
                                localStorage.setItem(storageKey, translations[selectedLanguage.code]);
                            }
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
    }, [
        children,
        selectedLanguage,
        translations,
        saveToLocalStorage,
        defaultLanguage,
    ]);
    return React.createElement(React.Fragment, null, translatedText.toString() || children);
};
//# sourceMappingURL=Translate.js.map