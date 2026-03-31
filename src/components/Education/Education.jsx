import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useSurveyStore from '../../store/surveyStore';
import styles from './Education.module.css';

const YOUTUBE_VIDEO_ID = 'rcvoI3PRFJA';
/** Seconds into the video the user must reach (playback position, not wall-clock watch time). */
const REQUIRED_WATCH_TIME = 167;

const Education = () => {
  const { t } = useTranslation();
  const completeEducation = useSurveyStore((s) => s.completeEducation);

  const [showIntroPopup, setShowIntroPopup] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const playerReadyRef = useRef(false);
  const shouldAutoplayAfterIntro = useRef(false);
  /** Cumulative seconds the video was actually playing or buffering (detects seek/skip vs real viewing). */
  const totalEngagedWatchRef = useRef(0);
  const lastEngagedWatchTickRef = useRef(null);
  const maxPlaybackRef = useRef(0);
  const finishOnceRef = useRef(false);

  const syncFromPlayer = useCallback(() => {
    const player = playerRef.current;
    if (!player?.getCurrentTime) return;
    const t = player.getCurrentTime();
    setVideoTime(t);
    maxPlaybackRef.current = Math.max(maxPlaybackRef.current, t);

    const YT = window.YT;
    if (YT && player.getPlayerState) {
      const ps = player.getPlayerState();
      const engaged =
        ps === YT.PlayerState.PLAYING || ps === YT.PlayerState.BUFFERING;
      if (engaged) {
        const now = Date.now();
        if (lastEngagedWatchTickRef.current != null) {
          totalEngagedWatchRef.current +=
            (now - lastEngagedWatchTickRef.current) / 1000;
        }
        lastEngagedWatchTickRef.current = now;
      } else {
        lastEngagedWatchTickRef.current = null;
      }
    }

    if (t >= REQUIRED_WATCH_TIME) {
      setCanProceed(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, []);

  const handleFinish = useCallback(() => {
    if (finishOnceRef.current) return;
    finishOnceRef.current = true;
    const round1 = (n) => Math.round(n * 10) / 10;
    completeEducation({
      totalWatchSeconds: round1(totalEngagedWatchRef.current),
      maxPlaybackSeconds: Math.round(maxPlaybackRef.current),
    });
  }, [completeEducation]);

  const handlePlayerStateChange = useCallback((event) => {
    const YT = window.YT;
    const active =
      event.data === YT.PlayerState.PLAYING || event.data === YT.PlayerState.BUFFERING;

    if (active) {
      setIsPlaying(true);
      if (!intervalRef.current) {
        syncFromPlayer();
        intervalRef.current = setInterval(syncFromPlayer, 250);
      }
    } else {
      setIsPlaying(false);
      if (event.data === YT.PlayerState.ENDED && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      syncFromPlayer();

      if (event.data === YT.PlayerState.ENDED) {
        const player = playerRef.current;
        if (!player?.getCurrentTime || !player.getDuration || finishOnceRef.current) return;
        const t = player.getCurrentTime();
        const duration = player.getDuration();
        const atEnd =
          Number.isFinite(duration) && duration > 0 && t >= duration - 2;
        const pastRequired = t >= REQUIRED_WATCH_TIME;
        const shortVideoToEnd =
          Number.isFinite(duration) &&
          duration > 0 &&
          duration <= REQUIRED_WATCH_TIME &&
          atEnd;
        if (pastRequired || shortVideoToEnd) {
          handleFinish();
        }
      }
    }
  }, [syncFromPlayer, handleFinish]);

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

  const remainingSeconds = Math.max(0, Math.ceil(REQUIRED_WATCH_TIME - videoTime));

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

          {!isPlaying && videoTime < 1 && (
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

          {!canProceed && videoTime > 0 && (
            <motion.div
              className={styles.watchProgress}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${Math.min(100, (videoTime / REQUIRED_WATCH_TIME) * 100)}%`,
                  }}
                />
              </div>
              <span className={styles.watchText}>
                {t('education.watchRemaining', { seconds: remainingSeconds })}
              </span>
            </motion.div>
          )}

          {canProceed && (
            <motion.button
              type="button"
              className={styles.proceedSection}
              onClick={handleFinish}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className={styles.checkmark} aria-hidden>✓</span>
              <span className={styles.readyText}>{t('education.readyToProceed')}</span>
            </motion.button>
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
