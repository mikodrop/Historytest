import { CareerResult, UserAnswer, UserInfo } from '../types';

const BOT_TOKEN = '8357044106:AAFiDObGToWWm3H4YoEtcXru0Xo93Mg6yxk';
const ADMIN_CHAT_ID = '946055184';

export const sendToTelegram = async (userInfo: UserInfo, result: CareerResult, answers: UserAnswer[]): Promise<boolean> => {
  // Формируем текст с ответами
  const answerText = answers.map((a, i) => {
    return `${i + 1}. ${a.questionText}\n   🔹 Ответ: ${a.selectedOption}`;
  }).join('\n\n');

  // Формируем итоговое сообщение для админа
  const message = `
🔔 НОВЫЙ РЕЗУЛЬТАТ ТЕСТИРОВАНИЯ

👤 АНКЕТА УЧЕНИКА:
• Имя: ${userInfo.name}
• Email: ${userInfo.email}
• Класс: ${userInfo.grade}
• Возраст: ${userInfo.age}

================================

🏛 РЕЗУЛЬТАТ ПРОФОРИЕНТАЦИИ:
Профессия: ${result.title}
Специализация: ${result.specialization}

Описание:
${result.description}

Сильные стороны:
${result.strengths.join(', ')}

Что изучить:
${result.skillsToDevelop.join(', ')}

Пример: ${result.famousFigure}

================================

📋 ОТВЕТЫ ПОЛЬЗОВАТЕЛЯ:

${answerText}
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: ADMIN_CHAT_ID,
        text: message,
      }),
    });

    if (!response.ok) {
      console.error('Telegram API responded with:', await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to send to Telegram', error);
    return false;
  }
};