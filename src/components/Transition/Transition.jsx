import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useSurveyStore from '../../store/surveyStore';
import styles from './Transition.module.css';

const Transition = () => {
  const { t } = useTranslation();
  const startEducation = useSurveyStore((state) => state.startEducation);

  return (
    <section className={styles.transition}>
      <div className={styles.background}>
        <div className={styles.wave1} />
        <div className={styles.wave2} />
      </div>

      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className={styles.icon}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
        >
          <span>📚</span>
        </motion.div>

        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {t('transition.title')}
        </motion.h2>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {t('transition.description')}
        </motion.p>

        <motion.button
          className={styles.ctaButton}
          onClick={startEducation}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className={styles.playIcon}>▶</span>
          <span>{t('transition.cta')}</span>
          <span className={styles.duration}>({t('transition.duration')})</span>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Transition;
