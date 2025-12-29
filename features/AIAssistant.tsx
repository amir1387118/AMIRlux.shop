
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Loader2, ExternalLink } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { Message, Product } from '../types';

interface Props {
  onClose: () => void;
  products: Product[];
}

const AIAssistant: React.FC<Props> = ({ onClose, products }) => {
  const [messages, setMessages] = useState<(Message & { groundingChunks?: any[] })[]>([
    {
      id: '1',
      role: 'model',
      content: 'سلام! من هوش مصنوعی اختصاصی امیرلوکس هستم. چطور می‌توانم در استعلام قیمت یا انتخاب بهترین کالای بازار به شما کمک کنم؟',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await geminiService.getShoppingAdvice(input, products);
      const modelMsg = {
        id: (Date.now() + 1).toString(),
        role: 'model' as const,
        content: response.text || 'متاسفم، مشکلی در پاسخگویی پیش آمد.',
        timestamp: Date.now(),
        groundingChunks: response.groundingChunks
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl h-[80vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="bg-slate-900 p-6 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-xl border border-white/5">
              <Sparkles className="text-amber-400" size={24} />
            </div>
            <div>
              <h3 className="font-bold">دستیار هوشمند امیرلوکس</h3>
              <p className="text-[10px] opacity-60">قدرت گرفته از Gemini 3 Pro</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-start' : 'items-end'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm border ${
                msg.role === 'user' ? 'bg-white border-slate-200 rounded-tr-none' : 'bg-slate-900 border-slate-800 text-white rounded-tl-none'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                {msg.groundingChunks && msg.groundingChunks.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/10 space-y-1.5">
                    <p className="text-[10px] font-bold text-amber-400">منابع استعلام بازار:</p>
                    {msg.groundingChunks.map((chunk, idx) => {
                      if (chunk.web?.uri) {
                        return (
                          <a 
                            key={idx} 
                            href={chunk.web.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-[10px] text-slate-400 hover:text-white transition-colors"
                          >
                            <ExternalLink size={10} />
                            <span className="truncate">{chunk.web.title || chunk.web.uri}</span>
                          </a>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-end">
              <div className="bg-slate-900 p-4 rounded-2xl flex items-center gap-3 animate-pulse text-white">
                <Loader2 className="animate-spin text-amber-400" size={20} />
                <span className="text-xs font-bold">در حال استعلام از شبکه تامین...</span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="p-6 border-t border-slate-100 bg-white">
          <div className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="نام کالا را بنویسید تا استعلام بگیرم..."
              className="w-full bg-slate-100 border border-slate-200 rounded-2xl py-4 pr-6 pl-16 outline-none shadow-sm focus:bg-white focus:border-slate-900 transition-all"
            />
            <button onClick={handleSend} disabled={!input.trim() || loading} className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-900 text-white p-3 rounded-xl hover:scale-105 transition-transform">
              <Send size={20} className="rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
