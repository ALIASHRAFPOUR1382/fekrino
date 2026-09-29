const achievements = [
  // ============ شروع ============
  { id: 'first-quiz', icon: '🎯', title: 'اولین قدم', desc: 'اولین آزمونت رو کامل کن', condition: (stats) => stats.totalCompleted >= 1 },
  { id: 'first-perfect', icon: '⭐', title: 'نمره کامل', desc: 'یه آزمون رو ۱۰۰٪ بزن', condition: (stats) => stats.perfectScores >= 1 },

  // ============ تعداد آزمون ============
  { id: 'quiz-3', icon: '📝', title: 'مشتاق یادگیری', desc: '۳ آزمون کامل کن', condition: (stats) => stats.totalCompleted >= 3 },
  { id: 'quiz-5', icon: '📚', title: 'کوشا', desc: '۵ آزمون کامل کن', condition: (stats) => stats.totalCompleted >= 5 },
  { id: 'quiz-8', icon: '🏅', title: 'قهرمان', desc: 'همه ۸ آزمون رو کامل کن', condition: (stats) => stats.totalCompleted >= 8 },

  // ============ نمره ============
  { id: 'avg-70', icon: '📈', title: 'پیشرفت', desc: 'میانگین نمره‌ات به ۷۰٪ برسه', condition: (stats) => stats.avgPercent >= 70 && stats.totalCompleted >= 3 },
  { id: 'avg-85', icon: '💎', title: 'نخبه', desc: 'میانگین نمره‌ات به ۸۵٪ برسه', condition: (stats) => stats.avgPercent >= 85 && stats.totalCompleted >= 3 },
  { id: 'avg-95', icon: '👑', title: 'سلطان', desc: 'میانگین نمره‌ات به ۹۵٪ برسه', condition: (stats) => stats.avgPercent >= 95 && stats.totalCompleted >= 5 },

  // ============ رشته‌ای ============
  { id: 'perfect-3', icon: '🔥', title: 'آتشین', desc: '۳ آزمون رو کامل بزن', condition: (stats) => stats.perfectScores >= 3 },
  { id: 'perfect-5', icon: '🌟', title: 'درخشان', desc: '۵ آزمون رو کامل بزن', condition: (stats) => stats.perfectScores >= 5 },

  // ============ تنوع ============
  { id: 'all-cats', icon: '🎨', title: 'همه‌فن‌حریف', desc: 'از هر ۴ دسته آزمون بده', condition: (stats) => stats.uniqueCategories >= 4 },

  // ============ سرعت ============
  { id: 'speed', icon: '⚡', title: 'برق‌آسا', desc: 'یه آزمون رو زیر ۳ دقیقه تموم کن', condition: (stats) => stats.fastestTime > 0 && stats.fastestTime < 180 },

  // ============ پیوستگی ============
  { id: 'streak-3', icon: '🔥', title: 'پیوسته', desc: '۳ روز پشت‌سرهم آزمون بده', condition: (stats) => stats.streak >= 3 },
  { id: 'streak-7', icon: '💪', title: 'استوار', desc: '۷ روز پشت‌سرهم آزمون بده', condition: (stats) => stats.streak >= 7 },
]

export default achievements