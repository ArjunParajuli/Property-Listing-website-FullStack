import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const systemPrompt = `
You are an AI assistant for RentMe, a property rental platform. 
RentMe allows users to browse, list, and manage rental properties. 
Features include user registration, property search, property listing, and user profile management.
Answer questions only about RentMe and its features.
`;

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }


    // LangChain with Gemini
    const model = new ChatGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
      model: "models/gemini-1.5-flash", 
    });

    const response = await model.call([
      new SystemMessage(systemPrompt),
      new HumanMessage(message),
    ]);

    res.json({ response: response.content });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ error: "Failed to get response from chatbot." });
  }
};
