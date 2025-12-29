
import React from 'react';
import { User as UserIcon, Package, Clock, Shield } from 'lucide-react';
import { User } from '../types';

interface Props {
  user: User;
}

const UserPanel: React.FC<Props> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
      <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8">
        <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center text-red-600">
          <UserIcon size={48} />
        </div>
        <div className="text-center md:text-right flex-1">
          <h2 className="text-2xl font-black mb-1">{user.name}</h2>
          <p className="text-slate-400 text-sm">{user.email}</p>
          <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="bg-emerald-50 text-emerald-600 text-[10px] px-3 py-1 rounded-full font-bold border border-emerald-100">کاربر طلایی</span>
            <span className="bg-blue-50 text-blue-600 text-[10px] px-3 py-1 rounded-full font-bold border border-blue-100">پروفایل تایید شده</span>
          </div>
        </div>
        <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-sm font-bold">ویرایش پروفایل</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <Package size={24}/>, label: 'سفارشات من', value: '۰ سفارش' },
          { icon: <Clock size={24}/>, label: 'بازدیدهای اخیر', value: '۱۲ کالا' },
          { icon: <Shield size={24}/>, label: 'کدهای تخفیف', value: '۲ مورد' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center gap-4 text-center">
            <div className="text-slate-400">{item.icon}</div>
            <span className="text-xs text-slate-500 font-bold">{item.label}</span>
            <span className="font-black text-slate-900">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
        <h3 className="text-lg font-black mb-6">تاریخچه فعالیت‌ها</h3>
        <div className="flex flex-col items-center py-12 text-slate-300">
          <Clock size={48} className="mb-4 opacity-50" />
          <p className="font-bold text-sm">فعلاً فعالیتی برای نمایش وجود ندارد.</p>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
