import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pl: {
    translation: {
      // Hero Section
      hero: {
        title: 'Bug to the Future',
        subtitle: 'Czy białko przyszłości ma skrzydła?',
        description: 'Sprawdź, co sądzisz o białku przyszłości — i czy Twoje zdanie może się zmienić.',
        cta: 'Podziel się swoją opinią',
        ctaSubtext: 'Pomagasz zmieniać przyszłość jedzenia.',
      },
      
      // Pre-Survey Section
      preSurvey: {
        intro: 'Zanim pokażemy Ci krótki materiał o białku przyszłości, sprawdź swoje obecne zdanie.',
        progress: '{{current}} z {{total}}',
        next: 'Dalej',
        back: 'Wstecz',
        submit: 'Zakończ ankietę',
      },
      
      // Questions
      questions: {
        openness: {
          question: 'Jak otwarta/y jesteś na próbowanie nowych źródeł białka?',
          options: {
            1: 'Zdecydowanie niechętna/y',
            2: 'Raczej niechętna/y',
            3: 'Neutralna/y',
            4: 'Raczej otwarta/y',
            5: 'Bardzo otwarta/y',
          },
        },
        knowledge: {
          question: 'Jak oceniasz swoją wiedzę o alternatywnych źródłach białka?',
          options: {
            1: 'Nie wiem nic',
            2: 'Wiem bardzo mało',
            3: 'Wiem trochę',
            4: 'Znam temat dobrze',
            5: 'Jestem ekspertem/ką',
          },
        },
        environment: {
          question: 'Jak ważny jest dla Ciebie wpływ żywności na środowisko?',
          options: {
            1: 'Wcale nieważny',
            2: 'Mało ważny',
            3: 'Umiarkowanie ważny',
            4: 'Dość ważny',
            5: 'Bardzo ważny',
          },
        },
        insectProtein: {
          question: 'Jak reagujesz na pomysł jedzenia produktów z białka owadziego?',
          options: {
            1: 'Zdecydowanie negatywnie',
            2: 'Raczej negatywnie',
            3: 'Neutralnie',
            4: 'Raczej pozytywnie',
            5: 'Bardzo pozytywnie',
          },
        },
        tryProduct: {
          question: 'Czy rozważyłabyś/byś spróbowanie produktu spożywczego zawierającego mączkę z owadów?',
          options: {
            1: 'Zdecydowanie nie',
            2: 'Raczej nie',
            3: 'Trudno powiedzieć',
            4: 'Raczej tak',
            5: 'Zdecydowanie tak',
          },
        },
        barriers: {
          question: 'Co jest dla Ciebie największą barierą?',
          options: {
            appearance: 'Wygląd/estetyka',
            taste: 'Obawy o smak',
            safety: 'Bezpieczeństwo zdrowotne',
            tradition: 'Tradycja kulturowa',
            price: 'Cena',
            availability: 'Dostępność',
            none: 'Nie mam barier',
          },
        },
      },
      
      // Transition Section
      transition: {
        title: 'Czas na kilka faktów',
        description: 'Teraz pokażemy Ci kilka faktów o białku przyszłości. Zobacz, czy coś z tego zmieni Twoje spojrzenie.',
        cta: 'Zobacz materiał',
        duration: '2 min',
      },
      
      // Education Section
      education: {
        title: 'Białko przyszłości',
        slides: {
          intro: {
            title: 'Czy wiesz, że...',
            content: 'Do 2050 roku populacja Ziemi osiągnie 10 miliardów ludzi. Potrzebujemy nowych, zrównoważonych źródeł białka.',
          },
          efficiency: {
            title: 'Efektywność produkcji',
            content: 'Owady potrzebują 12x mniej paszy niż bydło, aby wyprodukować tę samą ilość białka. Zużywają też 2000x mniej wody.',
          },
          nutrition: {
            title: 'Wartości odżywcze',
            content: 'Mączka z owadów zawiera wszystkie niezbędne aminokwasy, jest bogata w żelazo, cynk i witaminy z grupy B.',
          },
          everyday: {
            title: 'Codzienne zastosowanie',
            content: 'Białko owadzie jest przetwarzane na mączkę, która staje się niewidocznym składnikiem batonów proteinowych, makaronów czy wypieków.',
          },
          global: {
            title: 'Globalna perspektywa',
            content: 'Ponad 2 miliardy ludzi na świecie regularnie spożywa owady. W Europie to nowy trend, ale dla wielu kultur — codzienna praktyka.',
          },
        },
        next: 'Dalej',
        finish: 'Zakończ',
      },
      
      // Post-Survey Section
      postSurvey: {
        title: 'A teraz sprawdźmy, czy coś się zmieniło.',
        intro: 'Odpowiedz na kilka pytań po obejrzeniu materiału.',
      },
      
      // Post Questions
      postQuestions: {
        insectProteinPost: {
          question: 'Jak teraz reagujesz na pomysł jedzenia produktów z białka owadziego?',
          options: {
            1: 'Zdecydowanie negatywnie',
            2: 'Raczej negatywnie',
            3: 'Neutralnie',
            4: 'Raczej pozytywnie',
            5: 'Bardzo pozytywnie',
          },
        },
        tryProductPost: {
          question: 'Czy teraz rozważyłabyś/byś spróbowanie takiego produktu?',
          options: {
            1: 'Zdecydowanie nie',
            2: 'Raczej nie',
            3: 'Trudno powiedzieć',
            4: 'Raczej tak',
            5: 'Zdecydowanie tak',
          },
        },
        barriersPost: {
          question: 'Co jest teraz dla Ciebie największą barierą?',
          options: {
            appearance: 'Wygląd/estetyka',
            taste: 'Obawy o smak',
            safety: 'Bezpieczeństwo zdrowotne',
            tradition: 'Tradycja kulturowa',
            price: 'Cena',
            availability: 'Dostępność',
            none: 'Nie mam barier',
          },
        },
        learned: {
          question: 'Czy dowiedziałaś/eś się czegoś nowego?',
          options: {
            1: 'Nie, nic nowego',
            2: 'Trochę',
            3: 'Sporo nowych informacji',
            4: 'Bardzo dużo nowego',
          },
        },
      },
      
      // Closing Section
      closing: {
        title: 'Dziękujemy za udział!',
        subtitle: 'Twoja opinia ma znaczenie.',
        description: 'Twoje odpowiedzi pomogą nam zrozumieć, jak ludzie postrzegają białko przyszłości. Wyniki badania zostaną opublikowane w 2025 roku.',
        shareTitle: 'Podziel się z innymi',
        shareText: 'Może ktoś z Twoich znajomych też chce poznać białko przyszłości?',
        copyLink: 'Kopiuj link',
        copied: 'Skopiowano!',
        restart: 'Wypełnij ponownie',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pl',
    fallbackLng: 'pl',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
