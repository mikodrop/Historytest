import React, { useState, useEffect, useRef } from 'react';
import { Question } from '../types';

interface QuizScreenProps {
  question: Question;
  currentNumber: number;
  totalQuestions: number;
  onAnswer: (option: string) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  question,
  currentNumber,
  totalQuestions,
  onAnswer,
}) => {
  const [textAnswer, setTextAnswer] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Reset text answer when question changes
  useEffect(() => {
    setTextAnswer('');
    if (question.type === 'text' && textareaRef.current) {
      // Small timeout to ensure render is complete before focus
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [question]);

  const progress = ((currentNumber - 1) / totalQuestions) * 100;

  const handleSubmitText = () => {
    if (textAnswer.trim()) {
      onAnswer(textAnswer.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitText();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-fade-in">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
          <span>Вопрос {currentNumber} из {totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-history-accent h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-history-gold/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-history-gold via-history-accent to-history-gold"></div>
        
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-history-dark mb-8 leading-tight">
          {question.text}
        </h2>

        {question.type === 'choice' && question.options ? (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswer(option)}
                className="w-full text-left p-4 rounded-lg border-2 border-gray-100 hover:border-history-gold hover:bg-history-paper/50 transition-all duration-200 group flex items-center"
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 font-bold mr-4 group-hover:bg-history-gold group-hover:text-white transition-colors">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-lg text-gray-800">{option}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in-up">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Введите ваш ответ здесь..."
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-history-gold focus:ring-1 focus:ring-history-gold outline-none min-h-[140px] resize-none bg-history-paper/30 text-lg text-history-dark placeholder-gray-400"
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                Shift + Enter для переноса строки
              </div>
            </div>
            
            <button
              onClick={handleSubmitText}
              disabled={!textAnswer.trim()}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 transform ${
                textAnswer.trim()
                  ? 'bg-history-dark text-history-paper hover:bg-history-accent hover:-translate-y-1 shadow-md'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Подтвердить ответ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};