import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  pl: {
    translation: {
      // Hero Section
      hero: {
        title: "Bug to the Future",
        subtitle: "Czy białko przyszłości ma skrzydła?",
        description:
          "Sprawdź, co sądzisz o białku przyszłości — i czy Twoje zdanie może się zmienić.",
        cta: "Podziel się swoją opinią",
        ctaSubtext: "Pomagasz zmieniać przyszłość jedzenia.",
      },

      // Pre-Survey Section
      preSurvey: {
        intro:
          "Zanim pokażemy Ci krótki materiał o białku przyszłości, sprawdź swoje obecne zdanie.",
        progress: "{{current}} z {{total}}",
        next: "Dalej",
        back: "Wstecz",
        submit: "Zakończ ankietę",
      },

      // Questions
      questions: {
        willingness: {
          question:
            "Na ile był(a)byś skłonny/a spróbować produktu zawierającego białko z owadów?",
          scaleLabel: "Skala 1–10",
        },
        barriers: {
          question:
            "Co jest dla Ciebie największą barierą przed spróbowaniem produktów z białkiem owadzim?",
          options: {
            appearance: "Wygląd / estetyka",
            taste: "Obawy o smak",
            safety: "Bezpieczeństwo zdrowotne",
            tradition: "Tradycja kulturowa",
            price: "Cena",
            availability: "Dostępność",
            none: "Nie mam barier",
            nothingDiscourages: "Nic mnie nie zniechęca",
            other: "Inne",
          },
        },
        knowledge: {
          question:
            "Jak oceniasz swoją wiedzę na temat alternatywnych źródeł białka (np. roślinnych, owadzich, fermentacyjnych)?",
          options: {
            veryLow: "Bardzo niska",
            low: "Niska",
            medium: "Średnia",
            high: "Wysoka",
          },
        },
        euRegulation: {
          question:
            "Czy wiesz, że niektóre gatunki owadów są dopuszczone do obrotu jako żywność w UE?",
          options: {
            yes: "Tak",
            no: "Nie",
            dontKnow: "Nie wiem",
            notSure: "Nie jestem pewny/a",
          },
        },
        age: {
          question: "W jakim jesteś wieku?",
          options: {
            under18: "Poniżej 18",
            "18-24": "18-24",
            "25-29": "25-29",
            "30-35": "30-35",
            over35: "Powyżej 35",
          },
        },
        gender: {
          question: "Płeć",
          options: {
            male: "Mężczyzna",
            female: "Kobieta",
            noAnswer: "Brak odpowiedzi",
          },
        },
      },

      // Transition Section
      transition: {
        title: "Czas na kilka faktów",
        description:
          "Teraz pokażemy Ci kilka faktów o białku przyszłości. Zobacz, czy coś z tego zmieni Twoje spojrzenie.",
        cta: "Zobacz materiał",
        duration: "2 min",
      },

      // Education Section
      education: {
        title: "Białko przyszłości",
        slides: {
          intro: {
            title: "Czy wiesz, że...",
            content:
              "Do 2050 roku populacja Ziemi osiągnie 10 miliardów ludzi. Potrzebujemy nowych, zrównoważonych źródeł białka.",
          },
          efficiency: {
            title: "Efektywność produkcji",
            content:
              "Owady potrzebują 12x mniej paszy niż bydło, aby wyprodukować tę samą ilość białka. Zużywają też 2000x mniej wody.",
          },
          nutrition: {
            title: "Wartości odżywcze",
            content:
              "Mączka z owadów zawiera wszystkie niezbędne aminokwasy, jest bogata w żelazo, cynk i witaminy z grupy B.",
          },
          everyday: {
            title: "Codzienne zastosowanie",
            content:
              "Białko owadzie jest przetwarzane na mączkę, która staje się niewidocznym składnikiem batonów proteinowych, makaronów czy wypieków.",
          },
          global: {
            title: "Globalna perspektywa",
            content:
              "Ponad 2 miliardy ludzi na świecie regularnie spożywa owady. W Europie to nowy trend, ale dla wielu kultur — codzienna praktyka.",
          },
        },
        next: "Dalej",
        finish: "Zakończ",
      },

      // Post-Survey Section
      postSurvey: {
        title: "A teraz sprawdźmy, czy coś się zmieniło.",
        intro: "Odpowiedz na kilka pytań po obejrzeniu materiału.",
      },

      // Post Questions
      postQuestions: {
        attitudeChange: {
          question:
            "Czy po obejrzeniu materiału Twoje nastawienie do białka pochodzenia owadziego się zmieniło?",
          options: {
            morePositive: "Tak, na bardziej pozytywne",
            ratherPositive: "Raczej na bardziej pozytywne",
            noChange: "Bez zmian",
            ratherNegative: "Raczej na bardziej negatywne",
            moreNegative: "Na bardziej negatywne",
          },
        },
        willingnessPost: {
          question:
            "Na ile był(a)byś skłonny/a spróbować produktu zawierającego białko z owadów?",
          scaleLabel: "Skala 1–10",
        },
        barriersPost: {
          question: "Co najbardziej Cię teraz zniechęca?",
          options: {
            appearance: "Wygląd / estetyka",
            taste: "Obawy o smak",
            safety: "Bezpieczeństwo zdrowotne",
            tradition: "Tradycja kulturowa",
            price: "Cena",
            availability: "Dostępność",
            none: "Nie mam barier",
            nothingDiscourages: "Nic mnie nie zniechęca",
            other: "Inne",
          },
        },
        euRegulationPost: {
          question:
            "Czy wiesz, że niektóre gatunki owadów są dopuszczone do obrotu jako żywność w UE?",
          options: {
            yes: "Tak",
            no: "Nie",
            dontKnow: "Nie wiem",
            notSure: "Nie jestem pewny/a",
          },
        },
      },

      // Closing Section
      closing: {
        title: "Dziękujemy za udział!",
        subtitle: "Twoja opinia ma znaczenie.",
        description:
          "Twoje odpowiedzi pomogą nam zrozumieć, jak ludzie postrzegają białko przyszłości. Wyniki badania zostaną opublikowane w 2025 roku.",
        shareTitle: "Podziel się z innymi",
        shareText:
          "Może ktoś z Twoich znajomych też chce poznać białko przyszłości?",
        copyLink: "Kopiuj link",
        copied: "Skopiowano!",
        restart: "Wypełnij ponownie",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pl",
  fallbackLng: "pl",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
