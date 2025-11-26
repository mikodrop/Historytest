import React, { useState, useCallback } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { UserInfoForm } from './components/UserInfoForm';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { QUESTIONS } from './constants';
import { AppState, UserAnswer, CareerResult, UserInfo } from './types';
import { analyzeResults } from './services/geminiService';
import { sendToTelegram } from './services/telegramService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [result, setResult] = useState<CareerResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startFlow = useCallback(() => {
    setAppState(AppState.USER_INFO);
    setError(null);
  }, []);

  const handleUserInfoSubmit = useCallback((info: UserInfo) => {
    setUserInfo(info);
    setAppState(AppState.QUIZ);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
  }, []);

  const handleAnswer = useCallback(async (selectedOption: string) => {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.text,
      selectedOption
    };

    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Finish quiz
      setAppState(AppState.ANALYZING);
      try {
        // 1. Get AI analysis
        const analysisResult = await analyzeResults(updatedAnswers);
        setResult(analysisResult);
        
        // 2. Auto send to Telegram (fire and forget, or wait? Let's wait to ensure it goes through)
        // We check if userInfo exists (it should), otherwise we pass dummy data
        if (userInfo) {
           await sendToTelegram(userInfo, analysisResult, updatedAnswers);
        }

        setAppState(AppState.RESULT);
      } catch (err) {
        console.error(err);
        setError("Произошла ошибка при анализе ответов. Пожалуйста, проверьте API ключ или попробуйте позже.");
        setAppState(AppState.ERROR);
      }
    }
  }, [currentQuestionIndex, userAnswers, userInfo]);

  const retryQuiz = useCallback(() => {
    setAppState(AppState.WELCOME);
    setResult(null);
    setUserAnswers([]);
    setUserInfo(null);
    setCurrentQuestionIndex(0);
  }, []);

  return (
    <div className="min-h-screen bg-history-paper font-sans text-history-dark selection:bg-history-accent selection:text-white">
      {/* Header/Nav */}
      <header className="bg-white shadow-sm border-b border-history-gold/30">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🏺</span>
            <span className="text-xl font-serif font-bold text-history-dark">ПрофОриентир</span>
          </div>
          {appState === AppState.QUIZ && (
            <div className="text-sm text-gray-500 hidden sm:block">
              Вопрос {currentQuestionIndex + 1} из {QUESTIONS.length}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {appState === AppState.WELCOME && (
          <WelcomeScreen onStart={startFlow} />
        )}

        {appState === AppState.USER_INFO && (
          <UserInfoForm onSubmit={handleUserInfoSubmit} />
        )}

        {appState === AppState.QUIZ && (
          <QuizScreen
            question={QUESTIONS[currentQuestionIndex]}
            currentNumber={currentQuestionIndex + 1}
            totalQuestions={QUESTIONS.length}
            onAnswer={handleAnswer}
          />
        )}

        {appState === AppState.ANALYZING && (
          <LoadingScreen />
        )}

        {appState === AppState.RESULT && result && (
          <ResultScreen 
            result={result} 
            onRetry={retryQuiz} 
          />
        )}

        {appState === AppState.ERROR && (
          <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-lg shadow-xl border-l-4 border-red-500 animate-fade-in">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Упс, что-то пошло не так</h2>
            <p className="text-gray-600 mb-6">{error || "Неизвестная ошибка"}</p>
            <button
              onClick={retryQuiz}
              className="px-6 py-2 bg-history-dark text-white rounded-lg hover:bg-history-accent transition-colors"
            >
              Попробовать снова
            </button>
          </div>
        )}
      </main>

      <footer className="text-center text-gray-400 text-sm py-8">
        © 2024 ПрофОриентир. Создано с помощью Gemini API.
      </footer>
    </div>
  );
};

export default App;