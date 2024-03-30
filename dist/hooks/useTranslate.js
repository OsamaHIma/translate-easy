import { __awaiter, __generator } from "tslib";
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
export var useTranslate = function () {
    var _a = useLanguage(), selectedLanguage = _a.selectedLanguage, defaultLanguage = _a.defaultLanguage, jsonFiles = _a.jsonFiles, useGoogleTranslate = _a.useGoogleTranslate;
    return function (text, translations) {
        if (translations === void 0) { translations = {}; }
        var _a = useState(""), translatedText = _a[0], setTranslatedText = _a[1];
        useEffect(function () {
            var translateText = function () { return __awaiter(void 0, void 0, void 0, function () {
                var storageKey, storedText, jsonPath, response, json, error_1, response, json, translatedText_1, fallbackError_1, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 12, , 13]);
                            if (selectedLanguage.code === (defaultLanguage === null || defaultLanguage === void 0 ? void 0 : defaultLanguage.code)) {
                                setTranslatedText(text);
                                return [2 /*return*/];
                            }
                            if (translations[selectedLanguage.code]) {
                                setTranslatedText(translations[selectedLanguage.code]);
                                return [2 /*return*/];
                            }
                            storageKey = "".concat(selectedLanguage.code, "-").concat(text);
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
                            if (json[text]) {
                                setTranslatedText(json[text]);
                                return [2 /*return*/];
                            }
                            _a.label = 4;
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            error_1 = _a.sent();
                            console.error("Error loading translation JSON file:", error_1);
                            return [3 /*break*/, 6];
                        case 6:
                            if (!(useGoogleTranslate === true)) return [3 /*break*/, 11];
                            _a.label = 7;
                        case 7:
                            _a.trys.push([7, 10, , 11]);
                            return [4 /*yield*/, fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=".concat(selectedLanguage.code, "&dt=t&q=").concat(text))];
                        case 8:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 9:
                            json = _a.sent();
                            translatedText_1 = json[0][0][0];
                            setTranslatedText(translatedText_1);
                            localStorage.setItem(storageKey, translatedText_1);
                            return [3 /*break*/, 11];
                        case 10:
                            fallbackError_1 = _a.sent();
                            console.error("Google Translate fallback failed:", fallbackError_1);
                            setTranslatedText(text);
                            return [3 /*break*/, 11];
                        case 11: return [3 /*break*/, 13];
                        case 12:
                            error_2 = _a.sent();
                            console.error("Translation error:", error_2);
                            setTranslatedText(text);
                            return [3 /*break*/, 13];
                        case 13: return [2 /*return*/];
                    }
                });
            }); };
            translateText();
        }, [text, selectedLanguage, translations, defaultLanguage]);
        return translatedText.toString() || text || "";
    };
};
//# sourceMappingURL=useTranslate.js.map