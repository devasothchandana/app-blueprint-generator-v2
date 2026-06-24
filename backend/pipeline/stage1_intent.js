const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function extractIntent(userPrompt) {
  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'user',
        content: `You are an expert software architect. Analyze this app request and extract structured intent.

User Request: "${userPrompt}"

Respond ONLY with a valid JSON object. No explanation, no markdown, just pure JSON.
{
  "appName": "name of the app",
  "appType": "type of app (CRM, ecommerce, blog, etc)",
  "features": ["list", "of", "features"],
  "roles": ["list", "of", "user", "roles"],
  "entities": ["main", "data", "entities"],
  "hasAuth": true,
  "hasPremium": false,
  "assumptions": ["any assumptions you made"]
}`
      }
    ],
    temperature: 0.3,
    max_tokens: 1000
  });

  const rawText = response.choices[0].message.content;
  console.log('🔍 Raw AI response:', rawText);

  try {
    return JSON.parse(rawText);
  } catch (e) {
    const cleaned = rawText.replace(/```json|```/g, '').trim();
    return JSON.parse(cleaned);
  }
}

module.exports = { extractIntent };