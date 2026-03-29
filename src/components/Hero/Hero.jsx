// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useSurveyStore from '../../store/surveyStore';
import styles from './Hero.module.css';
import cricketFlourImg from '../../assets/cricket-flour.jpg';
import logoBugToTheFutureGreen from '../../assets/logo-bug-to-the-future-dark-with-name.png';
import vizjaLogo from '../../assets/vizja-logo.png';

const Hero = () => {
  const { t } = useTranslation();
  const startSurvey = useSurveyStore((state) => state.startSurvey);

  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gradientOrb3} />
        <div className={styles.pattern} />
      </div>

      <div className={styles.container}>
        <div className={styles.contentColumn}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.img
            className={styles.logoBugToTheFutureGreen}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            src={logoBugToTheFutureGreen}
            alt="Logo Bug to the Future"
          />

          {/* <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {t('hero.title')}
          </motion.h1> */}

          <motion.h2
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {t('hero.subtitle')}
          </motion.h2>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            className={styles.ctaWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <button className={styles.ctaButton} onClick={startSurvey}>
              <span>{t('hero.cta')}</span>
              <svg
                className={styles.ctaArrow}
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
            <p className={styles.ctaSubtext}>{t('hero.ctaSubtext')}</p>
          </motion.div>
        </motion.div>
        <p className={styles.bottomText}>Projekt społeczny, realizowany w ramach pracy licencjackiej z dietetyki.</p>
        </div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className={styles.imageWrapper}>
            <img 
              src={cricketFlourImg} 
              alt="Cricket flour products - sustainable protein source" 
              className={styles.heroImage}
            />
            <div className={styles.vizjaLogoWrap}>
              <img
                src={vizjaLogo}
                alt="Uniwersytet Vizja"
                className={styles.vizjaLogo}
                width={200}
                height={220}
                decoding="async"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
