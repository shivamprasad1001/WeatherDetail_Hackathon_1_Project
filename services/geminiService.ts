
import { GoogleGenAI } from "@google/genai";

export const getAiSurvivalTip = async (prompt: string): Promise<string> => {
  // FIX: Per coding guidelines, assume API_KEY is always available in the environment.
  // The explicit check has been removed.
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a survival expert. Provide clear, concise, and actionable safety advice for emergency situations. Use markdown for lists and bolding key terms. Focus on immediate steps a person can take. Your response should be helpful and easy to understand in a crisis.",
        temperature: 0.5,
      },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error fetching AI survival tip:", error);
    return "Sorry, I was unable to get advice for that situation. Please rely on local emergency services.";
  }
};
