import { GoogleGenAI, Type } from "@google/genai";
import { UserAnswer, CareerResult } from '../types';

export const analyzeResults = async (answers: UserAnswer[]): Promise<CareerResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  const prompt = `
    Проанализируй ответы школьника 9-11 классов, который увлекается историей, и определи наиболее подходящую для него историческую профессию.
    
    Список возможных профессий для выбора (выбери одну лучшую):
    - Археолог
    - Историк-архивист
    - Социальный антрополог / Этнограф
    - Музейный куратор / Музеолог
    - Искусствовед
    - Историк-политолог
    - Преподаватель истории
    - Реставратор
    - Специалист по генеалогии
    
    Вот ответы пользователя:
    ${answers.map(a => `- Вопрос: "${a.questionText}" | Ответ: "${a.selectedOption}"`).join('\n')}
    
    Основываясь на этих ответах, составь психологический портрет и дай рекомендацию.
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: "Название профессии (например, Археолог)",
      },
      specialization: {
        type: Type.STRING,
        description: "Узкая специализация или направление (например, Полевая археология античности)",
      },
      description: {
        type: Type.STRING,
        description: "Подробное описание профессии и почему она подходит именно этому пользователю (минимум 3 предложения).",
      },
      strengths: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "3-4 сильные стороны пользователя, выявленные из ответов.",
      },
      skillsToDevelop: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "3 совета, что стоит изучить или развить (например, учить латынь, освоить GIS).",
      },
      famousFigure: {
        type: Type.STRING,
        description: "Имя известного реального представителя этой профессии или исторического деятеля, близкого по духу.",
      },
    },
    required: ["title", "specialization", "description", "strengths", "skillsToDevelop", "famousFigure"],
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as CareerResult;
    } else {
      throw new Error("Empty response from AI");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};