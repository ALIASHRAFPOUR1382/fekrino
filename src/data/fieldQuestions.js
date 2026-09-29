// رشته‌ها:
// math = ریاضی و فیزیک
// science = علوم تجربی
// humanities = علوم انسانی
// tech = فنی و حرفه‌ای / کاردانش

const fields = {
  math: {
    id: 'math',
    title: 'ریاضی و فیزیک',
    icon: '📐',
    color: '#3b82f6',
    desc: 'مناسب برای علاقه‌مندان به محاسبات، منطق و حل مسئله',
    jobs: ['مهندسی', 'برنامه‌نویسی', 'هوش مصنوعی', 'معماری', 'فیزیک', 'ریاضیات'],
  },
  science: {
    id: 'science',
    title: 'علوم تجربی',
    icon: '🧬',
    color: '#10b981',
    desc: 'مناسب برای علاقه‌مندان به پزشکی، زیست و علوم زیستی',
    jobs: ['پزشکی', 'دندانپزشکی', 'داروسازی', 'پرستاری', 'بیوتکنولوژی', 'دامپزشکی'],
  },
  humanities: {
    id: 'humanities',
    title: 'علوم انسانی',
    icon: '📚',
    color: '#f59e0b',
    desc: 'مناسب برای علاقه‌مندان به ادبیات، روانشناسی و علوم اجتماعی',
    jobs: ['حقوق', 'روانشناسی', 'حسابداری', 'اقتصاد', 'روزنامه‌نگاری', 'علوم سیاسی'],
  },
  tech: {
    id: 'tech',
    title: 'فنی و حرفه‌ای / کاردانش',
    icon: '🔧',
    color: '#8b5cf6',
    desc: 'مناسب برای علاقه‌مندان به کارهای عملی و مهارت‌محور',
    jobs: ['الکترونیک', 'مکانیک', 'کامپیوتر', 'گرافیک', 'طراحی دوخت', 'حسابداری فنی'],
  },
}

