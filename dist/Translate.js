'use client';
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
    var children = _a.children, _b = _a.translations, translations = _b === void 0 ? {} : _b;
    var _c = useLanguage(), selectedLanguage = _c.selectedLanguage, defaultLanguage = _c.defaultLanguage, jsonFiles = _c.jsonFiles;
    var _d = useState(""), translatedText = _d[0], setTranslatedText = _d[1];
    var translateText = React.useMemo(function () { return function () { return __awaiter(void 0, void 0, void 0, function () {
        var storageKey, storedText, jsonPath, response, json, error_1, response, json, translatedText_1, fallbackError_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 11, , 12]);
                    if (selectedLanguage.code === defaultLanguage.code) {
                        setTranslatedText(children);
                        return [2 /*return*/];
                    }
                    // is it passed in the translations prop?
                    if (translations[selectedLanguage.code]) {
                        setTranslatedText(translations[selectedLanguage.code]);
                        return [2 /*return*/];
                    }
                    storageKey = "".concat(children);
                    storedText = localStorage.getItem(storageKey);
                    if (storedText) {
                        setTranslatedText(storedText);
                        return [2 /*return*/];
                    }
                    if (!jsonFiles) return [3 /*break*/, 6];
                    jsonPath = jsonFiles[selectedLanguage.code];
                    if (!jsonPath) return [3 /*break*/, 6];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetch(jsonPath)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    json = _a.sent();
                    if (json[children]) {
                        setTranslatedText(json[children]);
                        return [2 /*return*/];
                    }
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error("Error loading translation JSON file:", error_1);
                    return [3 /*break*/, 6];
                case 6:
                    _a.trys.push([6, 9, , 10]);
                    return [4 /*yield*/, fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=".concat(selectedLanguage.code, "&dt=t&q=").concat(children))];
                case 7:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 8:
                    json = _a.sent();
                    translatedText_1 = json[0][0][0];
                    setTranslatedText(translatedText_1);
                    localStorage.setItem(storageKey, translatedText_1);
                    return [3 /*break*/, 10];
                case 9:
                    fallbackError_1 = _a.sent();
                    console.error("Google Translate fallback failed:", fallbackError_1);
                    setTranslatedText(children);
                    return [3 /*break*/, 10];
                case 10: return [3 /*break*/, 12];
                case 11:
                    error_2 = _a.sent();
                    console.error("Translation error:", error_2);
                    // Handle error gracefully, e.g., fallback to original text
                    setTranslatedText(children);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    }); }; }, [children, selectedLanguage, translations, defaultLanguage]);
    useEffect(function () {
        translateText();
    }, [translateText]);
    return React.createElement(React.Fragment, null, translatedText.toString() || children || '');
};
//# sourceMappingURL=Translate.js.map