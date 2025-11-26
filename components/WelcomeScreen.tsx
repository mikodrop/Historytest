import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-history-dark">
          Твой путь в Истории
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Ты выбрал историю, но не знаешь, кем стать? Археологом, стирающим пыль веков, или архивистом, хранящим тайны государств?
        </p>
        <p className="text-md text-history-accent font-medium">
          Пройди тест из 15 вопросов, и Искусственный Интеллект подскажет твое призвание.
        </p>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-xl border-2 border-history-gold/30 max-w-lg">
        <h3 className="text-lg font-semibold mb-2">Как это работает?</h3>
        <ul className="text-left text-sm text-gray-600 space-y-2 list-disc list-inside">
          <li>Отвечай честно — правильных ответов нет.</li>
          <li>Мы проанализируем твои предпочтения.</li>
          <li>ИИ подберет идеальную профессию и даст советы.</li>
        </ul>
      </div>

      <button
        onClick={onStart}
        className="group relative px-8 py-4 bg-history-dark text-history-paper font-bold text-lg rounded-full shadow-lg hover:bg-history-accent transition-all duration-300 transform hover:-translate-y-1"
      >
        <span className="absolute inset-0 w-full h-full rounded-full border-2 border-history-gold opacity-50 group-hover:animate-ping"></span>
        Начать путешествие
      </button>
    </div>
  );
};