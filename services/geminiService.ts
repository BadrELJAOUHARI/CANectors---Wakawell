import { GoogleGenAI } from "@google/genai";
import { FAQ_DATA, SYSTEM_PROMPT } from "../data/faqData";
import { FAQEntry, Language } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const findFAQMatch = (query: string, language: Language): FAQEntry | null => {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Filter by language first
  const langFAQs = FAQ_DATA.filter(f => f.language === language);

  // 1. Exact variant match
  const exactMatch = langFAQs.find(faq => 
    faq.question_variants.some(v => v.toLowerCase() === normalizedQuery)
  );
  if (exactMatch) return exactMatch;

  // 2. Fuzzy match (query contains variant or variant contains query - simplified)
  // In a real app, use a proper fuzzy search library or embedding comparison.
  const fuzzyMatch = langFAQs.find(faq => 
    faq.question_variants.some(v => normalizedQuery.includes(v.toLowerCase()) || v.toLowerCase().includes(normalizedQuery))
  );

  return fuzzyMatch || null;
};

export const generateAIResponse = async (query: string, language: Language): Promise<string> => {
  try {
    const modelId = "gemini-3-pro-preview";
    
    // Construct a prompt that enforces the language
    const languageInstruction = `The user is currently speaking in ${language === 'fr' ? 'French' : language === 'ar' ? 'Arabic' : 'English'}. Respond in that language.`;
    
    const response = await ai.models.generateContent({
      model: modelId,
      contents: query,
      config: {
        systemInstruction: `${SYSTEM_PROMPT}\n${languageInstruction}`,
        temperature: 0.7, // Balanced creativity and accuracy
      }
    });

    return response.text || "I'm having trouble connecting to the stadium network. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'fr' 
      ? "Désolé, je ne peux pas répondre pour le moment. Veuillez réessayer." 
      : language === 'ar'
      ? "عذراً، لا أستطيع الإجابة حالياً. يرجى المحاولة مرة أخرى."
      : "Sorry, I can't answer right now. Please try again.";
  }
};