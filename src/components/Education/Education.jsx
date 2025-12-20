import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useSurveyStore from '../../store/surveyStore';
import styles from './Education.module.css';

const SLIDES = ['intro', 'efficiency', 'nutrition', 'everyday', 'global'];

const SLIDE_ICONS = {
  intro: '🌍',
  efficiency: '⚡',
  nutrition: '🥗',
  everyday: '🍜',
  global: '🌏',
};

const Education = () => {
  const { t } = useTranslation();
  const {
    currentSlideIndex,
    nextSlide,
    prevSlide,
    completeEducation,
    getEducationProgress,
  } = useSurveyStore();

  const progress = getEducationProgress();
  const currentSlide = SLIDES[currentSlideIndex];
  const isLastSlide = currentSlideIndex === SLIDES.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      completeEducation();
    } else {
      nextSlide();
    }
  };

  const handleBack = () => {
    if (currentSlideIndex > 0) {
      prevSlide();
    }
  };

  return (
    <section className={styles.education}>
      <div className={styles.background}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
      </div>

      <div className={styles.container}>
        {/* Progress */}
        <div className={styles.progressWrapper}>
          <div className={styles.progressDots}>
            {SLIDES.map((_, index) => (
              <div
                key={index}
                className={`${styles.progressDot} ${index <= currentSlideIndex ? styles.active : ''}`}
              />
            ))}
          </div>
          <span className={styles.progressText}>
            {progress.current} / {progress.total}
          </span>
        </div>

        {/* Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className={styles.slideCard}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              className={styles.slideIcon}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
            >
              <span>{SLIDE_ICONS[currentSlide]}</span>
            </motion.div>

            <motion.h3
              className={styles.slideTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {t(`education.slides.${currentSlide}.title`)}
            </motion.h3>

            <motion.p
              className={styles.slideContent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {t(`education.slides.${currentSlide}.content`)}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className={styles.navigation}>
          {currentSlideIndex > 0 ? (
            <button
              className={`${styles.navButton} ${styles.navButtonBack}`}
              onClick={handleBack}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          ) : (
            <div className={styles.spacer} />
          )}

          <button
            className={`${styles.navButton} ${styles.navButtonNext}`}
            onClick={handleNext}
          >
            <span>{isLastSlide ? t('education.finish') : t('education.next')}</span>
            <svg
              width="20"
              height="20"
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
        </div>
      </div>
    </section>
  );
};

export default Education;
