import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import useSurveyStore from '../../store/surveyStore';
import { AUTO_ADVANCE_DELAY, PRE_QUESTIONS } from '../../constants/survey';
import Question from './Question';
import ProgressBar from './ProgressBar';
import styles from './Survey.module.css';

const PreSurvey = () => {
  const { t } = useTranslation();
  const {
    preAnswers,
    setPreAnswer,
    currentQuestionIndex,
    nextQuestion,
    prevQuestion,
    completePreSurvey,
    getPreSurveyProgress,
  } = useSurveyStore();

  const progress = getPreSurveyProgress();
  const currentQuestion = PRE_QUESTIONS[currentQuestionIndex];
  const currentAnswer = preAnswers[currentQuestion.id];
  const isLastQuestion = currentQuestionIndex === PRE_QUESTIONS.length - 1;

  const handleNext = useCallback(() => {
    if (!isLastQuestion) {
      nextQuestion();
    } else {
      completePreSurvey();
    }
  }, [isLastQuestion, nextQuestion, completePreSurvey]);

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      prevQuestion();
    }
  };

  const handleSelect = useCallback((value) => {
    setPreAnswer(currentQuestion.id, value);
    // Auto-advance after a short delay
    setTimeout(() => {
      handleNext();
    }, AUTO_ADVANCE_DELAY);
  }, [currentQuestion.id, setPreAnswer, handleNext]);

  const getQuestionOptions = (questionId) => {
    const options = t(`questions.${questionId}.options`, { returnObjects: true });
    // Return empty object for scale11 type (0-10 scale)
    return typeof options === 'string' ? {} : options;
  };

  const getScaleLabel = (questionId) => {
    return t(`questions.${questionId}.scaleLabel`, { defaultValue: '' });
  };

  return (
    <section className={styles.survey}>
      <div className={styles.container}>
        <ProgressBar {...progress} />

        <motion.div
          className={styles.intro}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.introText}>{t('preSurvey.intro')}</p>
        </motion.div>

        <AnimatePresence mode="wait">
          <Question
            key={currentQuestion.id}
            question={t(`questions.${currentQuestion.id}.question`)}
            options={getQuestionOptions(currentQuestion.id)}
            selectedAnswer={currentAnswer}
            onSelect={handleSelect}
            type={currentQuestion.type}
            scaleLabel={getScaleLabel(currentQuestion.id)}
          />
        </AnimatePresence>

        <div className={styles.navigation}>
          {currentQuestionIndex > 0 ? (
            <button
              className={`${styles.navButton} ${styles.navButtonBack}`}
              onClick={handleBack}
            >
              <svg
                className={`${styles.navArrow} ${styles.navArrowBack}`}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {t('preSurvey.back')}
            </button>
          ) : (
            <div className={styles.spacer} />
          )}

          <div className={styles.spacer} />
        </div>
      </div>
    </section>
  );
};

export default PreSurvey;
