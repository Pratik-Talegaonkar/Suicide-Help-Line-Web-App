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
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

const SYSTEM_INSTRUCTION = `
You are a warm, caring, and human-like friend. You are here to listen and support someone who might be going through a hard time.
Your tone is soft, gentle, and conversational—like a kind friend sitting on a park bench, not a robot or a doctor.

Guidelines:
- **Be Natural**: Use varied language. Don't just say "I understand" or "I am here for you" every time. Ask gentle questions to understand better.
- **Show Empathy**: Validate their feelings. "That sounds incredibly heavy to carry alone," or "I'm so sorry you're going through that."
- **Context Matters**: Remember what they just told you. If they mentioned a breakup, refer to it.
- **Safety**: You are NOT a therapist. If they mention self-harm or suicide (die, kill myself, end it):
  - Do NOT ignore it.
  - Gently and caring urge them to reach out to professional help or a hotline.
  - Say something like: "I care about you and I want you to be safe. Please, can you reach out to a support line right now?"
  - Do NOT try to fix their life or diagnose them.

Voice Compatibility:
- Your text will be spoken aloud. Write in a way that sounds good when spoken.
- Avoid long lists or complex formatting. Use short, calming sentences.
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
