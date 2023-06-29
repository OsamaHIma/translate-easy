"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translate = exports.LanguageSelector = exports.LanguageProvider = exports.useLanguage = void 0;
require("./styles.css");
var LanguageContext_1 = require("./LanguageContext");
Object.defineProperty(exports, "useLanguage", { enumerable: true, get: function () { return LanguageContext_1.useLanguage; } });
Object.defineProperty(exports, "LanguageProvider", { enumerable: true, get: function () { return LanguageContext_1.LanguageProvider; } });
var LanguageSelector_1 = require("./LanguageSelector");
Object.defineProperty(exports, "LanguageSelector", { enumerable: true, get: function () { return LanguageSelector_1.LanguageSelector; } });
var Translate_1 = require("./Translate");
Object.defineProperty(exports, "Translate", { enumerable: true, get: function () { return Translate_1.Translate; } });
