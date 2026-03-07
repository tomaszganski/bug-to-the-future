import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useSurveyStore from '../../store/surveyStore';
import styles from './Education.module.css';

const YOUTUBE_VIDEO_ID = 'Z20BEPgwHzE';
const REQUIRED_WATCH_TIME = 5;

const Education = () => {
  const { t } = useTranslation();
  const { completeEducation } = useSurveyStore();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [watchedSeconds, setWatchedSeconds] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const playerRef = useRef(null);
  const intervalRef = useRef(null);

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
    };
  }, [handlePlayerStateChange]);

  const handlePlayVideo = () => {
    if (playerRef.current && playerRef.current.playVideo) {
      playerRef.current.playVideo();
    }
  };

  const handleFinish = () => {
    completeEducation();
  };

  const remainingSeconds = Math.max(0, REQUIRED_WATCH_TIME - watchedSeconds);

  return (
    <section className={styles.education}>
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
