import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Survey.module.css";

const Question = ({
  question,
  options,
  selectedAnswer,
  onSelect,
  type = "scale", // 'scale' | 'single' | 'scale10' | 'multiple'
  scaleLabel,
  otherAllowsInput = false,
  otherPlaceholder = "",
}) => {
  const isScale10 = type === "scale10";
  const isScaleType = type === "scale";
  const isMultiple = type === "multiple";

  // For multiple choice, selectedAnswer is an object: { selected: string[], otherText: string }
  const selectedValues = isMultiple
    ? selectedAnswer?.selected || []
    : selectedAnswer;
  const otherText = isMultiple ? selectedAnswer?.otherText || "" : "";

  const [localOtherText, setLocalOtherText] = useState(otherText);

  useEffect(() => {
    setLocalOtherText(otherText);
  }, [otherText]);

  // For scale10, generate 1-10 options
  const optionEntries = isScale10
    ? Array.from({ length: 10 }, (_, i) => [String(i + 1), String(i + 1)])
    : Object.entries(options || {});

  const isSelected = (value) => {
    if (isMultiple) {
      return selectedValues.includes(value);
    }
    return selectedAnswer === value;
  };

  const handleMultipleSelect = (value) => {
    const currentSelected = selectedValues || [];
    let newSelected;

    if (currentSelected.includes(value)) {
      newSelected = currentSelected.filter((v) => v !== value);
    } else {
      newSelected = [...currentSelected, value];
    }

    onSelect({
      selected: newSelected,
      otherText:
        value === "other" || newSelected.includes("other")
          ? localOtherText
          : "",
    });
  };

  const handleOtherTextChange = (e) => {
    const newText = e.target.value;
    setLocalOtherText(newText);

    // Ensure 'other' is selected when typing
    const currentSelected = selectedValues || [];
    if (!currentSelected.includes("other")) {
      onSelect({ selected: [...currentSelected, "other"], otherText: newText });
    } else {
      onSelect({ selected: currentSelected, otherText: newText });
    }
  };

  const handleClick = (value) => {
    if (isMultiple) {
      handleMultipleSelect(value);
    } else {
      onSelect(value);
    }
  };

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

      <div
        className={
          isScale10
            ? styles.scale10Options
            : isScaleType
              ? styles.scaleOptions
              : styles.singleOptions
        }
      >
        {optionEntries.map(([value, label], index) => (
          <>
            <motion.button
              key={value}
              className={`${styles.optionButton} ${isScale10 ? styles.scale10Button : ""} ${isMultiple ? styles.multipleButton : ""} ${isSelected(value) ? styles.selected : ""}`}
              onClick={() => handleClick(value)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
            >
              {isScale10 ? (
                <span className={styles.scale10Value}>{value}</span>
              ) : (
                <>
                  {isMultiple && (
                    <span
                      className={`${styles.checkbox} ${isSelected(value) ? styles.checkboxSelected : ""}`}
                    >
                      {isSelected(value) && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </span>
                  )}
                  {isScaleType && (
                    <span className={styles.optionValue}>{value}</span>
                  )}
                  <span className={styles.optionLabel}>{label}</span>
                </>
              )}
            </motion.button>
            {isMultiple &&
              value === "other" &&
              otherAllowsInput &&
              isSelected("other") && (
                <motion.div
                  className={styles.otherInputWrapper}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="text"
                    className={styles.otherInput}
                    placeholder={otherPlaceholder}
                    value={localOtherText}
                    onChange={handleOtherTextChange}
                    autoFocus
                  />
                </motion.div>
              )}
          </>
        ))}
      </div>

      {isScale10 && (
        <div className={styles.scaleLabels}>
          <span>1 — Zdecydowanie nie</span>
          <span>10 — Zdecydowanie tak</span>
        </div>
      )}
    </motion.div>
  );
};

export default Question;
