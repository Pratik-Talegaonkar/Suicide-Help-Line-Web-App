import { GoogleGenerativeAI } from '@google/generative-ai';

// Vercel Serverless Function
export default async function handler(req, res) {
    // CORS Configuration
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

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

    const HIGH_RISK_KEYWORDS = [
        /i want to die/i,
        /kill myself/i,
        /suicide/i,
        /end my life/i,
        /hurt myself/i
    ];

    try {
        let isRiskDetected = false;
        for (const regex of HIGH_RISK_KEYWORDS) {
            if (regex.test(message)) {
                isRiskDetected = true;
                break;
            }
        }

        if (!process.env.GEMINI_API_KEY) {
            console.error('Error: GEMINI_API_KEY is missing.');
            return res.status(500).json({ error: 'Server Config Error: GEMINI_API_KEY is missing.' });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const { history } = req.body;

        // Convert frontend history to Gemini format if provided, otherwise standard start
        let chatHistory = [
            {
                role: "user",
                parts: [{ text: SYSTEM_INSTRUCTION }]
            },
            {
                role: "model",
                parts: [{ text: "I understand. I will be warm, human, and supportive." }]
            }
        ];

        if (history && Array.isArray(history)) {
            // Map simple {role: 'user'|'model', text: '...'} to Gemini format
            const formattedHistory = history.map(msg => ({
                role: msg.isUser ? "user" : "model",
                parts: [{ text: msg.text }]
            }));
            chatHistory = [...chatHistory, ...formattedHistory];
        }

        const chat = model.startChat({
            history: chatHistory,
            generationConfig: {
                maxOutputTokens: 300,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const botReply = response.text();

        res.status(200).json({
            reply: botReply,
            isRiskDetected: isRiskDetected
        });

    } catch (error) {
        console.error('Error calling Gemini:', error);
        res.status(500).json({
            error: `Gemini API Error: ${error.message}`,
            reply: "I'm having a little trouble connecting right now."
        });
    }
}
