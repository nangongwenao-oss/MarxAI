import React, { useState } from 'react';
import { MOCK_VOCAB } from '../constants';
import { CheckCircle, HelpCircle, RotateCw } from 'lucide-react';

export const VocabQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const currentCard = MOCK_VOCAB[currentIndex];

  const handleNext = (status: 'learned' | 'fuzzy') => {
    // In a real app, send status to API
    console.log(`Card ${currentCard.id} marked as ${status}`);
    
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_VOCAB.length);
    }, 200);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-[#151A21]">
      <div className="w-full max-w-md mb-6 flex justify-between items-center text-gray-400 text-sm font-mono">
        <span>CARD {currentIndex + 1} / {MOCK_VOCAB.length}</span>
        <span>SESSION: DAILY_01</span>
      </div>

      {/* 3D Flip Card Container */}
      <div 
        className="relative w-full max-w-md h-80 perspective-1000 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full text-center transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-[#1E242C] border-2 border-[#CC3333] rounded-xl shadow-[0_0_20px_rgba(204,51,51,0.2)] flex flex-col items-center justify-center p-8">
            <h2 className="text-3xl font-bold text-[#E0E0E0] mb-4 font-serif">{currentCard.term.split(' ')[0]}</h2>
            <p className="text-xl text-[#CC3333] font-mono">{currentCard.term.split(' ').slice(1).join(' ')}</p>
            <div className="absolute bottom-6 text-xs text-gray-500 flex items-center gap-2">
               <RotateCw size={12} /> TAP TO REVEAL
            </div>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#1E242C] border border-[#333] rounded-xl flex flex-col items-center justify-center p-8 shadow-2xl">
            <div className="overflow-y-auto max-h-full">
                <p className="text-lg text-gray-200 mb-6 leading-relaxed font-serif">
                "{currentCard.definition}"
                </p>
                <div className="inline-block px-3 py-1 bg-[#CC3333] bg-opacity-10 border border-[#CC3333] rounded text-xs text-[#CC3333] font-bold">
                {currentCard.citation}
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-12 w-full max-w-md">
        <button 
          onClick={(e) => { e.stopPropagation(); handleNext('fuzzy'); }}
          className="flex-1 flex flex-col items-center justify-center p-4 bg-[#2A3038] hover:bg-[#333] rounded-lg border border-[#444] transition-all"
        >
          <HelpCircle className="text-yellow-500 mb-2" />
          <span className="text-sm font-bold text-gray-300">Fuzzy</span>
        </button>
        <button 
           onClick={(e) => { e.stopPropagation(); handleNext('learned'); }}
           className="flex-1 flex flex-col items-center justify-center p-4 bg-[#CC3333] hover:bg-[#A32929] rounded-lg shadow-lg transition-all"
        >
          <CheckCircle className="text-white mb-2" />
          <span className="text-sm font-bold text-white">Learned</span>
        </button>
      </div>
    </div>
  );
};
