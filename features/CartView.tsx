
import React from 'react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface Props {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartView: React.FC<Props> = ({ cart, setCart }) => {
  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100">
        <div className="w-48 h-48 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingCart size={80} className="text-slate-300" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">سبد خرید شما خالی است!</h3>
        <p className="text-slate-500 mb-8">می‌توانید برای مشاهده محصولات به صفحه اصلی بروید.</p>
        <button className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2">
          بازگشت به فروشگاه
          <ArrowRight size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-2xl font-bold mb-6">سبد خرید ({cart.length})</h2>
        {cart.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 flex gap-6">
            <img src={item.image} className="w-32 h-32 object-cover rounded-xl" alt={item.title} />
            <div className="flex-1">
              <h4 className="font-bold mb-4">{item.title}</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 bg-slate-100 p-1 rounded-lg">
                  <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:text-red-600"><Plus size={18}/></button>
                  <span className="font-bold w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:text-red-600"><Minus size={18}/></button>
                </div>
                <div className="text-left">
                  <div className="text-lg font-black">{item.price.toLocaleString('fa-IR')}</div>
                  <div className="text-xs text-slate-500">تومان</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 h-fit sticky top-28 shadow-sm">
        <h3 className="font-bold mb-8 border-b border-slate-100 pb-4">خلاصه سفارش</h3>
        <div className="space-y-4 mb-8">
          <div className="flex justify-between text-slate-600">
            <span>قیمت کالاها</span>
            <span>{total.toLocaleString('fa-IR')} تومان</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>هزینه ارسال</span>
            <span className="text-emerald-600 font-bold text-sm">رایگان</span>
          </div>
          <div className="flex justify-between text-xl font-black pt-4 border-t border-slate-100">
            <span>جمع نهایی</span>
            <span className="text-red-600">{total.toLocaleString('fa-IR')} تومان</span>
          </div>
        </div>
        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-red-100">
          تایید و ادامه فرآیند خرید
        </button>
      </div>
    </div>
  );
};

export default CartView;
