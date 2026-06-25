'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('intent');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await axios.post('https://app-blueprint-generator.onrender.com/api/generate', { prompt });
      setResult(res.data.pipeline);
    } catch (err : any) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'intent', label: '1️⃣ Intent' },
    { id: 'design', label: '2️⃣ Design' },
    { id: 'schemas', label: '3️⃣ Schemas' },
    { id: 'validation', label: '4️⃣ Validation' },
  ];

  const getTabData = () => {
    if (!result) return null;

    switch (activeTab) {
      case 'intent':
        return result?.stage1_intent;

      case 'design':
        return result?.stage2_design;

      case 'schemas':
        return result?.stage3_schemas;

      case 'validation':
        return result?.stage4_validation;

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-purple-400 mb-2">
            🧠 App Blueprint Generator
          </h1>
          <p className="text-gray-400">
            Type your app idea → Get a complete structured blueprint
          </p>
        </div>

        {/* Input */}
        <div className="bg-gray-900 rounded-xl p-6 mb-6">
          <textarea
            className="w-full bg-gray-800 text-white rounded-lg p-4 text-sm resize-none border border-gray-700 focus:border-purple-500 focus:outline-none"
            rows={4}
            placeholder='Example: "Build me a CRM app with login, contacts, dashboard, and admin analytics"'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all"
          >
            {loading ? '⚙️ Generating Blueprint...' : '🚀 Generate Blueprint'}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-gray-900 rounded-xl p-6 mb-6">
            <p className="text-purple-400 font-semibold mb-4">
              🔄 Pipeline Running...
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>⚙️ Stage 1: Extracting intent...</p>
              <p>⚙️ Stage 2: Designing system...</p>
              <p>⚙️ Stage 3: Generating schemas...</p>
              <p>⚙️ Stage 4: Validating & repairing...</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-900 border border-red-500 rounded-xl p-4 mb-6 text-red-300">
            ❌ {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-xl font-bold text-green-400 mb-4">
              ✅ Blueprint Generated!
            </h2>

            {/* Tabs */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* JSON Output */}
            <pre className="bg-gray-800 rounded-lg p-4 text-xs text-green-300 overflow-auto max-h-96">
              {JSON.stringify(getTabData(), null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}