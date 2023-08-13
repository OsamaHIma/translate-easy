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
            var storageKey, storedText, translation, error_1, response, json, translatedText_1, fallbackError_1;
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
                        _a.trys.push([1, 3, , 9]);
                        return [4 /*yield*/, translateWithChatGPT(children, selectedLanguage.code)];
                    case 2:
                        translation = _a.sent();
                        setTranslatedText(translation);
                        console.log("translation done by chatgpt");
                        localStorage.setItem(storageKey, translation);
                        return [3 /*break*/, 9];
                    case 3:
                        error_1 = _a.sent();
                        console.error("ChatGPT translation failed:", error_1);
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 7, , 8]);
                        return [4 /*yield*/, fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=".concat(selectedLanguage.code, "&dt=t&q=").concat(children))];
                    case 5:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 6:
                        json = _a.sent();
                        translatedText_1 = json[0][0][0];
                        setTranslatedText(translatedText_1);
                        localStorage.setItem(storageKey, translatedText_1);
                        return [3 /*break*/, 8];
                    case 7:
                        fallbackError_1 = _a.sent();
                        console.error("Google Translate fallback failed:", fallbackError_1);
                        setTranslatedText(children);
                        return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        translateText();
    }, [children, selectedLanguage, translations]);
    // Helper function to translate using ChatGPT
    var translateWithChatGPT = function (text, targetLanguage) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, translation, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer ".concat(process.env.OPENAI_API_KEY),
                            },
                            body: JSON.stringify({
                                prompt: "Translate the following text to ".concat(targetLanguage, ": \"").concat(text, "\""),
                                max_tokens: 100,
                                temperature: 0.5,
                                top_p: 1.0,
                                n: 1,
                                stop: "\n",
                            }),
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    translation = data.choices[0].text.trim();
                    return [2 /*return*/, translation];
                case 3:
                    error_2 = _a.sent();
                    console.warn("ChatGPT translation failed");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return React.createElement(React.Fragment, null, translatedText.toString() || children);
};
//# sourceMappingURL=Translate.js.map