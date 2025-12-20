import { motion } from 'framer-motion';
import styles from './Survey.module.css';

const Question = ({ 
  question, 
  options, 
  selectedAnswer, 
  onSelect, 
  type = 'scale' // 'scale' | 'single'
}) => {
  const isScaleType = type === 'scale';
  const optionEntries = Object.entries(options);

  return (
    <motion.div
      className={styles.questionCard}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <h3 className={styles.questionText}>{question}</h3>
      
      <div className={isScaleType ? styles.scaleOptions : styles.singleOptions}>
        {optionEntries.map(([value, label], index) => (
          <motion.button
            key={value}
            className={`${styles.optionButton} ${selectedAnswer === value ? styles.selected : ''}`}
            onClick={() => onSelect(value)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isScaleType && <span className={styles.optionValue}>{value}</span>}
            <span className={styles.optionLabel}>{label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Question;
