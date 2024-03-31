# Translate Easy

Translate Easy simplifies the process of translating text within React applications by providing a flexible set of components and hooks.

## Installation

You can install Translate Easy via npm or yarn:

```bash
npm install translate-easy
```

or

```bash
yarn add translate-easy
```

## Usage

### Translate Component

The `Translate` component translates text based on the selected language.

```jsx
import { Translate } from 'translate-easy';

// Basic usage
<Translate>Hello, world!</Translate>

// Usage with specific translations
<Translate translations={{ 'ar': 'مرحبا بالعالم', 'fr': 'Bonjour le monde!' }}>Hello, world!</Translate>
```

### useTranslate Hook

The `useTranslate` hook is used to translate text dynamically within components.

```jsx
import React from 'react';
import { useTranslate as t } from 'translate-easy';

const MyComponent = () => {
  return (
    <input placeholder={t("Enter your name", { ar: "ادخل اسمك" })} />
  );
};

export default MyComponent;
```

#### Parameters

- `text`: string - The text to translate.
- `translations`: { [key: string]: string } (Optional) - Custom translations for the current language.

#### Returns

string: The translated text.

### Default Values

- `text`: The original text if no translation is available.
- `translations`: An empty object if no custom translations are provided.
- `selectedLanguage`: English (`code: "en", name: "English"`)
- `developmentLanguage`: English (`code: "en", name: "English"`)
- `languages`: Array of default languages:
  ```javascript
  [
    { code: "ar", name: "العربية", isRtl: true },
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "de", name: "Deutsch" },
    { code: "hi", name: "हिन्दी" },
    { code: "it", name: "Italiano" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "zh-CN", name: "中文（简体）" },
    { code: "zh-TW", name: "中文（繁體）" },
  ]
  ```
- `userSelectedLanguage`: English (`code: "en", name: "English"`)
- `jsonFiles`: `undefined`
- `useGoogleTranslate`: `true`

### LanguageProvider Component

The `LanguageProvider` component manages language settings and provides language context to child components.

#### Props

- `children`: ReactNode - The children components.
- `languages`: Language[] (Optional) - An array of available languages.
- `useGoogleTranslate`: boolean (Optional) - Whether to use Google Translate for translation. Default is `true`.
- `userSelectedLanguage`: Language (Optional) - The language selected by the user during runtime. Default is English (`{ code: "en", name: "English" }`).
- `developmentLanguage`: Language (Optional) - The language used during development. Default is English (`{ code: "en", name: "English" }`).
- `jsonFiles`: { [key: string]: string } (Optional) - Bath to the JSON files for translations.

#### Example

```jsx
import React from 'react';
import { LanguageProvider } from 'translate-easy';

const App = () => {
  return (
    <LanguageProvider>
      {/* Your app components */}
    </LanguageProvider>
  );
};

export default App;
```

## API Reference

### useTranslate

Hook for translating text based on the selected language.

#### Parameters

- `text`: string - The text to translate.
- `translations`: { [key: string]: string } (Optional) - Custom translations for the current language.

#### Returns

string: The translated text.

### Translate Component

Component for translating text based on the selected language.

#### Props

- `children`: string - The text to be translated.
- `translations`: { [key: string]: string } (Optional) - Optional translations for specific languages.

## Contribution

Contributions are welcome! To contribute to Translate Easy, follow these steps:

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/MyFeature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/MyFeature`.
5. Submit a pull request.
