const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function designSystem(intent) {
  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'user',
        content: `You are a software architect. Based on this app intent, design the system architecture.

Intent: ${JSON.stringify(intent)}

Respond ONLY with a valid JSON object. No explanation, no markdown.
{
  "pages": ["list of pages like Login, Dashboard, Contacts"],
  "components": ["list of UI components needed"],
  "apiEndpoints": [
    { "method": "POST", "path": "/api/auth/login", "description": "User login" }
  ],
  "dbTables": [
    { "name": "users", "fields": ["id", "email", "password", "role"] }
  ],
  "authFlow": "describe how auth works",
  "roles": ["admin", "user"]
}`
      }
    ],
    temperature: 0.3,
    max_tokens: 1500
  });

  const rawText = response.choices[0].message.content;
  console.log('🔍 Stage 2 raw:', rawText);

  try {
    return JSON.parse(rawText);
  } catch (e) {
    const cleaned = rawText.replace(/```json|```/g, '').trim();
    return JSON.parse(cleaned);
  }
}

module.exports = { designSystem };