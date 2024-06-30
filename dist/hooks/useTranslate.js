import { __awaiter, __generator } from "tslib";
import { useState, useEffect } from "react";
import { useLanguage } from "../LanguageContext";
/**
 * Hook for translating text based on the selected language.
 * @param {string} text The text to translate.
 * @param {{ [key: string]: string }[]} translations (Optional)
 *  Custom translations for the current language.
 * @returns {string} The translated text.
 */
export var useTranslate = function (text, translations) {
    if (translations === void 0) { translations = []; }
    var _a = useLanguage(), selectedLanguage = _a.selectedLanguage, developmentLanguage = _a.developmentLanguage, jsonFiles = _a.jsonFiles, useGoogleTranslate = _a.useGoogleTranslate;
    var getTranslationFromProps = function () {
        var translationObject = translations.find(function (t) { return t[selectedLanguage.code]; });
        return translationObject ? translationObject[selectedLanguage.code] : text;
    };
    var _b = useState(getTranslationFromProps), translatedText = _b[0], setTranslatedText = _b[1];
    useEffect(function () {
        var translateText = function () { return __awaiter(void 0, void 0, void 0, function () {
            var translationObject, jsonPath, response, json, error_1, storageKey, storedText, response, json, translatedText_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (selectedLanguage.code === (developmentLanguage === null || developmentLanguage === void 0 ? void 0 : developmentLanguage.code)) {
                            setTranslatedText(text);
                            return [2 /*return*/];
                        }
                        translationObject = translations.find(function (t) { return t[selectedLanguage.code]; });
                        if (translationObject) {
                            setTranslatedText(translationObject[selectedLanguage.code]);
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
                        storageKey = "".concat(selectedLanguage.code, "-").concat(text);
                        storedText = localStorage.getItem(storageKey);
                        if (storedText) {
                            setTranslatedText(storedText);
                            return [2 /*return*/];
                        }
                        if (!useGoogleTranslate) return [3 /*break*/, 11];
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
                        error_2 = _a.sent();
                        console.error("Google Translate fallback failed:", error_2);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        }); };
        translateText();
    }, [text, selectedLanguage, translations, developmentLanguage]);
    return translatedText;
};
//# sourceMappingURL=useTranslate.js.map