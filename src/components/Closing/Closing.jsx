import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getMaterialCardsWithHref } from '../../constants/materials';
import { MaterialCardIcon } from './MaterialCardIcons';
import useSurveyStore from '../../store/surveyStore';
import styles from './Closing.module.css';

const materialCards = getMaterialCardsWithHref();

const CONTACT_EMAIL = 'bugtothefuture.project@gmail.com';

function EnvelopeIcon({ className, size }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 4h16a2 2 0 0 1 2 2v.4l-10 6.25L2 6.4V6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M22 8.27V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.27"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

const Closing = () => {
  const { t } = useTranslation();
  const reset = useSurveyStore((state) => state.reset);
  const retrySubmission = useSurveyStore((state) => state.retrySubmission);
  const submissionError = useSurveyStore((state) => state.submissionError);
  const hasSubmitted = useSurveyStore((state) => state.hasSubmitted);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleRestart = () => {
    reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className={styles.closing}>
      <div className={styles.background}>
        <div className={styles.confetti} />
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
      </div>

      <motion.div
        className={styles.container}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className={styles.successIcon}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
        >
          <span>🎉</span>
        </motion.div>

        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {t('closing.title')}
        </motion.h2>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {t('closing.subtitle')}
        </motion.p>

        {submissionError && (
          <motion.div
            className={styles.submissionError}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>{t('closing.submissionError')}</p>
            <button
              className={styles.retryButton}
              onClick={retrySubmission}
            >
              {t('closing.retry')}
            </button>
          </motion.div>
        )}

        <motion.div
          className={styles.contactBlock}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          <EnvelopeIcon className={styles.contactIconLarge} size={44} />
          <p className={styles.contactIntro}>{t('closing.contactIntro')}</p>
          <a
            className={styles.contactEmailRow}
            href={`mailto:${CONTACT_EMAIL}`}
            aria-label={t('closing.contactEmailAria', { email: CONTACT_EMAIL })}
          >
            <EnvelopeIcon className={styles.contactIconSmall} size={20} />
            <span className={styles.contactEmailText}>{t('closing.contactEmail')}</span>
          </a>
        </motion.div>

        {materialCards.length > 0 && (
          <motion.div
            className={styles.materialsBlock}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            <h3 className={styles.learnMoreTitle}>{t('closing.learnMoreTitle')}</h3>
            <p className={styles.learnMoreSubtitle}>
              {t('closing.learnMoreSubtitle')}
            </p>
            <div className={styles.materialsGrid}>
              {materialCards.map(({ href, i18nKey, icon }) => (
                <article key={i18nKey} className={styles.materialCard}>
                  <div className={styles.materialCardIcon}>
                    <MaterialCardIcon
                      name={icon}
                      className={styles.materialCardIconSvg}
                    />
                  </div>
                  <h4 className={styles.materialCardTitle}>
                    {t(`closing.materials.cards.${i18nKey}.title`)}
                  </h4>
                  <div className={styles.materialCardRule} aria-hidden />
                  <p className={styles.materialCardDesc}>
                    {t(`closing.materials.cards.${i18nKey}.description`)}
                  </p>
                  <a
                    className={styles.materialCardCta}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t(`closing.materials.cards.${i18nKey}.title`)} — ${t('closing.materialCta')}`}
                  >
                    {t('closing.materialCta')}
                  </a>
                </article>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          className={styles.shareBlock}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: materialCards.length > 0 ? 0.75 : 0.65,
            duration: 0.5,
          }}
        >
          <h3 className={styles.shareTitle}>{t('closing.shareTitle')}</h3>
          <p className={styles.shareText}>{t('closing.shareText')}</p>

          <button
            className={styles.copyButton}
            onClick={handleCopyLink}
          >
            {copied ? (
              <>
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
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {t('closing.copied')}
              </>
            ) : (
              <>
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
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                {t('closing.copyLink')}
              </>
            )}
          </button>
        </motion.div>

        <motion.button
          className={styles.restartButton}
          onClick={handleRestart}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: materialCards.length > 0 ? 0.9 : 0.8,
            duration: 0.5,
          }}
        >
          {t('closing.restart')}
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Closing;
