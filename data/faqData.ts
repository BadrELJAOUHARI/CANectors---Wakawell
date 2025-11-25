import { FAQEntry } from '../types';

export const SYSTEM_PROMPT = `
You are FanWelcome Assistant, a warm, concise, and protective helper for female football fans visiting Morocco for AFCON 2025. 
Your tone is sisterly, welcoming, and informative.
Prioritize safety advice for solo female travelers.
Use simple language.
If asked about laws or health, add a brief disclaimer.
Keep answers culturally appropriate for Morocco (respectful of local customs).
If the user speaks English, answer in English. If French, French. If Arabic, Arabic.
Keep responses short (under 100 words) as users are on mobile.
`;

export interface PresetQuestion {
  question: string;
  answer: string;
}

export const PRESET_DATA: Record<'en' | 'fr' | 'ar', PresetQuestion[]> = {
 en: [
  {
    question: "Do I need a visa?",
    answer: "A lot of African countries have visa-free entry to Morocco for CAN 2025. Others may require an Electronic Travel Authorization (AEVM). Always check your status on the official portal: acces-maroc.ma."
  },
  {
    question: "How to get access to internet?",
    answer: "Buy a SIM card from Maroc Telecom, Inwi, or Orange at the airport, train stations, or in the city. Most cafés, hotels, and public spaces offer free Wi-Fi."
  },
  {
    question: "How to avoid counterfeit tickets?",
    answer: "Buy tickets only through the official CAF platform or official Moroccan ticketing point of sale. Avoid street sellers, as the QR codes are often invalid."
  },
  {
    question: "Basic Moroccan Darija words?",
    answer: "Useful Darija: 'Salam' (Hello), 'Shukran' (Thank you), 'Afak' (Please), 'Bshhal?' (How much?), 'Fin?' (Where?)."
  },
  {
    question: "Safety for women?",
    answer: "Morocco is generally safe for solo female travelers. Follow basic precautions: avoid isolated areas at night, use official taxis, and keep personal belongings secure in crowded places."
  },
  {
    question: "Emergency numbers?",
    answer: "Police: 19 (cities) or 177 (outside cities – Royal Gendarmerie). Ambulance/Fire: 15."
  },
  {
    question: "Moroccan food recommendations?",
    answer: "Try classic dishes such as Tagine, Couscous, Pastilla, Harira, Tanjia, Rfissa, and Moroccan pastries like Chebakia or Msemen. For street food, opt for busy and reputable places."
  },
  {
    question: "Meet other fans?",
    answer: "Official Fan Zones will be set up in major host cities. Public squares, cafés, and malls are also common gathering spots for supporters."
  },
  {
    question: "Accessibility info?",
    answer: "New and renovated stadiums meet accessibility standards. Tramways in Casablanca and Rabat are wheelchair-friendly. Old medinas may be challenging due to narrow streets and uneven paths."
  }
],

fr: [
  {
    question: "Ai-je besoin d'un visa ?",
    answer: "Beaucoup de pays africains sont exemptés de visa pour le Maroc pendant la CAN 2025. D’autres doivent demander une Autorisation Électronique (AEVM). Vérifiez votre situation sur acces-maroc.ma."
  },
  {
    question: "Comment avoir accès à Internet ?",
    answer: "Achetez une carte SIM Maroc Telecom, Inwi ou Orange à l’aéroport ou en ville. La plupart des cafés et hôtels proposent du Wi-Fi gratuit."
  },
  {
    question: "Comment éviter les faux billets ?",
    answer: "Achetez vos billets uniquement sur la plateforme officielle de la CAF ou auprès des points de vente validés. Évitez les vendeurs de rue."
  },
  {
    question: "Mots utiles en darija marocaine ?",
    answer: "En darija : 'Salam' (Bonjour), 'Shukran' (Merci), 'Afak' (S’il te plaît), 'Bshhal ?' (Combien ?), 'Fin ?' (Où ?)."
  },
  {
    question: "Sécurité pour les femmes ?",
    answer: "Le Maroc est globalement sûr pour une femme seule. Évitez les zones isolées la nuit, utilisez des taxis officiels, et gardez vos affaires près de vous dans les zones fréquentées."
  },
  {
    question: "Numéros d'urgence ?",
    answer: "Police : 19 (en ville) ou 177 (hors ville – Gendarmerie Royale). Ambulance/Pompiers : 15."
  },
  {
    question: "Recommandations de cuisine marocaine ?",
    answer: "Goûtez des plats comme le tajine, le couscous, la pastilla, la harira, la tanjia, la rfissa, ainsi que les pâtisseries marocaines comme la chebakia et le msemen. Privilégiez les endroits très fréquentés."
  },
  {
    question: "Rencontrer des fans ?",
    answer: "Des Fan Zones officielles seront installées dans les villes hôtes. Les cafés, places et centres commerciaux sont aussi des lieux populaires pour suivre les matches."
  },
  {
    question: "Infos accessibilité ?",
    answer: "Les stades rénovés sont accessibles. Les tramways de Rabat et Casablanca sont adaptés. Les anciennes médinas peuvent être difficiles d’accès."
  }
],

ar: [
  {
    question: "هل أحتاج إلى تأشيرة؟",
    answer: "العديد من الدول الإفريقية معفاة من التأشيرة لدخول المغرب خلال كان 2025. جنسيات أخرى تحتاج إلى تصريح إلكتروني (AEVM). تأكدي دائماً من موقع acces-maroc.ma."
  },
  {
    question: "كيف يمكن لي الوصول إلى الإنترنت؟",
    answer: "اشتري بطاقة SIM من اتصالات المغرب أو إنوي أو أورنج من المطار أو المدينة. معظم المقاهي والفنادق توفر Wi-Fi مجاناً."
  },
  {
    question: "كيف أتجنب التذاكر المزيفة؟",
    answer: "اشتري التذاكر فقط من منصة الكاف الرسمية أو من نقاط البيع المعتمدة. تجنبي الباعة المتجولين."
  },
  {
    question: "كلمات مغربية (دارجة) مفيدة؟",
    answer: "سلام (مرحباً)، شكراً، عفاك (من فضلك)، بشحال؟ (بكم؟)، فين؟ (أين؟)."
  },
  {
    question: "هل المغرب آمن للنساء؟",
    answer: "المغرب آمن عموماً للنساء. من الأفضل تجنب الأماكن المعزولة ليلاً، استخدام طاكسي رسمي، والحفاظ على الأغراض في الأماكن المزدحمة."
  },
  {
    question: "أرقام الطوارئ؟",
    answer: "الشرطة: 19 داخل المدن، أو 177 خارج المدن (الدرك الملكي). الإسعاف والوقاية المدنية: 15."
  },
  {
    question: "أكلات مغربية يُنصح بتجربتها؟",
    answer: "جربي الطاجين، الكسكس، البسطيلة، الحريرة، الطنجية، الرفيسة، إضافة إلى الحلويات المغربية مثل الشباكية والمسمن. اختاري الأماكن المزدحمة لضمان الجودة."
  },
  {
    question: "أين ألتقي بمشجعين آخرين؟",
    answer: "سيتم وضع Fan Zones رسمية في المدن المستضيفة. المقاهي والساحات والمراكز التجارية أماكن جيدة للتجمعات الجماهيرية."
  },
  {
    question: "معلومات  عن إمكانيات الوصول؟",
    answer: "الملاعب الجديدة مجهزة لذوي الاحتياجات. الترامواي في الرباط والدار البيضاء مناسب للكراسي المتحركة. بعض أجزاء المدن القديمة قد تكون صعبة بسبب الأزقة الضيقة."
  }
];
}
// Keep old structure for compatibility if needed, but we mainly use PRESET_DATA now
export const FAQ_DATA: FAQEntry[] = [];