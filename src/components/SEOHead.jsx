import { useEffect } from 'react'
import site from '../data/site'

const pageMeta = {
  home: {
    title: `${site.brand} | آموزش هوش، استعداد تحلیلی و ریاضی`,
    desc: `آموزش تخصصی هوش و استعداد تحلیلی برای آزمون‌های تیزهوشان با تدریس ${site.instructor}. ${site.stats.passRate}٪ قبولی دانش‌آموزان.`,
  },
  free: {
    title: `آموزش‌های رایگان | ${site.brand}`,
    desc: 'نمونه تدریس‌های رایگان هوش و استعداد تحلیلی — ۹ جلسه نمونه از دوره جامع تیزهوشان.',
  },
  tizhoushan: {
    title: `دوره جامع تیزهوشان ۹۶ جلسه | ${site.brand}`,
    desc: 'دوره کامل هوش و استعداد تحلیلی با ۹۶ جلسه ویدیویی، آزمون شبیه‌ساز و پشتیبانی مستقیم.',
  },
  math: {
    title: `آموزش ریاضی پایه‌به‌پایه | ${site.brand}`,
    desc: 'پکیج‌های آموزش ریاضی پایه چهارم تا نهم با تدریس مهندس علی اشرفپور.',
  },
  reviews: {
    title: `نظرات والدین و دانش‌آموزان | ${site.brand}`,
    desc: 'بیش از ۵۰ نظر واقعی از والدین و دانش‌آموزانی که با مؤسسه فکرینو همراه بوده‌اند.',
  },
  results: {
    title: `نتایج و قبولی‌ها | ${site.brand}`,
    desc: `گالری قبولی‌های تیزهوشان با ${site.stats.passRate}٪ قبولی و ${site.stats.sixthMatch}٪ تطابق پایه ششم.`,
  },
  about: {
    title: `درباره ما | ${site.brand}`,
    desc: `درباره ${site.instructor} — مدرس هوش و استعداد تحلیلی و بنیان‌گذار مؤسسه فکرینو.`,
  },
}

export default function SEOHead({ route }) {
  useEffect(() => {
    const meta = pageMeta[route] || pageMeta.home
    document.title = meta.title

    // meta description
    let descTag = document.querySelector('meta[name="description"]')
    if (!descTag) {
      descTag = document.createElement('meta')
      descTag.setAttribute('name', 'description')
      document.head.appendChild(descTag)
    }
    descTag.setAttribute('content', meta.desc)

    // og:title
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', meta.title)

    // og:description
    let ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', meta.desc)
  }, [route])

  return null
}