
import React from 'react';
import { Star, ShoppingCart, ImageOff } from 'lucide-react';
import { Product } from '../types';

interface Props {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onProductClick: (p: Product) => void;
  onCategoryChange: (cat: string) => void;
  activeCategory: string;
  isSearching: boolean;
}

const Marketplace: React.FC<Props> = ({ products, onAddToCart, onProductClick, onCategoryChange, activeCategory, isSearching }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-[32px] p-5 hover:shadow-xl transition-all border border-slate-100 flex flex-col group h-full">
            <div className="relative aspect-square mb-6 cursor-pointer bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden" onClick={() => onProductClick(product)}>
              {product.image ? (
                <img src={product.image} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" alt={product.title} />
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-300">
                  <ImageOff size={40} />
                  <span className="text-[10px] font-bold">بدون تصویر</span>
                </div>
              )}
            </div>
            
            <h4 className="text-sm font-bold line-clamp-2 mb-4 hover:text-red-600 transition-colors cursor-pointer" onClick={() => onProductClick(product)}>
              {product.title}
            </h4>
            
            <div className="mt-auto space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={12} fill="currentColor" />
                  <span className="text-[10px] font-black">{product.rating}</span>
                </div>
                <div className="text-left font-black text-slate-900">
                  {product.price.toLocaleString('fa-IR')} <span className="text-[8px] text-slate-400 font-bold">تومان</span>
                </div>
              </div>
              <button onClick={() => onAddToCart(product)} className="w-full bg-slate-900 text-white py-3 rounded-2xl text-xs font-bold hover:bg-red-600 transition-colors">
                افزودن به سبد
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
