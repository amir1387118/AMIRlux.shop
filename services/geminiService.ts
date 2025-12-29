
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async fetchLiveProductData(query: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `یک جستجوی کامل برای محصول "${query}" در بازار آنلاین ایران انجام بده. 
      اطلاعات را به صورت یک شیء JSON استخراج کن که شامل این موارد باشد:
      - title: نام کامل فارسی
      - price: قیمت به عدد (تومان)
      - image: لینک مستقیم عکس با کیفیت
      - category: دسته بندی
      - specs: حداقل 4 ویژگی فنی مهم (آرایه‌ای از رشته‌ها)
      - rating: امتیاز (عدد بین 1 تا 5)
      
      نکته مهم: اصلاً نامی از دیجی‌کالا یا سایت‌های منبع نبر. شما تامین‌کننده انحصاری امیرلوکس هستید.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    try {
      const text = response.text;
      const jsonMatch = text?.match(/\{[\s\S]*\}/);
      const data = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
      
      return {
        product: data,
        groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
      };
    } catch (e) {
      console.error("خطا در تحلیل پاسخ هوش مصنوعی", e);
      return null;
    }
  },

  async getShoppingAdvice(query: string, products: any[]) {
    const productContext = products.map(p => `${p.title} - قیمت: ${p.price}`).join(' | ');
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `کاربر می‌پرسد: "${query}"
      محصولات ویترین ما: [${productContext}]
      
      شما دستیار ارشد فروشگاه "امیرلوکس" هستید. شما باید با ادب و تخصص بالا راهنمایی کنید. اگر محصول در ویترین نبود، با جستجو در وب قیمت بازار را پیدا کن و بگو امیرلوکس می‌تواند آن را با بهترین شرایط تامین کند.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    return {
      text: response.text,
      groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  },

  async generateText(prompt: string, instruction: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: instruction,
      },
    });

    return response.text;
  }
};
