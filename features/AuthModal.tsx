
import React, { useState } from 'react';
import { X, User, Mail, Lock } from 'lucide-react';
import { User as UserType } from '../types';

interface Props {
  onClose: () => void;
  onAuth: (user: UserType) => void;
}

const AuthModal: React.FC<Props> = ({ onClose, onAuth }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // دمو: ادمین با ایمیل admin@amirlux.ir وارد می‌شود
    const role = formData.email === 'admin@amirlux.ir' ? 'admin' : 'user';
    onAuth({
      id: Date.now().toString(),
      name: formData.name || (role === 'admin' ? 'مدیر سیستم' : 'کاربر جدید'),
      email: formData.email,
      role: role
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[32px] p-8 relative shadow-2xl overflow-hidden">
        <button onClick={onClose} className="absolute top-6 left-6 text-slate-400 hover:text-red-500"><X size={24} /></button>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black mb-2">{mode === 'login' ? 'خوش آمدید' : 'ساخت حساب کاربری'}</h2>
          <p className="text-xs text-slate-400">وارد دنیای هوشمند امیرلوکس شوید.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="relative">
              <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input required placeholder="نام و نام خانوادگی" className="w-full bg-slate-50 py-4 pr-12 pl-4 rounded-2xl outline-none border border-transparent focus:border-red-500/20" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input required type="email" placeholder="آدرس ایمیل" className="w-full bg-slate-50 py-4 pr-12 pl-4 rounded-2xl outline-none border border-transparent focus:border-red-500/20" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="relative">
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input required type="password" placeholder="کلمه عبور" className="w-full bg-slate-50 py-4 pr-12 pl-4 rounded-2xl outline-none border border-transparent focus:border-red-500/20" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>

          <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-red-600 transition-all shadow-lg">
            {mode === 'login' ? 'ورود به حساب' : 'تکمیل ثبت‌نام'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-xs font-bold text-slate-500 hover:text-red-600">
            {mode === 'login' ? 'هنوز عضو نشده‌اید؟ ثبت‌نام کنید' : 'قبلاً ثبت‌نام کرده‌اید؟ وارد شوید'}
          </button>
        </div>

        {mode === 'login' && (
          <div className="mt-6 bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200">
            <p className="text-[10px] text-slate-400 text-center">تست پنل مدیریت: <br/> <b>admin@amirlux.ir</b></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
