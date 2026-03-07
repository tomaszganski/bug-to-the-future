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
          scaleLabel: "Skala 0–10",
        },
        barriers: {
          question:
            "Co jest dla Ciebie największą barierą przed spróbowaniem produktów z białkiem owadzim?",
          options: {
            appearance: "Wygląd lub skojarzenia wizualne z owadami",
            taste: "Obawy o smak",
            safety: "Obawy dotyczące bezpieczeństwa zdrowotnego",
            tradition:
              "Brak przyzwyczajenia / tradycji spożywania takich produktów",
            lackOfKnowledge:
              "Brak wiedzy na temat produktów zawierających białko z owadów",
            noNeed: "Brak potrzeby wprowadzania takich produktów do diety",
            price: "Cena",
            availability: "Dostępność",
            other: "Inne (jakie?)",
            nothingDiscourages: "Nic mnie nie zniechęca",
          },
          otherPlaceholder: "Wpisz swoją odpowiedź...",
        },
        nutritionValue: {
          question:
            "Czy uważasz, że białko pochodzenia owadziego ma zbliżoną wartość odżywczą do mięsa zwierzęcego?",
          options: {
            yes: "Tak",
            no: "Nie",
            dontKnow: "Nie wiem",
          },
        },
        euRegulation: {
          question:
            "Czy to stwierdzenie jest prawdziwe: niektóre gatunki owadów są dopuszczone do obrotu w UE?",
          options: {
            true: "Prawda",
            false: "Fałsz",
            dontKnow: "Nie wiem",
          },
        },
        age: {
          question: "W jakim jesteś wieku?",
          options: {
            under18: "Poniżej 18",
            "18-24": "18-24",
            "25-35": "25-35",
            "36-45": "36-45",
            over45: "Powyżej 45",
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
        playVideo: "Odtwórz wideo",
        watchRemaining: "Pozostało {{seconds}} sek. do odblokowania",
        readyToProceed: "Możesz przejść dalej",
        finish: "Dalej",
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
        barriersPost: {
          question:
            "Co jest dla Ciebie największą barierą przed spróbowaniem produktów z białkiem owadzim?",
          options: {
            appearance: "Wygląd lub skojarzenia wizualne z owadami",
            taste: "Obawy o smak",
            safety: "Obawy dotyczące bezpieczeństwa zdrowotnego",
            tradition:
              "Brak przyzwyczajenia / tradycji spożywania takich produktów",
            lackOfKnowledge:
              "Brak wiedzy na temat produktów zawierających białko z owadów",
            noNeed: "Brak potrzeby wprowadzania takich produktów do diety",
            price: "Cena",
            availability: "Dostępność",
            other: "Inne (jakie?)",
            nothingDiscourages: "Nic mnie nie zniechęca",
          },
          otherPlaceholder: "Wpisz swoją odpowiedź...",
        },
        nutritionValuePost: {
          question:
            "Czy uważasz, że białko pochodzenia owadziego ma zbliżoną wartość odżywczą do mięsa zwierzęcego?",
          options: {
            yes: "Tak",
            no: "Nie",
            dontKnow: "Nie wiem",
          },
        },
        euRegulationPost: {
          question:
            "Czy to stwierdzenie jest prawdziwe: niektóre gatunki owadów są dopuszczone do obrotu w UE?",
          options: {
            true: "Prawda",
            false: "Fałsz",
            dontKnow: "Nie wiem",
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
        submitted: "Odpowiedzi zostały zapisane",
        submissionError: "Nie udało się zapisać odpowiedzi",
        retry: "Spróbuj ponownie",
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
