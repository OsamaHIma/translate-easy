# Translate Easy

Translate Easy is a React package that provides an easy way to implement language translation and selection in your React applications. It allows you to define multiple languages and translations, and provides a context and hook for managing the selected language.

## Installation

You can install the package using npm or yarn:

```bash
npm install translate-easy
```

or

```bash
yarn add translate-easy
```

## Usage

### LanguageProvider 🌐

The LanguageProvider component is a context provider that allows you to manage the user's selected language. You should wrap your application (or a section of your application) with the LanguageProvider to make the language context available to all child components.

```jsx
import { LanguageProvider } from "translate-easy";

function App() {
  return <LanguageProvider>{/* Your app content */}</LanguageProvider>;
}
```

you can pass your languages to LanguageProvider and overwrite the default languages. You can pass a defaultLanguage prop if the default language (the language you used while developing the website ) is not English to prevent translating the original text.

```jsx
import { LanguageProvider } from "translate-easy";

function App() {
  return (
    <LanguageProvider
      languages={[
        { code: "ar", name: "Arabic" },
        { code: "en", name: "English" },
      ]}
    >
      {/_ Your app content _/}
    </LanguageProvider>
  );
}
```

Default languages

```jsx
languages = [
  { code: "ar", name: "العربية" },
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

### useLanguage Hook

To access the selected language and change the language, you can use the `useLanguage` hook provided by the package.

```jsx
import { useLanguage } from "translate-easy";

const MyComponent = () => {
  const { selectedLanguage, handleChangeLanguage, languages } = useLanguage();

  // Your component logic
};
```

The `selectedLanguage` object contains the currently selected language, `handleChangeLanguage` is a function to change the language, and `languages` is an array of available languages.

### Translate Component

To translate your strings based on the selected language, you can use the `Translate` component provided by the package.

```jsx
import { Translate } from "translate-easy";

const MyComponent = () => {
  return (
    <div>
      <Translate translations={{ ar: "مرحبا", fr: "Bonjour" }}>Hello</Translate>
    </div>
  );
};
```

The `Translate` component takes the following props:

- `translations`: an object that maps language codes to translated strings. Each language code should correspond to a translation for the string being translated.
- `children`: the string to be translated.
- `saveToLocalStorage` (boolean, optional, default: `true`): Indicates whether the translation should be saved to local storage.

### LanguageSelector

To create a basic language selector, you can use the `useLanguage` hook and the `handleChangeLanguage` function provided by the package.

```jsx
import { useLanguage } from "translate-easy";

function LanguageSelector() {
  const { selectedLanguage, handleChangeLanguage, languages } = useLanguage();

  const handleLanguageClick = (languageCode) => {
    handleChangeLanguage(languageCode);
  };

  return (
    <ul>
      {languages.map((language) => (
        <li
          key={language.code}
          onClick={() => handleLanguageClick(language.code)}
          style={{
            fontWeight:
              selectedLanguage.code === language.code ? "bold" : "normal",
          }}
        >
          {language.name}
        </li>
      ))}
    </ul>
  );
}
```

You can customize the appearance and behavior of the language selector according to your application's needs.

## Example

Here's a complete example demonstrating how to use Translate Easy in a React application:

```jsx
import React from "react";
import { LanguageProvider, Translate, useLanguage } from "translate-easy";

const App = () => {
  return (
    <LanguageProvider>
      <MyComponent />
    </LanguageProvider>
  );
};

const MyComponent = () => {
  const { selectedLanguage, handleChangeLanguage, languages } = useLanguage();

  const handleLanguageClick = (languageCode) => {
    handleChangeLanguage(languageCode);
  };

  return (
    <div>
      <LanguageSelector />

      <h1>
        <Translate translations={{ en: "Hello", fr: "Bonjour" }}>
          Hello
        </Translate>
      </h1>

      <p>
        <Translate translations={{ en: "Welcome!", fr: "Bienvenue !" }}>
          Welcome!
        </Translate>
      </p>

      <ul>
        {languages.map((language) => (
          <li
            key={language.code}
            onClick={() => handleLanguageClick(language.code)}
            style={{
              fontWeight:
                selectedLanguage.code === language.code ? "bold" : "normal",
            }}
          >
            {language.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

function LanguageSelector() {
  const { selectedLanguage, handleChangeLanguage, languages } = useLanguage();

  const handleLanguageClick = (languageCode) => {
    handleChangeLanguage(languageCode);
  };

  return (
    <ul>
      {languages.map((language) => (
        <li
          key={language.code}
          onClick={() => handleLanguageClick(language.code)}
          style={{
            fontWeight:
              selectedLanguage.code === language.code ? "bold" : "normal",
          }}
        >
          {language.name}
        </li>
      ))}
    </ul>
  );
}

export default App;
```

In this example, the `LanguageProvider` wraps the `MyComponent`, which includes the `LanguageSelector` and uses the `Translate` component to translate the strings based on the selected language.

## Conclusion

Translate Easy simplifies language translation and selection in React applications. It provides a convenient context, hook, and component for managing and using translations. You can easily integrate it into your project and customize it according to your specific requirements.

For more information and examples, you can refer to the official documentation of Translate Easy.

Contributions are welcome! If you're interested in contributing, please visit the [GitHub repository ↗](https://github.com/OsamaHIma/translate-easy/tree/master). Currently, we need someone to create an OpenAI account so we can use ChatGPT for translations primarily and Google as a fallback.
