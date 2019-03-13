import { language } from "../../settings";

import englishLang from "../../image/flag/uk.svg";
import chineseLang from "../../image/flag/china.svg";
import frenchLang from "../../image/flag/france.svg";

const config = {
  defaultLanguage: language,
  options: [
    {
      languageId: "english",
      locale: "en",
      text: "English",
      icon: englishLang
    },
    {
      languageId: "chinese",
      locale: "zh",
      text: "Chinese",
      icon: chineseLang
    },
    {
      languageId: "french",
      locale: "fr",
      text: "French",
      icon: frenchLang
    },
  ]
};

export function getCurrentLanguage(lang) {
  let selecetedLanguage = config.options[0];
  config.options.forEach(language => {
    if (language.languageId === lang) {
      selecetedLanguage = language;
    }
  });
  return selecetedLanguage;
}
export default config;
