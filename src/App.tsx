/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { INITIAL_WORDS } from './constants';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  const currentCard = INITIAL_WORDS[currentIndex];

  const handleNext = () => {
    if (currentIndex < INITIAL_WORDS.length - 1) {
      setDirection(1);
      setIsFlipped(false);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setIsFlipped(false);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSelectWord = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setIsFlipped(false);
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12" id="app-container">
      <header className="mb-10 text-center" id="app-header">
        <h1 className="text-2xl font-normal tracking-wider mb-2" id="main-title">Franse Woordjes</h1>
        <p className="text-sm text-natural-muted" id="sub-title">Oefening {currentIndex + 1} van {INITIAL_WORDS.length}</p>
      </header>

      <main className="w-full max-w-[500px] flex flex-col items-center" id="main-content">
        {/* Progress Bar */}
        <div className="w-48 h-1 bg-[#E0DCD3] rounded-full mb-12 overflow-hidden" id="progress-container">
          <motion.div 
            className="bg-natural-sage h-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / INITIAL_WORDS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
            id="progress-bar"
          />
        </div>

        {/* Flashcard */}
        <div className="relative w-full aspect-[5/3.2] perspective-1000" id="card-holder">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentCard.id}
              custom={direction}
              variants={{
                enter: (dir: number) => ({
                  x: dir > 0 ? 100 : -100,
                  opacity: 0,
                }),
                center: {
                  zIndex: 1,
                  x: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                  }
                },
                exit: (dir: number) => ({
                  zIndex: 0,
                  x: dir < 0 ? 100 : -100,
                  opacity: 0,
                  transition: {
                    duration: 0.2
                  }
                })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 cursor-pointer"
              onClick={handleFlip}
              id={`card-${currentCard.id}`}
            >
              <div className="w-full h-full relative preserve-3d" style={{ transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)', transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                {/* Front Side (Dutch) */}
                <div className="absolute inset-0 backface-hidden bg-white rounded-[24px] shadow-[0_12px_30px_rgba(139,157,119,0.1)] border border-natural-line flex flex-col items-center justify-center p-8 text-center" style={{ backfaceVisibility: 'hidden' }}>
                  <span className="text-[14px] uppercase tracking-[2px] text-natural-muted mb-3 font-serif" id="front-label">Nederlands</span>
                  <h2 className="text-5xl sm:text-6xl font-normal text-natural-main" id="dutch-word">{currentCard.dutch}</h2>
                  <p className="absolute bottom-6 italic text-[13px] text-natural-muted" id="flip-hint">
                    Klik op de kaart om de vertaling te zien
                  </p>
                </div>

                {/* Back Side (French) */}
                <div className="absolute inset-0 backface-hidden bg-white rounded-[24px] shadow-[0_12px_30px_rgba(139,157,119,0.1)] border border-natural-sage border-opacity-30 flex flex-col items-center justify-center p-8 text-center rotate-y-180" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <span className="text-[14px] uppercase tracking-[2px] text-natural-sage text-opacity-80 mb-3 font-serif" id="back-label">Frans</span>
                  <h2 className="text-5xl sm:text-6xl font-normal text-natural-sage" id="french-word">{currentCard.french}</h2>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-12 flex items-center justify-center gap-4 w-full" id="controls">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-8 py-3 rounded-full border-[1.5px] border-natural-sage text-natural-sage font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-natural-sage hover:text-white transition-all shadow-sm flex items-center gap-2"
            id="prev-button"
          >
            <ChevronLeft size={18} /> Vorige
          </button>

          <button
            onClick={handleFlip}
            className="px-10 py-3 rounded-full bg-natural-sage text-white font-semibold hover:bg-opacity-90 transition-all shadow-md"
            id="middle-button"
          >
            {isFlipped ? "Toon Woord" : "Toon Vertaling"}
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === INITIAL_WORDS.length - 1}
            className="px-8 py-3 rounded-full border-[1.5px] border-natural-sage text-natural-sage font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-natural-sage hover:text-white transition-all shadow-sm flex items-center gap-2"
            id="next-button"
          >
            Volgende <ChevronRight size={18} />
          </button>
        </div>

        {/* Word List Navigator (Footer List) */}
        <div className="mt-16 flex flex-wrap gap-4 justify-center" id="word-list-navigator">
          {INITIAL_WORDS.map((word, idx) => (
            <button
              key={word.id}
              onClick={() => handleSelectWord(idx)}
              className={`text-[12px] px-3 py-1.5 rounded-lg border transition-all ${
                idx === currentIndex 
                  ? 'border-natural-sage text-natural-main bg-white shadow-sm' 
                  : 'border-transparent text-natural-muted bg-[#EDE9E2] hover:bg-white/50'
              }`}
              id={`nav-item-${idx}`}
            >
              {idx + 1}. {word.dutch}
            </button>
          ))}
        </div>

        {currentIndex === INITIAL_WORDS.length - 1 && isFlipped && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => {
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="mt-8 flex items-center gap-2 text-natural-muted hover:text-natural-sage transition-colors text-sm italic"
            id="reset-button"
          >
            <RotateCcw size={16} /> Opnieuw beginnen
          </motion.button>
        )}
      </main>
    </div>
  );
}
