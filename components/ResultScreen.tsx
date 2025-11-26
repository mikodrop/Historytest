import React from 'react';
import { CareerResult } from '../types';

interface ResultScreenProps {
  result: CareerResult;
  onRetry: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRetry }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in-up">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-t-8 border-history-accent">
        
        {/* Header */}
        <div className="bg-history-paper p-8 text-center border-b border-history-gold/20">
          <p className="text-sm font-bold text-history-accent tracking-widest uppercase mb-2">
            Твое призвание
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-history-dark mb-4">
            {result.title}
          </h1>
          <p className="text-xl text-gray-700 italic">
            "{result.specialization}"
          </p>
        </div>

        <div className="p-8 md:p-12 space-y-10">
          
          {/* Main Description */}
          <section>
            <h3 className="text-2xl font-serif font-bold text-history-dark mb-4 flex items-center">
              <span className="bg-history-gold/20 p-2 rounded-lg mr-3">📜</span>
              О профессии
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              {result.description}
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Strengths */}
            <section className="bg-green-50 p-6 rounded-xl border border-green-100">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <span className="mr-2">💪</span> Твои сильные стороны
              </h3>
              <ul className="space-y-2">
                {result.strengths.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Growth Areas */}
            <section className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="mr-2">📚</span> Что стоит изучить
              </h3>
              <ul className="space-y-2">
                {result.skillsToDevelop.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Famous Figure */}
          <section className="bg-history-dark text-history-paper p-6 rounded-xl flex flex-col md:flex-row items-center md:justify-between shadow-lg">
            <div className="mb-4 md:mb-0">
              <h4 className="text-sm uppercase tracking-wider text-history-gold mb-1">Пример для подражания</h4>
              <p className="text-2xl font-serif font-bold">{result.famousFigure}</p>
            </div>
            <div className="text-4xl opacity-50">🏛️</div>
          </section>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-sm text-blue-800">
            ℹ️ Твои результаты автоматически сохранены и отправлены администратору для анализа.
          </div>

        </div>
        
        {/* Footer Actions */}
        <div className="bg-gray-50 p-6 flex flex-col md:flex-row justify-center items-center gap-4 border-t border-gray-200">
          <button
            onClick={onRetry}
            className="w-full md:w-auto px-8 py-3 bg-history-dark text-white font-bold rounded-lg hover:bg-history-accent transition-colors shadow-lg"
          >
            Пройти тест заново
          </button>
        </div>
      </div>
    </div>
  );
};