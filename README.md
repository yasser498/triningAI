# منصة الحقيبة التدريبية التفاعلية

منصة عربية RTL قابلة لإعادة الاستخدام، مبنية بـ React وTypeScript وTailwind/App Router. محتوى الدورة منفصل في ملفات JSON، بينما تُحفظ بيانات المتدرب محليًا عبر IndexedDB مع fallback إلى localStorage. لا تحتاج قاعدة بيانات أو تسجيل دخول.

## التشغيل

```bash
npm install
npm run dev
```

ثم افتح الرابط المحلي الظاهر في الطرفية. للتحقق من نسخة الإنتاج:

```bash
npm run build
npm run lint
npm test
```

## هيكل المحتوى

- `data/course.json`: هوية البرنامج والأهداف والإعدادات العامة.
- `data/days/day-*.json`: الأيام والمحاور والشرائح.
- `data/quizzes.json`: الاختبارات والأسئلة والإجابات والتفسيرات.
- `data/project.json`: خطوات مختبر المشروع.
- `data/prompts.json`: مكتبة المطالبات.
- `data/glossary.json`: قاموس المصطلحات.
- `data/resources.json`: الموارد والقوالب.
- `data/dataset.json`: بيانات النشاط التحليلي.

راجع [دليل المحتوى](docs/CONTENT_GUIDE.md) قبل إضافة نوع جديد.

## إضافة محتوى

1. **يوم:** انسخ ملف يوم، غيّر `id` و`dayNumber`، ثم أضف استيراده إلى `lib/content.ts`.
2. **محور:** أضف كائنًا داخل `modules` في ملف اليوم؛ اجعل `id` فريدًا.
3. **شريحة:** أضف كائنًا إلى `slides`. يختار `SlideRenderer` العرض وفق `type`.
4. **نشاط:** استخدم نوع `activity` مع حقول النموذج الموضحة في الدليل.
5. **اختبار:** أضف الاختبار إلى `quizzes.json` ثم أشر إليه بشريحة `quiz` عبر `quizId`.

## GitHub وVercel

أنشئ مستودع GitHub فارغًا، ثم من مجلد المشروع:

```bash
git add .
git commit -m "Build interactive Arabic training platform"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

في Vercel اختر **Add New Project**، استورد المستودع، واترك إعدادات البناء الافتراضية للمشروع. لا توجد متغيرات بيئة مطلوبة. كل بيانات المتدرب تبقى في متصفحه، لذلك يجب تنبيه المستخدم إلى تصدير نسخة احتياطية قبل حذف بيانات المتصفح.

## الخصوصية وPWA

يسجل Service Worker الأصول والصفحات الأساسية للاستخدام قدر الإمكان دون اتصال بعد الزيارة الأولى. لا تضع بيانات شخصية في ملفات المحتوى، ولا تضف أدوات تتبع دون تحديث سياسة الخصوصية وموافقة واضحة.
