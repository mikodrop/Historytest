import React from 'react';
import { CareerResult } from '../types';

interface ResultScreenProps {
  result: CareerResult;
  onRetry: () => void;
}

const getProfessionIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('археолог')) return '⛏️';
  if (lowerTitle.includes('архивист') || lowerTitle.includes('архив')) return '📜';
  if (lowerTitle.includes('антрополог') || lowerTitle.includes('этнограф')) return '🗿';
  if (lowerTitle.includes('музей') || lowerTitle.includes('музеолог') || lowerTitle.includes('куратор')) return '🏛️';
  if (lowerTitle.includes('искусствовед')) return '🎨';
  if (lowerTitle.includes('политолог')) return '⚖️';
  if (lowerTitle.includes('преподаватель') || lowerTitle.includes('учитель')) return '👨‍🏫';
  if (lowerTitle.includes('реставратор')) return '🏺';
  if (lowerTitle.includes('генеалог')) return '🌳';
  return '📜'; // Default
};

const CareerPathVisualizer: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-4 space-y-4">
      {/* Step 1 */}
      <div className="flex flex-col items-center group">
        <div className="w-12 h-12 rounded-full bg-history-gold/20 flex items-center justify-center text-2xl mb-2 group-hover:bg-history-gold/40 transition-colors">
          🔍
        </div>
        <span className="text-xs font-bold text-history-dark uppercase tracking-wider">Исследование</span>
      </div>
      
      {/* Connector */}
      <div className="w-0.5 h-8 bg-history-gold/30"></div>

      {/* Step 2 */}
      <div className="flex flex-col items-center group">
        <div className="w-12 h-12 rounded-full bg-history-gold/20 flex items-center justify-center text-2xl mb-2 group-hover:bg-history-gold/40 transition-colors">
          🧠
        </div>
        <span className="text-xs font-bold text-history-dark uppercase tracking-wider">Анализ</span>
      </div>

      {/* Connector */}
      <div className="w-0.5 h-8 bg-history-gold/30"></div>

      {/* Step 3 */}
      <div className="flex flex-col items-center group">
        <div className="w-12 h-12 rounded-full bg-history-gold/20 flex items-center justify-center text-2xl mb-2 group-hover:bg-history-gold/40 transition-colors">
          🏛️
        </div>
        <span className="text-xs font-bold text-history-dark uppercase tracking-wider">Наследие</span>
      </div>
    </div>
  );
};


export const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRetry }) => {
  const professionIcon = getProfessionIcon(result.title);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in-up">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-t-8 border-history-accent">
        
        {/* Header */}
        <div className="bg-history-paper p-8 text-center border-b border-history-gold/20 relative overflow-hidden">
           {/* Subtle pattern for header */}
           <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')",
            }}
           ></div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-history-accent tracking-widest uppercase mb-2">
              Твое призвание
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-history-dark mb-4 flex items-center justify-center gap-4 flex-wrap">
              <span className="text-5xl filter drop-shadow-sm">{professionIcon}</span>
              <span>{result.title}</span>
            </h1>
            <p className="text-xl text-gray-700 italic">
              "{result.specialization}"
            </p>
          </div>
        </div>

        <div className="p-8 md:p-12 space-y-10">
          
          {/* Main Description with Visualizer */}
          <section className="grid md:grid-cols-[1fr_auto] gap-8 items-stretch">
            <div className="relative rounded-xl overflow-hidden border-2 border-history-gold/30 shadow-lg group h-full">
              {/* Background Image Layer */}
              <div 
                className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1524666643752-b381eb00effb?q=80&w=2071&auto=format&fit=crop')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.25,
                  filter: 'sepia(0.3) contrast(1.1)'
                }}
              />
              <div className="absolute inset-0 bg-history-paper/40 z-0"></div>

              {/* Content Layer */}
              <div className="relative z-10 p-8">
                <h3 className="text-2xl font-serif font-bold text-history-dark mb-4 flex items-center">
                  <span className="bg-white/80 p-2 rounded-lg mr-3 shadow-sm text-2xl">📜</span>
                  О профессии
                </h3>
                <p className="text-lg text-gray-900 leading-relaxed whitespace-pre-line font-medium drop-shadow-sm">
                  {result.description}
                </p>
              </div>
            </div>

            {/* Visualizer Column (Hidden on mobile, visible on medium screens) */}
            <div className="hidden md:block bg-history-paper/50 rounded-xl border border-history-gold/20 px-6">
              <CareerPathVisualizer />
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Strengths */}
            <section className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <span className="mr-2 text-2xl">💪</span> Твои сильные стороны
              </h3>
              <ul className="space-y-3">
                {result.strengths.map((item, idx) => (
                  <li key={idx} className="flex items-start bg-white/60 p-2 rounded-lg">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span className="text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Growth Areas */}
            <section className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="mr-2 text-2xl">📚</span> Что стоит изучить
              </h3>
              <ul className="space-y-3">
                {result.skillsToDevelop.map((item, idx) => (
                  <li key={idx} className="flex items-start bg-white/60 p-2 rounded-lg">
                    <span className="text-blue-600 mr-2 mt-1">➜</span>
                    <span className="text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Famous Figure */}
          <section className="bg-history-dark text-history-paper p-8 rounded-xl flex flex-col md:flex-row items-center md:justify-between shadow-lg relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-400 via-transparent to-transparent"></div>
            <div className="relative z-10 mb-4 md:mb-0 text-center md:text-left">
              <h4 className="text-xs uppercase tracking-[0.2em] text-history-gold mb-2">Пример для подражания</h4>
              <p className="text-3xl font-serif font-bold text-white tracking-wide">{result.famousFigure}</p>
            </div>
            <div className="text-5xl opacity-80 relative z-10 filter drop-shadow-lg">🏛️</div>
          </section>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-sm text-blue-800 flex items-center">
            <span className="text-xl mr-3">ℹ️</span>
            Твои результаты автоматически сохранены и отправлены администратору для анализа.
          </div>

        </div>
        
        {/* Footer Actions */}
        <div className="bg-gray-50 p-8 flex flex-col md:flex-row justify-center items-center gap-4 border-t border-gray-200">
          <button
            onClick={onRetry}
            className="w-full md:w-auto px-8 py-3 bg-history-dark text-white font-bold rounded-lg hover:bg-history-accent hover:-translate-y-0.5 transition-all duration-300 shadow-lg flex items-center justify-center"
          >
            <span className="mr-2">↺</span> Пройти тест заново
          </button>
        </div>
      </div>
    </div>
  );
};