import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import useSurveyStore from '../../store/surveyStore';
import { AUTO_ADVANCE_DELAY, POST_QUESTIONS } from '../../constants/survey';
import Question from './Question';
import ProgressBar from './ProgressBar';
import styles from './Survey.module.css';

const PostSurvey = () => {
  const { t } = useTranslation();
  const {
    postAnswers,
    setPostAnswer,
    currentQuestionIndex,
    nextQuestion,
    prevQuestion,
    completePostSurvey,
    getPostSurveyProgress,
  } = useSurveyStore();

  const progress = getPostSurveyProgress();
  const currentQuestion = POST_QUESTIONS[currentQuestionIndex];
  const currentAnswer = postAnswers[currentQuestion.id];
  const isLastQuestion = currentQuestionIndex === POST_QUESTIONS.length - 1;
  const isMultipleChoice = currentQuestion.type === 'multiple';

  const handleNext = useCallback(() => {
    if (!isLastQuestion) {
      nextQuestion();
    } else {
      completePostSurvey();
    }
  }, [isLastQuestion, nextQuestion, completePostSurvey]);

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      prevQuestion();
    }
  };

  const handleSelect = useCallback((value) => {
    setPostAnswer(currentQuestion.id, value);
    // Only auto-advance for non-multiple choice questions
    if (currentQuestion.type !== 'multiple') {
      setTimeout(() => {
        handleNext();
      }, AUTO_ADVANCE_DELAY);
    }
  }, [currentQuestion.id, currentQuestion.type, setPostAnswer, handleNext]);

  const getQuestionOptions = (questionId) => {
    const options = t(`postQuestions.${questionId}.options`, { returnObjects: true });
    return typeof options === 'string' ? {} : options;
  };

  const getScaleLabel = (questionId) => {
    return t(`postQuestions.${questionId}.scaleLabel`, { defaultValue: '' });
  };

  const getOtherPlaceholder = (questionId) => {
    return t(`postQuestions.${questionId}.otherPlaceholder`, { defaultValue: '' });
  };

  const hasValidAnswer = () => {
    if (!currentAnswer) return false;
    if (isMultipleChoice) {
      return currentAnswer.selected && currentAnswer.selected.length > 0;
    }
    return true;
  };

  return (
    <section className={`${styles.survey} ${styles.surveyPost}`}>
      <div className={styles.container}>
        <ProgressBar {...progress} />

        <motion.div
          className={styles.intro}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.introTitle}>{t('postSurvey.title')}</h2>
          <p className={styles.introText}>{t('postSurvey.intro')}</p>
        </motion.div>

        <AnimatePresence mode="wait">
          <Question
            key={currentQuestion.id}
            question={t(`postQuestions.${currentQuestion.id}.question`)}
            options={getQuestionOptions(currentQuestion.id)}
            selectedAnswer={currentAnswer}
            onSelect={handleSelect}
            type={currentQuestion.type}
            scaleLabel={getScaleLabel(currentQuestion.id)}
            otherAllowsInput={currentQuestion.otherAllowsInput}
            otherPlaceholder={getOtherPlaceholder(currentQuestion.id)}
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

          {isMultipleChoice ? (
            <button
              className={`${styles.navButton} ${styles.navButtonNext}`}
              onClick={handleNext}
              disabled={!hasValidAnswer()}
            >
              {isLastQuestion ? t('preSurvey.submit') : t('preSurvey.next')}
              <svg
                className={styles.navArrow}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <div className={styles.spacer} />
          )}
        </div>
      </div>
    </section>
  );
};

export default PostSurvey;
