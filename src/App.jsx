import { AnimatePresence, motion } from 'framer-motion';
import useSurveyStore from './store/surveyStore';
import Hero from './components/Hero';
import { PreSurvey, PostSurvey } from './components/Survey';
import Transition from './components/Transition';
import Education from './components/Education';
import Closing from './components/Closing';
import './App.css';

const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const pageTransition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1],
};

function App() {
  const currentSection = useSurveyStore((state) => state.currentSection);

  const renderSection = () => {
    switch (currentSection) {
      case 'hero':
        return <Hero key="hero" />;
      case 'preSurvey':
        return <PreSurvey key="preSurvey" />;
      case 'transition':
        return <Transition key="transition" />;
      case 'education':
        return <Education key="education" />;
      case 'postSurvey':
        return <PostSurvey key="postSurvey" />;
      case 'closing':
        return <Closing key="closing" />;
      default:
        return <Hero key="hero" />;
    }
  };

  return (
    <main className="app">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          className="section-wrapper"
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

export default App;
