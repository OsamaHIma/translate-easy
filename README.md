# 🌍 Translate-easy

Translate-easy is an easy-to-use NPM package that allows you to integrate Google's Translation API into your web applications.

## Usage

translate-easy provides three main components: LanguageProvider, LanguageSelector, and Translate.

### LanguageProvider 🌐

The LanguageProvider component is a context provider that allows you to manage the user's selected language. You should wrap your application (or a section of your application) with the LanguageProvider to make the language context available to all child components.

``` jsx
import { LanguageProvider } from 'translate-easy';

function App() {
  return (
    <LanguageProvider>
      {/* Your app content */}
    </LanguageProvider>
  );
}
```

you can pass your languages to LanguageProvider and overwrite the default languages.
You can pass a defaultLanguage prop if the default language (the languge you used while developing the website ) is not English.

```jsx
import { LanguageProvider } from 'translate-easy';

function App() {
  return (
    <LanguageProvider
        languages={[
        { code: "ar", name: "Arabic" },
        { code: "en", name: "English" },
        ]}
    >
      {/* Your app content */}
    </LanguageProvider>
  );
}
```

#### Default languages

``` jsx
languages = [
    { code: "ar", name: "Arabic" },
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "es", name: "Spanish" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh-CN", name: "Chinese Simplified" },
    { code: "zh-TW", name: "Chinese Traditional" },
  ]
```

## LanguageSelector 🌎

The LanguageSelector component is a dropdown menu that allows the user to select their preferred language. It automatically updates the language context when the user selects a language.

``` jsx
import { LanguageSelector } from 'translate-easy';

function MyComponent() {
  return (
    <LanguageSelector />
  );
}
```

You can customize the appearance of the LanguageSelector using various props, such as buttonBgColor, dropdownTextColor, etc. See the component code for a full list of props.
Or you can leave it as it is with the default styles if you are using taillwindcss or import styles.css form the dist folder.

## Translate 📝

The Translate component is a simple component that translates a given string to the user's selected language. It uses the Google Translation API to perform the translation.
The translations will be cached so offline translations work and the api won't be called again.

``` jsx
import { Translate } from 'translate-easy';

function MyComponent() {
  return (
    <h1><Translate>مرحبا</Translate></h1>
  );
}
```

But Google Traslate is not accurate right?,

## That's why the Translate component accepts a translations prop to overwrite the translation from the API if needed.

```jsx
import { Translate } from 'translate-easy';

function MyComponent() {
  return (
    <h1><Translate translations={{ en: 'Hello', es: 'Hola' }}>مرحبا</Translate></h1>
  );
}
```
