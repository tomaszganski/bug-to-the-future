import { create } from "zustand";
import { persist } from "zustand/middleware";
import { submitSurveyToGoogleSheets } from "../services/googleSheets";

const useSurveyStore = create(
  persist(
    (set, get) => ({
      // Current section (hero, preSurvey, transition, education, postSurvey, closing)
      currentSection: "hero",

      // Pre-survey answers
      preAnswers: {},

      // Post-survey answers
      postAnswers: {},

      // Current question index in survey
      currentQuestionIndex: 0,

      // Education slide index
      currentSlideIndex: 0,

      // Has completed pre-survey
      hasCompletedPreSurvey: false,

      // Has watched education
      hasWatchedEducation: false,

      // Has completed post-survey
      hasCompletedPostSurvey: false,

      // Submission state
      isSubmitting: false,
      submissionError: null,
      hasSubmitted: false,

      // Actions
      setSection: (section) => set({ currentSection: section }),

      setPreAnswer: (questionId, answer) =>
        set((state) => ({
          preAnswers: { ...state.preAnswers, [questionId]: answer },
        })),

      setPostAnswer: (questionId, answer) =>
        set((state) => ({
          postAnswers: { ...state.postAnswers, [questionId]: answer },
        })),

      nextQuestion: () =>
        set((state) => ({
          currentQuestionIndex: state.currentQuestionIndex + 1,
        })),

      prevQuestion: () =>
        set((state) => ({
          currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
        })),

      resetQuestionIndex: () => set({ currentQuestionIndex: 0 }),

      nextSlide: () =>
        set((state) => ({
          currentSlideIndex: state.currentSlideIndex + 1,
        })),

      prevSlide: () =>
        set((state) => ({
          currentSlideIndex: Math.max(0, state.currentSlideIndex - 1),
        })),

      resetSlideIndex: () => set({ currentSlideIndex: 0 }),

      completePreSurvey: () =>
        set({
          hasCompletedPreSurvey: true,
          currentSection: "transition",
        }),

      completeEducation: () =>
        set({
          hasWatchedEducation: true,
          currentSection: "postSurvey",
          currentQuestionIndex: 0,
        }),

      completePostSurvey: async () => {
        const state = get();
        
        set({
          hasCompletedPostSurvey: true,
          currentSection: "closing",
          isSubmitting: true,
          submissionError: null,
        });

        try {
          await submitSurveyToGoogleSheets(state.preAnswers, state.postAnswers);
          set({ hasSubmitted: true, isSubmitting: false });
        } catch (error) {
          set({ submissionError: error.message, isSubmitting: false });
        }
      },

      retrySubmission: async () => {
        const state = get();
        set({ isSubmitting: true, submissionError: null });

        try {
          await submitSurveyToGoogleSheets(state.preAnswers, state.postAnswers);
          set({ hasSubmitted: true, isSubmitting: false });
        } catch (error) {
          set({ submissionError: error.message, isSubmitting: false });
        }
      },

      startSurvey: () =>
        set({
          currentSection: "preSurvey",
          currentQuestionIndex: 0,
        }),

      startEducation: () =>
        set({
          currentSection: "education",
          currentSlideIndex: 0,
        }),

      reset: () =>
        set({
          currentSection: "hero",
          preAnswers: {},
          postAnswers: {},
          currentQuestionIndex: 0,
          currentSlideIndex: 0,
          hasCompletedPreSurvey: false,
          hasWatchedEducation: false,
          hasCompletedPostSurvey: false,
          isSubmitting: false,
          submissionError: null,
          hasSubmitted: false,
        }),

      // Computed values
      getPreSurveyProgress: () => {
        const state = get();
        const totalQuestions = 6;
        return {
          current: state.currentQuestionIndex + 1,
          total: totalQuestions,
          percentage: ((state.currentQuestionIndex + 1) / totalQuestions) * 100,
        };
      },

      getPostSurveyProgress: () => {
        const state = get();
        const totalQuestions = 4; // attitudeChange, barriersPost, nutritionValuePost, euRegulationPost
        return {
          current: state.currentQuestionIndex + 1,
          total: totalQuestions,
          percentage: ((state.currentQuestionIndex + 1) / totalQuestions) * 100,
        };
      },

      getEducationProgress: () => {
        const state = get();
        const totalSlides = 5;
        return {
          current: state.currentSlideIndex + 1,
          total: totalSlides,
          percentage: ((state.currentSlideIndex + 1) / totalSlides) * 100,
        };
      },
    }),
    {
      name: "bug-to-future-survey",
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);

export default useSurveyStore;
