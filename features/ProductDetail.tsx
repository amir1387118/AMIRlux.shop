
import React, { useState } from 'react';
import { 
  Star, 
  ShoppingCart, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Zap,
  TrendingDown,
  ImageOff
} from 'lucide-react';
import { Product } from '../types';

interface Props {
  product: Product;
  onAddToCart: (p: Product) => void;
  onBack: () => void;
}

const ProductDetail: React.FC<Props> = ({ product, onAddToCart, onBack }) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'desc'>('specs');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <span className="cursor-pointer hover:text-red-600" onClick={onBack}>فروشگاه</span>
        <ChevronRight size={14} />
        <span className="font-bold text-slate-900">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-8 rounded-[40px] shadow-xl border border-slate-50">
        <div className="lg:col-span-5">
          <div className="aspect-square rounded-[32px] bg-slate-50 flex items-center justify-center border border-slate-100 overflow-hidden">
            {product.image ? (
              <img src={product.image} className="max-w-full max-h-full object-contain" alt={product.title} />
            ) : (
              <div className="flex flex-col items-center gap-4 text-slate-300">
                <ImageOff size={80} />
                <span className="font-black text-sm">تصویری برای این کالا درج نشده است</span>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-7 space-y-8">
          <div>
            <h1 className="text-2xl font-black mb-4">{product.title}</h1>
            <div className="flex items-center gap-4">
              <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-500">{product.category}</span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={16} fill="currentColor" />
                <span className="font-black text-sm">{product.rating}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-6 border-b">
              <button onClick={() => setActiveTab('specs')} className={`pb-4 text-sm font-bold relative ${activeTab === 'specs' ? 'text-red-600 border-b-2 border-red-600' : 'text-slate-400'}`}>مشخصات فنی</button>
              <button onClick={() => setActiveTab('desc')} className={`pb-4 text-sm font-bold relative ${activeTab === 'desc' ? 'text-red-600 border-b-2 border-red-600' : 'text-slate-400'}`}>توضیحات</button>
            </div>

            {activeTab === 'specs' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specs?.map((s, i) => (
                  <div key={i} className="flex justify-between p-4 bg-slate-50 rounded-2xl text-xs">
                    <span className="text-slate-500">{s.label}</span>
                    <span className="font-black text-slate-900">{s.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-8 text-slate-500">{product.description}</p>
            )}
          </div>

          <div className="bg-slate-900 rounded-[32px] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs text-slate-400">قیمت نهایی امیرلوکس:</span>
              <div className="text-3xl font-black">{product.price.toLocaleString('fa-IR')} <span className="text-sm">تومان</span></div>
            </div>
            <button onClick={() => onAddToCart(product)} className="w-full md:w-auto bg-red-600 px-12 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-red-500/20">افزودن به سبد خرید</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
