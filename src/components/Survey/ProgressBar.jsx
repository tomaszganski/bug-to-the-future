import { motion } from 'framer-motion';
import styles from './Survey.module.css';

const ProgressBar = ({ current, total, percentage }) => {
  return (
    <div className={styles.progressWrapper}>
      <div className={styles.progressInfo}>
        <span className={styles.progressText}>
          {current} z {total}
        </span>
      </div>
      <div className={styles.progressTrack}>
        <motion.div
          className={styles.progressFill}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
