# مؤسسه فکرینو | Fekrino Academy

وب‌سایت React + Vite مؤسسه فکرینو با مدیریت مهندس علی اشرفپور.

## اجرا
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## GitHub Pages
نام ریپو را `fekrino` قرار دهید تا `base` فعلی Vite درست باشد. سپس:
```bash
git init
git add .
git commit -m "feat: launch Fekrino Academy website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fekrino.git
git push -u origin main
```
در GitHub از Settings → Pages، منبع را روی GitHub Actions بگذارید. Workflow پروژه به‌صورت خودکار build و deploy می‌کند.

## شخصی‌سازی
- تصاویر کارنامه‌ها: `public/results/`
- ویدیوها: `src/data/lessons.js`
- نتایج: `src/data/results.js`
- نظرات: `src/data/reviews.js`
- رنگ و ظاهر: `src/styles/global.css`
