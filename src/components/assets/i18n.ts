import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "About us": "About us",
      "description1": "We are a team of professionals specializing in creating innovative solutions for businesses and modern technologies. Our priority is to ensure high quality, efficiency, and satisfaction for our clients.",
      "description2": "Our mission is to help companies reach new heights by leveraging the power of digital tools and a creative approach. Join us on our journey to success!"
    }
  },
  uk: {
    translation: {
      "About us": "Про нас",
      "description1": "Ми — команда професіоналів, що спеціалізується на створенні інноваційних рішень для бізнесу та розвитку сучасних технологій. Наш пріоритет — забезпечення високої якості, ефективності та задоволення потреб наших клієнтів.",
      "description2": "Наша місія — допомагати компаніям досягати нових висот, використовуючи потужність цифрових інструментів і творчий підхід. Долучайтеся до нас у нашій подорожі до успіху!"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: navigator.language.startsWith("uk") ? "uk" : "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
