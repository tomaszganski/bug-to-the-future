import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useSurveyStore from '../../store/surveyStore';
import styles from './Education.module.css';

const YOUTUBE_VIDEO_ID = 'rcvoI3PRFJA';
const REQUIRED_WATCH_TIME = 167;

const Education = () => {
  const { t } = useTranslation();
  const completeEducation = useSurveyStore((s) => s.completeEducation);

  const [showIntroPopup, setShowIntroPopup] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [watchedSeconds, setWatchedSeconds] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const playerReadyRef = useRef(false);
  const shouldAutoplayAfterIntro = useRef(false);

  const handlePlayerStateChange = useCallback((event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setWatchedSeconds((prev) => {
          const newVal = prev + 1;
          if (newVal >= REQUIRED_WATCH_TIME) {
            setCanProceed(true);
            clearInterval(intervalRef.current);
          }
          return newVal;
        });
      }, 1000);
    } else {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, []);

  const handlePlayerReady = useCallback(() => {
    playerReadyRef.current = true;
    if (shouldAutoplayAfterIntro.current) {
      shouldAutoplayAfterIntro.current = false;
      playerRef.current?.playVideo?.();
    }
  }, []);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: handlePlayerReady,
          onStateChange: handlePlayerStateChange,
        },
      });
    };

    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
      playerReadyRef.current = false;
    };
  }, [handlePlayerStateChange, handlePlayerReady]);

  const handlePlayVideo = () => {
    if (playerRef.current && playerRef.current.playVideo) {
      playerRef.current.playVideo();
    }
  };

  const handleIntroConfirm = () => {
    setShowIntroPopup(false);
    shouldAutoplayAfterIntro.current = true;
    if (playerReadyRef.current) {
      shouldAutoplayAfterIntro.current = false;
      playerRef.current?.playVideo?.();
    }
  };

  const handleFinish = () => {
    completeEducation();
  };

  const remainingSeconds = Math.max(0, REQUIRED_WATCH_TIME - watchedSeconds);

  return (
    <section className={styles.education}>
      <AnimatePresence>
        {showIntroPopup && (
          <motion.div
            className={styles.introBackdrop}
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className={styles.introModal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="education-intro-title"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.introIcon} aria-hidden>
                <span>📚</span>
              </div>
              <h2 id="education-intro-title" className={styles.introTitle}>
                {t('education.introTitle')}
              </h2>
              <p className={styles.introDescription}>{t('education.introDescription')}</p>
              <button
                type="button"
                className={styles.introCta}
                onClick={handleIntroConfirm}
              >
                <span className={styles.introPlayIcon}>▶</span>
                <span>{t('education.introCta')}</span>
                <span className={styles.introDuration}>({t('education.introDuration')})</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.background}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.videoCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className={styles.videoTitle}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {t('education.title')}
          </motion.h2>

          <div className={styles.videoWrapper}>
            <div id="youtube-player" className={styles.videoPlayer} />
          </div>

          {!isPlaying && watchedSeconds === 0 && (
            <motion.button
              className={styles.playButton}
              onClick={handlePlayVideo}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>{t('education.playVideo')}</span>
            </motion.button>
          )}

          {!canProceed && watchedSeconds > 0 && (
            <motion.div
              className={styles.watchProgress}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${(watchedSeconds / REQUIRED_WATCH_TIME) * 100}%` }}
                />
              </div>
              <span className={styles.watchText}>
                {t('education.watchRemaining', { seconds: remainingSeconds })}
              </span>
            </motion.div>
          )}

          {canProceed && (
            <motion.div
              className={styles.proceedSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className={styles.checkmark}>✓</span>
              <span className={styles.readyText}>{t('education.readyToProceed')}</span>
            </motion.div>
          )}
        </motion.div>

        <div className={styles.navigation}>
          <div className={styles.spacer} />
          <button
            className={`${styles.navButton} ${styles.navButtonNext} ${!canProceed ? styles.disabled : ''}`}
            onClick={handleFinish}
            disabled={!canProceed}
          >
            <span>{t('education.finish')}</span>
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
