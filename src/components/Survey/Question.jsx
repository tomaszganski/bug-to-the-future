import { motion } from 'framer-motion';
import styles from './Survey.module.css';

const Question = ({ 
  question, 
  options, 
  selectedAnswer, 
  onSelect, 
  type = 'scale', // 'scale' | 'single' | 'scale11'
  scaleLabel,
}) => {
  const isScale11 = type === 'scale11';
  const isScaleType = type === 'scale';
  
  // For scale11, generate 1-10 options
  const optionEntries = isScale11 
    ? Array.from({ length: 10 }, (_, i) => [String(i + 1), String(i + 1)])
    : Object.entries(options || {});

  return (
    <motion.div
      className={styles.questionCard}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <h3 className={styles.questionText}>{question}</h3>
      {scaleLabel && <p className={styles.scaleLabel}>{scaleLabel}</p>}
      
      <div className={isScale11 ? styles.scale11Options : (isScaleType ? styles.scaleOptions : styles.singleOptions)}>
        {optionEntries.map(([value, label], index) => (
          <motion.button
            key={value}
            className={`${styles.optionButton} ${isScale11 ? styles.scale11Button : ''} ${selectedAnswer === value ? styles.selected : ''}`}
            onClick={() => onSelect(value)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isScale11 ? (
              <span className={styles.scale11Value}>{value}</span>
            ) : (
              <>
                {isScaleType && <span className={styles.optionValue}>{value}</span>}
                <span className={styles.optionLabel}>{label}</span>
              </>
            )}
          </motion.button>
        ))}
      </div>
      
      {isScale11 && (
        <div className={styles.scaleLabels}>
          <span>1 — Zdecydowanie nie</span>
          <span>10 — Zdecydowanie tak</span>
        </div>
      )}
    </motion.div>
  );
};

export default Question;
