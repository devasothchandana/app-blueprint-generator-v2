const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function generateSchemas(intent, design) {
  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'user',
        content: `You are a software architect. Generate complete schemas for this app.

Intent: ${JSON.stringify(intent)}
Design: ${JSON.stringify(design)}

Respond ONLY with a valid JSON object. No explanation, no markdown.
{
  "uiSchema": {
    "pages": [
      {
        "name": "Login",
        "route": "/login",
        "components": [
          { "type": "input", "name": "email", "label": "Email", "required": true },
          { "type": "input", "name": "password", "label": "Password", "required": true },
          { "type": "button", "name": "submit", "label": "Login" }
        ]
      }
    ]
  },
  "apiSchema": {
    "endpoints": [
      {
        "method": "POST",
        "path": "/api/auth/login",
        "body": ["email", "password"],
        "response": ["token", "user"],
        "auth": false
      }
    ]
  },
  "dbSchema": {
    "tables": [
      {
        "name": "users",
        "fields": [
          { "name": "id", "type": "UUID", "primary": true },
          { "name": "email", "type": "VARCHAR", "unique": true },
          { "name": "password", "type": "VARCHAR" },
          { "name": "role", "type": "ENUM", "values": ["admin", "user"] }
        ]
      }
    ]
  },
  "authSchema": {
    "type": "JWT",
    "roles": ["admin", "user"],
    "permissions": {
      "admin": ["read", "write", "delete"],
      "user": ["read"]
    }
  }
}`
      }
    ],
    temperature: 0.3,
    max_tokens: 2000
  });

  const rawText = response.choices[0].message.content;
  console.log('🔍 Stage 3 raw:', rawText);

  try {
    return JSON.parse(rawText);
  } catch (e) {
    const cleaned = rawText.replace(/```json|```/g, '').trim();
    return JSON.parse(cleaned);
  }
}

module.exports = { generateSchemas };