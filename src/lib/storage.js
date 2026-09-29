const KEY = 'fekrino-quiz-stats'
const KEY_HISTORY = 'fekrino-quiz-history'

export function getStats() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : defaultStats()
  } catch {
    return defaultStats()
  }
}

function defaultStats() {
  return {
    totalCompleted: 0,
    perfectScores: 0,
    totalScore: 0,
    totalQuestions: 0,
    avgPercent: 0,
    uniqueCategories: 0,
    fastestTime: 0,
    streak: 0,
    lastPlayedDate: null,
    quizzesTaken: [],
  }
}

export function getHistory() {
  try {
    const raw = localStorage.getItem(KEY_HISTORY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveQuizResult(result) {
  // result: { quizId, quizTitle, score, total, percent, timeSpent, category }
  const stats = getStats()
  const history = getHistory()

  // محاسبه مجدد
  const today = new Date().toDateString()
  const yesterday = new Date(Date.now() - 86400000).toDateString()

  let newStreak = stats.streak
  if (stats.lastPlayedDate === today) {
    // امروز قبلاً بازی کرده، استریک تغییر نمی‌کنه
  } else if (stats.lastPlayedDate === yesterday) {
    newStreak = stats.streak + 1
  } else {
    newStreak = 1
  }

  const newStats = {
    totalCompleted: stats.totalCompleted + 1,
    perfectScores: stats.perfectScores + (result.percent === 100 ? 1 : 0),
    totalScore: stats.totalScore + result.score,
    totalQuestions: stats.totalQuestions + result.total,
    avgPercent: Math.round(
      ((stats.totalScore + result.score) / (stats.totalQuestions + result.total)) * 100
    ),
    uniqueCategories: new Set([...history.map((h) => h.category), result.category]).size,
    fastestTime:
      stats.fastestTime === 0
        ? result.timeSpent
        : Math.min(stats.fastestTime, result.timeSpent),
    streak: newStreak,
    lastPlayedDate: today,
    quizzesTaken: [...new Set([...stats.quizzesTaken, result.quizId])],
  }

  localStorage.setItem(KEY, JSON.stringify(newStats))

  const newHistory = [
    { ...result, date: new Date().toISOString() },
    ...history,
  ].slice(0, 50) // فقط ۵۰ تای آخر

  localStorage.setItem(KEY_HISTORY, JSON.stringify(newHistory))

  return { stats: newStats, history: newHistory }
}

export function resetStats() {
  localStorage.removeItem(KEY)
  localStorage.removeItem(KEY_HISTORY)
}