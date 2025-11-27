import React, { useState } from 'react';
import { UserInfo } from '../types';

interface UserInfoFormProps {
  onSubmit: (info: UserInfo) => void;
}

export const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    // Простая, но эффективная регулярка для проверки email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Сброс ошибки перед проверкой
    setEmailError('');

    if (!validateEmail(email)) {
      setEmailError('Пожалуйста, введите корректный адрес электронной почты.');
      return;
    }

    if (name && email && age && grade) {
      onSubmit({ name, email, age, grade });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(''); // Убираем ошибку при вводе
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 animate-fade-in-up">
      <div className="bg-white rounded-xl shadow-xl border border-history-gold/20 p-8">
        <h2 className="text-2xl font-serif font-bold text-history-dark mb-6 text-center">
          Давайте знакомиться
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Чтобы подобрать идеальную профессию, нам нужно немного узнать о тебе.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-history-dark mb-2">
              Твое имя
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Иван Иванов"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-history-gold focus:ring-history-gold outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-history-dark mb-2">
              Электронная почта
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                placeholder="ivan@example.com"
                className={`w-full p-3 border-2 rounded-lg outline-none transition-colors ${
                  emailError 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-history-gold focus:ring-history-gold'
                }`}
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">
                  {emailError}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-history-dark mb-2">
                Возраст
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                placeholder="15"
                min="10"
                max="100"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-history-gold focus:ring-history-gold outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-history-dark mb-2">
                Класс
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-history-gold focus:ring-history-gold outline-none transition-colors bg-white"
              >
                <option value="" disabled>Выбери...</option>
                <option value="9">9 класс</option>
                <option value="10">10 класс</option>
                <option value="11">11 класс</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-history-dark text-history-paper font-bold text-lg rounded-lg shadow-md hover:bg-history-accent transition-all duration-300 transform hover:-translate-y-1 mt-4"
          >
            Перейти к вопросам
          </button>
        </form>
      </div>
    </div>
  );
};