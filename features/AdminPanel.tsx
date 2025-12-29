
import React, { useState } from 'react';
import { 
  Trash2,
  Calculator,
  Gem,
  ArrowDownCircle,
  Download,
  FileSpreadsheet
} from 'lucide-react';
import { Product } from '../types';

interface Props {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onBulkGoldUpdate?: (pricePerGram: number) => void;
}

const AdminPanel: React.FC<Props> = ({ products, onAddProduct, onUpdateProduct, onDeleteProduct, onBulkGoldUpdate }) => {
  const [activeTab, setActiveTab] = useState<'add' | 'list' | 'pricing'>('list');
  const [goldPrice, setGoldPrice] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    image: '',
    category: 'طلا و جواهر',
    description: '',
    weight: '',
    wages: '5',
    profit: '7'
  });

  const isGold = formData.category === 'طلا و جواهر';

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Date.now().toString(),
      title: formData.title,
      price: parseInt(formData.price) || 0,
      image: formData.image,
      category: formData.category,
      rating: 5.0,
      description: formData.description,
      weight: isGold ? parseFloat(formData.weight) : undefined,
      wagesPercent: isGold ? parseFloat(formData.wages) : undefined,
      profitPercent: isGold ? parseFloat(formData.profit) : undefined,
      specs: isGold ? [
        { label: 'عیار', value: '18 عیار' },
        { label: 'وزن خالص', value: `${formData.weight} گرم` },
        { label: 'اجرت ساخت', value: `${formData.wages} درصد` },
        { label: 'سود فروشنده', value: `${formData.profit} درصد` }
      ] : [{ label: 'اصالت', value: 'تضمین اصالت امیرلوکس' }]
    };
    onAddProduct(newProduct);
    setFormData({ title: '', price: '', image: '', category: 'طلا و جواهر', description: '', weight: '', wages: '5', profit: '7' });
    setActiveTab('list');
  };

  const handleBulkUpdate = () => {
    if (onBulkGoldUpdate && goldPrice) {
      onBulkGoldUpdate(parseInt(goldPrice));
      alert('قیمت کل ویترین به‌روزرسانی شد.');
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Title', 'Category', 'Price', 'Weight', 'Wages%', 'Profit%'];
    const rows = products.map(p => [
      p.id,
      p.title,
      p.category,
      p.price,
      p.weight || '-',
      p.wagesPercent || '-',
      p.profitPercent || '-'
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "AmirLux_Products.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex gap-2 bg-white p-2 rounded-3xl shadow-sm border border-orange-50">
        <button onClick={() => setActiveTab('list')} className={`flex-1 py-4 rounded-2xl font-bold text-xs transition-all ${activeTab === 'list' ? 'bg-orange-600 text-white' : 'text-slate-500 hover:bg-orange-50'}`}>لیست محصولات</button>
        <button onClick={() => setActiveTab('pricing')} className={`flex-1 py-4 rounded-2xl font-bold text-xs transition-all ${activeTab === 'pricing' ? 'bg-orange-600 text-white' : 'text-slate-500 hover:bg-orange-50'}`}>نرخ‌گذاری طلا</button>
        <button onClick={() => setActiveTab('add')} className={`flex-1 py-4 rounded-2xl font-bold text-xs transition-all ${activeTab === 'add' ? 'bg-orange-600 text-white' : 'text-slate-500 hover:bg-orange-50'}`}>افزودن کالا</button>
      </div>

      {activeTab === 'list' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl text-xs font-bold hover:bg-emerald-700 transition-all shadow-lg"
            >
              <FileSpreadsheet size={16} />
              دانلود لیست محصولات (ویندوز/اکسل)
            </button>
          </div>
          <div className="bg-white rounded-[40px] border border-orange-50 overflow-hidden shadow-sm animate-in">
            <table className="w-full text-right">
              <thead className="bg-orange-50/30 border-b border-orange-50">
                <tr>
                  <th className="p-6 text-xs font-bold text-slate-400">محصول</th>
                  <th className="p-6 text-xs font-bold text-slate-400">اطلاعات طلا</th>
                  <th className="p-6 text-xs font-bold text-slate-400">قیمت نهایی</th>
                  <th className="p-6 text-xs font-bold text-slate-400">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-50/30">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-orange-50/20 group">
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-800">{p.title}</span>
                        <span className="text-[10px] text-slate-400">{p.category}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      {p.category === 'طلا و جواهر' ? (
                        <div className="flex gap-2 text-[9px] font-black">
                          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full">{p.weight}g</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{p.wagesPercent}% اجرت</span>
                        </div>
                      ) : <span className="text-slate-300">-</span>}
                    </td>
                    <td className="p-6">
                      <span className="text-sm font-black text-orange-600">{p.price.toLocaleString('fa-IR')}</span>
                    </td>
                    <td className="p-6">
                      <button onClick={() => onDeleteProduct(p.id)} className="p-2 text-red-200 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={16}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'pricing' && (
        <div className="bg-white p-10 rounded-[40px] border border-orange-100 shadow-sm space-y-8 animate-in">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600"><Calculator size={32} /></div>
              <div><h3 className="text-lg font-black">به‌روزرسانی نرخ پایه طلا</h3><p className="text-xs text-slate-500">تمامی قیمت‌ها بر اساس وزن هر کالا و سود ۵٪ + اجرت ۷٪ آپدیت می‌شوند.</p></div>
           </div>
           <div className="bg-orange-50/50 p-8 rounded-[32px] border border-orange-100 flex items-end gap-6">
              <div className="flex-1 space-y-3">
                <label className="text-xs font-black text-slate-700">نرخ پایه هر گرم طلا (تومان)</label>
                <input type="number" value={goldPrice} onChange={(e) => setGoldPrice(e.target.value)} placeholder="مثلاً: 3650000" className="w-full bg-white p-5 rounded-2xl outline-none border border-orange-200 font-black text-lg" />
              </div>
              <button onClick={handleBulkUpdate} className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs hover:bg-orange-600 transition-all shadow-xl"><ArrowDownCircle size={20} className="mb-1" /> آپدیت کلی</button>
           </div>
        </div>
      )}

      {activeTab === 'add' && (
        <form onSubmit={handleAdd} className="bg-white p-10 rounded-[40px] border border-orange-100 shadow-sm space-y-6 animate-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input required placeholder="نام کالا" className="bg-slate-50 p-4 rounded-2xl outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            <select className="bg-slate-50 p-4 rounded-2xl outline-none font-bold" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="طلا و جواهر">طلا و جواهر</option>
              <option value="آرایشی و بهداشتی">آرایشی و بهداشتی</option>
            </select>
            {isGold && <input required type="number" step="0.01" placeholder="وزن (گرم)" className="bg-orange-50/30 p-4 rounded-2xl outline-none" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} />}
            {!isGold && <input required type="number" placeholder="قیمت نهایی" className="bg-slate-50 p-4 rounded-2xl outline-none" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />}
          </div>
          <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-orange-600 shadow-xl">تایید نهایی</button>
        </form>
      )}
    </div>
  );
};

export default AdminPanel;
