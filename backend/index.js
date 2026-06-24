const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { extractIntent } = require('./pipeline/stage1_intent');
const { designSystem } = require('./pipeline/stage2_design');
const { generateSchemas } = require('./pipeline/stage3_schemas');
const { validateAndRepair } = require('./pipeline/stage4_validate');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: '✅ Server is running' });
});

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  try {
    console.log('🔄 Stage 1: Extracting intent...');
    const intent = await extractIntent(prompt);
    console.log('✅ Stage 1 done');

    console.log('🔄 Stage 2: Designing system...');
    const design = await designSystem(intent);
    console.log('✅ Stage 2 done');

    console.log('🔄 Stage 3: Generating schemas...');
    const schemas = await generateSchemas(intent, design);
    console.log('✅ Stage 3 done');

    console.log('🔄 Stage 4: Validating & repairing...');
    const validation = validateAndRepair(intent, design, schemas);
    console.log('✅ Stage 4 done — errors found:', validation.errors.length);
    console.log('🔧 Repairs made:', validation.repairs);

    res.json({
      success: true,
      prompt,
      pipeline: {
        stage1_intent: validation.repairedIntent,
        stage2_design: validation.repairedDesign,
        stage3_schemas: validation.repairedSchemas,
        stage4_validation: {
          isValid: validation.isValid,
          errorsFound: validation.errors,
          repairsMade: validation.repairs
        }
      }
    });
  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});