const questions = [
  {
    q: 'کدام درس را بیشتر دوست داری؟',
    options: [
      { text: 'ریاضی و فیزیک', scores: { math: 3, science: 1, humanities: 0, tech: 1 } },
      { text: 'زیست و شیمی', scores: { math: 1, science: 3, humanities: 0, tech: 1 } },
      { text: 'ادبیات و تاریخ', scores: { math: 0, science: 0, humanities: 3, tech: 1 } },
      { text: 'کارهای عملی و فنی', scores: { math: 1, science: 0, humanities: 0, tech: 3 } },
    ],
  },
  {
    q: 'اوقات فراغتت رو چطور می‌گذرونی؟',
    options: [
      { text: 'حل معما و پازل ریاضی', scores: { math: 3, science: 1, humanities: 0, tech: 1 } },
      { text: 'مطالعه کتاب‌های علمی و زیست‌شناسی', scores: { math: 1, science: 3, humanities: 1, tech: 0 } },
      { text: 'نوشتن داستان یا مقاله', scores: { math: 0, science: 0, humanities: 3, tech: 1 } },
      { text: 'ساختن یا تعمیر وسایل', scores: { math: 1, science: 0, humanities: 0, tech: 3 } },
    ],
  },
  {
    q: 'دوست داری آینده چه شغلی داشته باشی؟',
    options: [
      { text: 'مهندس یا برنامه‌نویس', scores: { math: 3, science: 1, humanities: 0, tech: 2 } },
      { text: 'پزشک یا داروساز', scores: { math: 1, science: 3, humanities: 0, tech: 0 } },
      { text: 'وکیل یا روانشناس', scores: { math: 0, science: 1, humanities: 3, tech: 0 } },
      { text: 'تکنسین یا طراح', scores: { math: 1, science: 0, humanities: 0, tech: 3 } },
    ],
  },
  {
    q: 'کدام نوع مسئله رو راحت‌تر حل می‌کنی؟',
    options: [
      { text: 'مسئله ریاضی و منطقی', scores: { math: 3, science: 1, humanities: 1, tech: 1 } },
      { text: 'تحلیل مسائل زیستی', scores: { math: 1, science: 3, humanities: 0, tech: 0 } },
      { text: 'بحث و استدلال در موضوعات اجتماعی', scores: { math: 0, science: 0, humanities: 3, tech: 0 } },
      { text: 'مسائل عملی و فنی', scores: { math: 1, science: 0, humanities: 0, tech: 3 } },
    ],
  },
  {
    q: 'چه نوع کتابی رو دوست داری بخونی؟',
    options: [
      { text: 'کتاب‌های علمی و فیزیک', scores: { math: 3, science: 1, humanities: 0, tech: 1 } },
      { text: 'کتاب‌های پزشکی و آناتومی', scores: { math: 0, science: 3, humanities: 0, tech: 0 } },
      { text: 'رمان و کتاب‌های تاریخی', scores: { math: 0, science: 0, humanities: 3, tech: 0 } },
      { text: 'کتاب‌های مهارت‌آموزی', scores: { math: 1, science: 0, humanities: 0, tech: 3 } },
    ],
  },
  {
    q: 'کدام فعالیت رو ترجیح می‌دی؟',
    options: [
      { text: 'شرکت در المپیاد ریاضی', scores: { math: 3, science: 1, humanities: 0, tech: 1 } },
      { text: 'شرکت در المپیاد زیست', scores: { math: 0, science: 3, humanities: 0, tech: 0 } },
      { text: 'شرکت در المپیاد ادبی', scores: { math: 0, science: 0, humanities: 3, tech: 0 } },
      { text: 'شرکت در مسابقات مهارتی', scores: { math: 1, science: 0, humanities: 0, tech: 3 } },
    ],
  },
  {
    q: 'کدام ویژگی رو در خودت بیشتر می‌بینی؟',
    options: [
      { text: 'دقت و منطق قوی', scores: { math: 3, science: 2, humanities: 0, tech: 1 } },
      { text: 'کنجکاوی و علاقه به کشف', scores: { math: 1, science: 3, humanities: 1, tech: 1 } },
      { text: 'خلاقیت در بیان و نوشتن', scores: { math: 0, science: 0, humanities: 3, tech: 1 } },
      { text: 'مهارت دست و خلاقیت عملی', scores: { math: 1, science: 0, humanities: 0, tech: 3 } },
    ],
  },
  {
    q: 'از کدام کار لذت می‌بری؟',
    options: [
      { text: 'حل معادلات پیچیده', scores: { math: 3, science: 1, humanities: 0, tech: 1 } },
      { text: 'بررسی و تحقیق در آزمایشگاه', scores: { math: 1, science: 3, humanities: 0, tech: 1 } },
      { text: 'تحلیل مسائل اجتماعی و روانشناختی', scores: { math: 0, science: 1, humanities: 3, tech: 0 } },
      { text: 'تعمیر، ساخت یا طراحی', scores: { math: 1, science: 0, humanities: 0, tech: 3 } },
    ],
  },
  {
    q: 'آینده‌ات رو چطور تصور می‌کنی؟',
    options: [
      { text: 'در یک شرکت مهندسی یا فناوری', scores: { math: 3, science: 1, humanities: 0, tech: 2 } },
      { text: 'در بیمارستان یا مرکز درمانی', scores: { math: 0, science: 3, humanities: 1, tech: 0 } },
      { text: 'در یک دفتر حقوقی یا مرکز مشاوره', scores: { math: 0, science: 1, humanities: 3, tech: 0 } },
      { text: 'در یک کارگاه یا شرکت فنی', scores: { math: 1, science: 0, humanities: 0, tech: 3 } },
    ],
  },
  {
    q: 'کدام روش یادگیری رو ترجیح می‌دی؟',
    options: [
      { text: 'استدلال منطقی و اثبات ریاضی', scores: { math: 3, science: 1, humanities: 1, tech: 0 } },
      { text: 'مشاهده و آزمایش', scores: { math: 1, science: 3, humanities: 0, tech: 1 } },
      { text: 'بحث و گفتگو', scores: { math: 0, science: 0, humanities: 3, tech: 0 } },
      { text: 'تمرین عملی و کارگاهی', scores: { math: 1, science: 0, humanities: 0, tech: 3 } },
    ],
  },
]

export { fields, questions }