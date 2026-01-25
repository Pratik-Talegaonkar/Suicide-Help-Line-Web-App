import OpenAI from 'openai';

// Vercel Serverless Function
export default async function handler(req, res) {
    // CORS Configuration
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust this for production if needed
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request
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

    // System Prompt & Safety Logic (Mirrors server.js)
    const SYSTEM_PROMPT = `
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

    const HIGH_RISK_KEYWORDS = [
        /i want to die/i,
        /kill myself/i,
        /suicide/i,
        /end my life/i,
        /hurt myself/i
    ];

    try {
        // Check for high risk keywords
        let isRiskDetected = false;
        for (const regex of HIGH_RISK_KEYWORDS) {
            if (regex.test(message)) {
                isRiskDetected = true;
                break;
            }
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: message },
            ],
            temperature: 0.7,
            max_tokens: 300,
        });

        const botReply = completion.choices[0].message.content;

        res.status(200).json({
            reply: botReply,
            isRiskDetected: isRiskDetected
        });

    } catch (error) {
        console.error('Error calling OpenAI:', error);
        res.status(500).json({
            error: 'Failed to generate response',
            reply: "I'm having a little trouble connecting right now, but I'm still here. Could you try saying that again?"
        });
    }
}
