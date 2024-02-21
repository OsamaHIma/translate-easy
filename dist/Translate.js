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
    var children = _a.children, _b = _a.translations, translations = _b === void 0 ? {} : _b, _c = _a.saveToLocalStorage, saveToLocalStorage = _c === void 0 ? true : _c;
    var _d = useLanguage(), selectedLanguage = _d.selectedLanguage, defaultLanguage = _d.defaultLanguage, jsonFiles = _d.jsonFiles;
    var _e = useState(""), translatedText = _e[0], setTranslatedText = _e[1];
    useEffect(function () {
        var translateText = function () { return __awaiter(void 0, void 0, void 0, function () {
            var storageKey, storedText, jsonPath, response, json, updatedResponse, error_1, response, json, translatedText_1, fallbackError_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storageKey = "".concat(children);
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
                        if (!jsonFiles) return [3 /*break*/, 8];
                        jsonPath = jsonFiles[selectedLanguage.code];
                        if (!jsonPath) return [3 /*break*/, 8];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, fetch(jsonPath)];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 6];
                        return [4 /*yield*/, response.json()];
                    case 3:
                        json = _a.sent();
                        if (!json[children]) return [3 /*break*/, 4];
                        setTranslatedText(json[children]);
                        localStorage.setItem(storageKey, json[children]);
                        return [2 /*return*/];
                    case 4:
                        // If translation not found, create a new entry in the JSON file
                        json[children] = children;
                        return [4 /*yield*/, fetch(jsonPath, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(json)
                            })];
                    case 5:
                        updatedResponse = _a.sent();
                        if (updatedResponse.ok) {
                            setTranslatedText(children);
                            localStorage.setItem(storageKey, children);
                            return [2 /*return*/];
                        }
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        console.error("Error loading translation JSON file:", error_1);
                        return [3 /*break*/, 8];
                    case 8:
                        _a.trys.push([8, 11, , 12]);
                        return [4 /*yield*/, fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=".concat(selectedLanguage.code, "&dt=t&q=").concat(children))];
                    case 9:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 10:
                        json = _a.sent();
                        translatedText_1 = json[0][0][0];
                        setTranslatedText(translatedText_1);
                        localStorage.setItem(storageKey, translatedText_1);
                        return [3 /*break*/, 12];
                    case 11:
                        fallbackError_1 = _a.sent();
                        console.error("Google Translate fallback failed:", fallbackError_1);
                        setTranslatedText(children);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
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
    return React.createElement(React.Fragment, null, translatedText.toString() || children || '');
};
//# sourceMappingURL=Translate.js.map