import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 space-y-6 animate-pulse">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-history-accent rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">⏳</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-serif font-bold text-history-dark">
          Анализируем историю...
        </h2>
        <p className="text-gray-600">
          Изучаем твои ответы, сверяем с архивами и консультируемся с духами предков.
        </p>
      </div>
    </div>
  );
};