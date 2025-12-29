
import React, { useState, useMemo } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Sparkles, 
  LayoutDashboard,
  User as UserIcon,
  Gem,
  Sparkle,
  Zap,
  Tag,
  Gift,
  Star,
  Github,
  ExternalLink
} from 'lucide-react';
import { AppView, Product, CartItem, User } from './types';
import Marketplace from './features/Marketplace';
import CartView from './features/CartView';
import AIAssistant from './features/AIAssistant';
import AdminPanel from './features/AdminPanel';
import ProductDetail from './features/ProductDetail';
import UserPanel from './features/UserPanel';
import AuthModal from './features/AuthModal';

const REPO_URL = "https://github.com/amir1387118/AMIRlux.shop.git";

const generateLuxuryProducts = (): Product[] => {
  const items = [
    { name: 'گردنبند طلا 18 عیار زنانه طرح قلب کد G120', price: 12450000, cat: 'طلا و جواهر', weight: 2.4, wages: 5, profit: 7 },
    { name: 'دستبند طلا 18 عیار مدل ون کلیف صدف', price: 18900000, cat: 'طلا و جواهر', weight: 3.8, wages: 5, profit: 7 },
    { name: 'انگشتر طلا 18 عیار مدل کارتیه گره‌ای', price: 9800000, cat: 'طلا و جواهر', weight: 1.9, wages: 5, profit: 7 },
    { name: 'گوشواره طلا 18 عیار مدل بخیه‌ای طرح گل', price: 5600000, cat: 'طلا و جواهر', weight: 1.1, wages: 5, profit: 7 },
    { name: 'کرم پودر لورآل مدل Infallible شماره 120', price: 850000, cat: 'آرایشی و بهداشتی' },
    { name: 'ریمل حجم دهنده اسنس مدل I Love Extreme Crazy Volume', price: 245000, cat: 'آرایشی و بهداشتی' },
    { name: 'ادو پرفیوم زنانه لالیک مدل Le Amour حجم 100 میلی لیتر', price: 2900000, cat: 'آرایشی و بهداشتی' },
    { name: 'سرم پوست نوتروژینا مدل Hydro Boost حجم 30 میلی لیتر', price: 680000, cat: 'آرایشی و بهداشتی' },
    { name: 'رژ لب مایع ویولت مدل Matt شماره 08', price: 120000, cat: 'آرایشی و بهداشتی' }
  ];

  const all: Product[] = [];
  for (let i = 0; i < 40; i++) {
    const base = items[i % items.length];
    const isGold = base.cat === 'طلا و جواهر';
    all.push({
      id: `lux-${i}`,
      title: base.name,
      price: base.price,
      image: '', 
      category: base.cat,
      rating: 4.8,
      description: 'این کالا از کلکسیون ویژه امیرلوکس انتخاب شده و دارای تاییدیه اصالت و سلامت فیزیکی می‌باشد.',
      weight: base.weight,
      wagesPercent: isGold ? 5 : undefined,
      profitPercent: isGold ? 7 : undefined,
      specs: isGold ? [
        {label: 'عیار', value: '18 عیار'},
        {label: 'وزن خالص', value: `${base.weight} گرم`},
        {label: 'اجرت ساخت', value: '۵ درصد'},
        {label: 'سود فروشنده', value: '۷ درصد'}
      ] : [
        {label: 'اصالت', value: 'تضمین اصالت کالا'},
        {label: 'تامین‌کننده', value: 'امیرلوکس'}
      ]
    });
  }
  return all;
};

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [products, setProducts] = useState<Product[]>(generateLuxuryProducts());
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'همه' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleBulkUpdateGold = (pricePerGram: number) => {
    setProducts(prev => prev.map(p => {
      if (p.category === 'طلا و جواهر' && p.weight) {
        const basePrice = pricePerGram * p.weight;
        const multiplier = 1 + (5 + 7) / 100;
        const newPrice = Math.round(basePrice * multiplier);
        return { ...p, price: newPrice };
      }
      return p;
    }));
  };

  return (
    <div className="min-h-screen bg-[#fdfbf9] text-slate-900 font-vazir rtl flex flex-col" dir="rtl">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-orange-600 text-3xl font-black cursor-pointer tracking-tighter" onClick={() => { setView('home'); setSelectedCategory('همه'); setSearchQuery(''); }}>
              AMIR<span className="text-slate-900 underline decoration-orange-300 decoration-4 underline-offset-4">LUX</span>
            </h1>
            <div className="hidden lg:flex relative group w-80">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در کالکشن..." 
                className="w-full bg-orange-50/50 rounded-2xl py-3 pr-12 pl-4 outline-none border border-orange-100 text-xs focus:ring-2 focus:ring-orange-200 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href={REPO_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
              title="مشاهده کد منبع در گیت‌هاب"
            >
              <Github size={20} />
            </a>

            {currentUser?.role === 'admin' && (
              <button onClick={() => setView('admin')} className={`p-2.5 rounded-xl transition-all ${view === 'admin' ? 'bg-orange-600 text-white shadow-lg shadow-orange-100' : 'text-slate-400 hover:bg-orange-50'}`}>
                <LayoutDashboard size={20} />
              </button>
            )}
            
            <button onClick={() => setView('cart')} className="relative p-2.5 text-slate-700 hover:bg-orange-50 rounded-xl transition-colors">
              <ShoppingCart size={20} />
              {cart.length > 0 && <span className="absolute -top-1 -left-1 bg-orange-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cart.length}</span>}
            </button>

            {currentUser ? (
              <button onClick={() => setView('user-panel')} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition-colors">
                <UserIcon size={16} />
                <span className="text-xs font-bold">{currentUser.name}</span>
              </button>
            ) : (
              <button onClick={() => setShowAuth(true)} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-orange-600 transition-all">
                ورود
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-10">
        {view === 'home' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="h-64 rounded-[40px] bg-gradient-to-br from-[#d4af37] via-[#f9f295] to-[#b8860b] p-10 text-slate-900 relative overflow-hidden group shadow-xl">
                  <div className="relative z-10 h-full flex flex-col justify-center max-w-xs">
                    <span className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-70">Gold Collection</span>
                    <h3 className="text-2xl font-black mb-3">محاسبه شفاف قیمت طلا</h3>
                    <p className="text-xs font-medium mb-8 opacity-80 leading-relaxed">اجرت ۵٪ و سود ۷٪ ثابت برای تمام محصولات.</p>
                    <button className="bg-slate-900 text-white w-fit px-8 py-3 rounded-full font-bold text-xs">مشاهده</button>
                  </div>
                  <Gem className="absolute -bottom-6 -right-6 w-56 h-56 opacity-10 rotate-12 group-hover:scale-110 transition-transform text-white" />
               </div>
               <div className="h-64 rounded-[40px] bg-gradient-to-br from-[#1a1a1a] to-[#434343] p-10 text-white relative overflow-hidden group shadow-xl">
                  <div className="relative z-10 h-full flex flex-col justify-center max-w-xs">
                    <span className="text-[10px] font-black uppercase tracking-widest mb-2 text-orange-400">Beauty & Care</span>
                    <h3 className="text-2xl font-black mb-3">زیبایی به سبک حرفه‌ای‌ها</h3>
                    <p className="text-xs font-medium mb-8 opacity-70 leading-relaxed">بهترین برندها با ضمانت اصالت امیرلوکس.</p>
                    <button className="bg-orange-600 text-white w-fit px-8 py-3 rounded-full font-bold text-xs">بررسی</button>
                  </div>
                  <Sparkle className="absolute -bottom-6 -right-6 w-56 h-56 opacity-10 rotate-12 group-hover:scale-110 transition-transform" />
               </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { id: 'همه', label: 'همه', icon: <Tag size={18}/> },
                { id: 'طلا و جواهر', label: 'طلا', icon: <Gem size={18}/> },
                { id: 'آرایشی و بهداشتی', label: 'آرایشی', icon: <Sparkle size={18}/> },
                { id: 'هدیه', label: 'هدیه', icon: <Gift size={18}/> },
                { id: 'تخفیف', label: 'تخفیف', icon: <Star size={18}/> },
                { id: 'جدید', label: 'جدید', icon: <Zap size={18}/> },
              ].map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                    selectedCategory === cat.id 
                    ? 'bg-orange-600 border-orange-600 text-white shadow-lg' 
                    : 'bg-white border-orange-50 text-slate-500 hover:bg-orange-50'
                  }`}
                >
                  {cat.icon}
                  <span className="text-[10px] font-black">{cat.label}</span>
                </button>
              ))}
            </div>

            <Marketplace products={filteredProducts} onAddToCart={addToCart} onProductClick={(p) => { setSelectedProduct(p); setView('product-detail'); }} onCategoryChange={() => {}} activeCategory={selectedCategory} isSearching={!!searchQuery} />
          </div>
        )}
        {view === 'product-detail' && selectedProduct && <ProductDetail product={selectedProduct} onAddToCart={addToCart} onBack={() => setView('home')} />}
        {view === 'cart' && <CartView cart={cart} setCart={setCart} />}
        {view === 'admin' && currentUser?.role === 'admin' && (
          <AdminPanel 
            products={products}
            onAddProduct={(p) => setProducts([p, ...products])} 
            onUpdateProduct={(p) => setProducts(prev => prev.map(old => old.id === p.id ? p : old))}
            onDeleteProduct={(id) => setProducts(products.filter(p => p.id !== id))}
            onBulkGoldUpdate={handleBulkUpdateGold}
          />
        )}
        {view === 'user-panel' && currentUser && <UserPanel user={currentUser} />}
      </main>

      <footer className="bg-white border-t border-orange-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-black text-slate-900">AMIR<span className="text-orange-600">LUX</span></h2>
            <p className="text-sm text-slate-500 max-w-sm leading-8">امیرلوکس پلتفرم هوشمند خرید و استعلام قیمت لحظه‌ای طلا و محصولات زیبایی است. ما با استفاده از هوش مصنوعی، تجربه‌ای شفاف و مطمئن را برای شما رقم می‌زنیم.</p>
            <div className="flex items-center gap-4">
               <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-orange-600 transition-colors">
                 <Github size={18} />
                 مشاهده در گیت‌هاب
                 <ExternalLink size={12} />
               </a>
            </div>
          </div>
          <div>
            <h4 className="font-black mb-6">دسترسی سریع</h4>
            <ul className="space-y-4 text-xs font-bold text-slate-500">
              <li className="hover:text-orange-600 cursor-pointer" onClick={() => setView('home')}>صفحه اصلی</li>
              <li className="hover:text-orange-600 cursor-pointer">قوانین و مقررات</li>
              <li className="hover:text-orange-600 cursor-pointer">درباره ما</li>
              <li className="hover:text-orange-600 cursor-pointer">تماس با پشتیبانی</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-6">نمادهای اعتماد</h4>
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl border border-orange-50"></div>
              <div className="w-16 h-16 bg-slate-50 rounded-2xl border border-orange-50"></div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-orange-50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-slate-400">
          <p>© تمامی حقوق برای امیرلوکس محفوظ است. ۱۴۰۳</p>
          <p dir="ltr">Powered by Gemini AI & Open Source Community</p>
        </div>
      </footer>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={setCurrentUser} />}
      <button onClick={() => setView('ai-assistant')} className="fixed bottom-8 left-8 bg-slate-900 text-white p-5 rounded-full shadow-2xl flex items-center gap-3 border-4 border-white z-50 hover:bg-orange-600 transition-all group active:scale-95">
        <Sparkles size={24} className="text-orange-400 group-hover:text-white" />
      </button>

      {view === 'ai-assistant' && <AIAssistant onClose={() => setView('home')} products={products} />}
    </div>
  );
};

export default App;
