
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Loader2, Copy, Trash2, Send, Languages } from 'lucide-react';

const WriterFeature: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<'en' | 'fa'>('en');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const instruction = lang === 'en' 
        ? "You are a creative writer. Write high-quality English prose or poetry."
        : "شما یک نویسنده خلاق هستید. متن‌های ادبی یا اشعار فارسی بسیار با کیفیت بنویسید.";
      
      const text = await geminiService.generateText(prompt, instruction);
      setResult(text || '');
    } catch (err) {
      console.error(err);
      setResult("Error generating content.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className="space-y-6">
      <div className="glass-effect p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-slate-300">Enter your creative prompt</label>
          <button 
            onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs transition-colors"
          >
            <Languages size={14} />
            {lang === 'en' ? 'English' : 'Persian (فارسی)'}
          </button>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={lang === 'en' ? "e.g. Write a sci-fi short story about Mars..." : "مثلاً: یک شعر در مورد بهار به سبک حافظ بنویس..."}
          className={`w-full bg-slate-900 border border-slate-700 rounded-xl p-4 min-h-[120px] focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${lang === 'fa' ? 'rtl font-vazir' : ''}`}
        />
        <div className="flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold transition-all shadow