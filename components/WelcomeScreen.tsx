import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-4 md:p-8 animate-fade-in relative">
      
      {/* Decorative Background Element */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center overflow-hidden">
        <div className="text-[20rem] md:text-[30rem]">🏛️</div>
      </div>

      <div className="relative z-10 max-w-4xl w-full bg-white/60 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-2xl border-double border-4 border-history-gold/40">
        
        {/* Header Section */}
        <div className="space-y-6 mb-12">
          <div className="flex justify-center mb-4">
            <span className="text-6xl md:text-7xl filter drop-shadow-md">📜</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-history-dark tracking-tight leading-tight">
            Твой путь в <span className="text-history-accent">Истории</span>
          </h1>
          <div className="w-24 h-1 bg-history-gold mx-auto rounded-full"></div>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
            Кем тебе суждено стать: искателем древних артефактов в пустыне, хранителем королевских архивов или исследователем забытых культур?
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-history-paper rounded-xl border border-history-gold/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">🧩</div>
            <h3 className="font-bold text-history-dark mb-1">20 Вопросов</h3>
            <p className="text-sm text-gray-600">Глубокий тест, охватывающий интересы и навыки.</p>
          </div>
          <div className="p-6 bg-history-paper rounded-xl border border-history-gold/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">🧠</div>
            <h3 className="font-bold text-history-dark mb-1">ИИ Анализ</h3>
            <p className="text-sm text-gray-600">Нейросеть составит твой уникальный профиль.</p>
          </div>
          <div className="p-6 bg-history-paper rounded-xl border border-history-gold/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold text-history-dark mb-1">Твой Путь</h3>
            <p className="text-sm text-gray-600">Узнай специализацию и получи советы.</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="space-y-4">
          <button
            onClick={onStart}
            className="group relative px-10 py-5 bg-history-dark text-history-paper font-serif font-bold text-xl rounded-lg shadow-xl hover:bg-history-accent transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Начать исследование
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-4">
            Время прохождения: ~5 минут
          </p>
        </div>

      </div>
    </div>
  );
};