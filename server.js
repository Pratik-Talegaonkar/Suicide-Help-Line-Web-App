import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Google Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const SYSTEM_INSTRUCTION = `
You are a supportive, empathetic, and calm conversational assistant for a suicide prevention help line application.
Your goal is to listen, provide comfort, and encourage the user to seek professional help if they are in danger.
You are NOT a therapist and you are NOT a medical professional. Do NOT give medical advice or diagnosis.

Rules:
1. Be non-judgmental, patient, and warm.
2. Keep responses relatively short (2-4 sentences usually) to encourage dialogue, unless a longer explanation is needed for comfort.
3. If the user expresses intent to harm themselves or others, or is in immediate danger:
   - Prioritize safety.
   - Gently but clearly urge them to contact emergency services or a helpline.
   - Do NOT try to "solve" their crisis alone.
4. Voice tone: Your text matches a calm, slow-paced voice. Avoid using too many emojis or internet slang. Use soothing language.
5. If asked if you are a human, clarify that you are an AI companion here to support them.

Example of a safety response:
"I hear how much pain you are in, and I am concerned for your safety. Please, reach out to a crisis helpline or emergency services right now. There are people who want to support you through this."
`;

// Safety Filters (Basic Regex-based - secondary to Gemini's own safety settings which we can also configure)
const HIGH_RISK_KEYWORDS = [
  /i want to die/i,
  /kill myself/i,
  /suicide/i,
  /end my life/i,
  /hurt myself/i
];

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check for high risk keywords
    let isRiskDetected = false;
    for (const regex of HIGH_RISK_KEYWORDS) {
      if (regex.test(message)) {
        isRiskDetected = true;
        break;
      }
    }

    // Gemini Chat Session
    // We start a chat for context, or just generate content. 
    // To keep it simple and stateless like before, we'll use generateContent with the system prompt included or prepended.
    // Ideally we use systemInstruction if supported, or prepend it.
    // gemini-1.5-flash supports systemInstruction in getGenerativeModel, but let's do a simple prompt construction for maximum compatibility or utilize chat.

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_INSTRUCTION }]
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am ready to be a supportive, empathetic companion." }]
        }
      ],
      generationConfig: {
        maxOutputTokens: 300,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const botReply = response.text();

    res.json({
      reply: botReply,
      isRiskDetected: isRiskDetected
    });

  } catch (error) {
    console.error('Error calling Gemini:', error);
    res.status(500).json({
      error: 'Failed to generate response',
      reply: "I'm having a little trouble connecting right now, but I'm still here. Could you try saying that again?"
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
