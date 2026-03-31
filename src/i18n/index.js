import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  pl: {
    translation: {
      // Hero Section
      hero: {
        title: "Bug to the Future",
        subtitle: "Czy białko przyszłości ma skrzydła?",
        description: "Sprawdź, czy Twoja pierwsza reakcja się zmieni.",
        cta: "Sprawdź siebie",
        ctaSubtext: "To zajmie tylko 5 minut",
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

      // Education Section
      education: {
        title: "Białko przyszłości",
        introTitle: "Czas na kilka faktów",
        introDescription:
          "Teraz pokażemy Ci kilka faktów o białku przyszłości. Zobacz, czy coś z tego zmieni Twoje spojrzenie.",
        introCta: "Zobacz materiał",
        introDuration: "3 min",
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
        shareTitle: "Podziel się z innymi",
        shareText: "Znasz kogoś, kto powinien to zobaczyć? Udostępnij dalej!",
        copyLink: "Kopiuj link",
        copied: "Skopiowano!",
        restart: "Wypełnij ponownie",
        submissionError: "Nie udało się zapisać odpowiedzi",
        retry: "Spróbuj ponownie",
        contactIntro:
          "Masz pytania dotyczące projektu? Skontaktuj się z nami.",
        contactEmail: "bugtothefuture.project@gmail.com",
        contactEmailAria: "Napisz na adres e-mail projektu",
        contactIntro:
          "Masz pytania dotyczące projektu? Skontaktuj się z nami.",
        contactEmail: "bugtothefuture.project@gmail.com",
        contactEmailAria: "Napisz na {{email}}",
        learnMoreTitle: "Dowiedz się więcej",
        learnMoreSubtitle:
          "Zebraliśmy tu wybrane materiały i informacje dotyczące białka przyszłości.",
        materialCta: "Zobacz materiał →",
        materials: {
          items: {
            analizaBatonow: "Analiza batonów proteinowych (novel food)",
            bialkoPrzyszlosci:
              "Białko przyszłości – wartość odżywcza i porównanie źródeł białka",
            czyWiesz10Faktow: "Czy wiesz, że… 10 faktów o produktach z owadów",
            jakPowstajeBialkoOwadzie: "Jak powstaje białko owadzie",
            mityIFakty: "Mity i fakty o żywności z owadów",
          },
          cards: {
            czyWiesz10Faktow: {
              title: "Ciekawostki o białku przyszłości",
              description: "Najciekawsze fakty o nowych źródłach białka.",
            },
            mityIFakty: {
              title: "Mity i fakty o białku owadzim",
              description: "Obalamy najpopularniejsze mity i stereotypy.",
            },
            bialkoPrzyszlosci: {
              title: "Białko przyszłości – wartość odżywcza",
              description:
                "Porównanie białka owadziego do innych źródeł białka.",
            },
            jakPowstajeBialkoOwadzie: {
              title: "Jak powstaje białko owadzie?",
              description: "Proces produkcji krok po kroku.",
            },
            analizaBatonow: {
              title: "Protein bar pod lupą",
              description:
                "Analiza batonów proteinowych typu novel food  dostępnych na rynku UE",
            },
          },
        },
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
