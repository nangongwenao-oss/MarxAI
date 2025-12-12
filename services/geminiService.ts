import { GoogleGenAI } from "@google/genai";
import { MARX_SYSTEM_INSTRUCTION } from "../constants";

let aiClient: GoogleGenAI | null = null;

// Initialize client securely (assuming env var is present as per guidelines)
const getClient = () => {
  if (!aiClient) {
    if (!process.env.API_KEY) {
      console.warn("API_KEY not found in environment variables");
      return null;
    }
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const streamMarxResponse = async (
  history: { role: string; text: string }[],
  userMessage: string,
  onChunk: (text: string) => void
) => {
  const client = getClient();
  if (!client) {
    onChunk("Error: API Key missing. Please check configuration.");
    return;
  }

  try {
    const chat = client.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: MARX_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessageStream({ message: userMessage });

    for await (const chunk of result) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    onChunk("\n[Connection Interrupted: The dialectical process encountered a network error.]");
  }
};
