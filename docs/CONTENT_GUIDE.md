# دليل بناء المحتوى بصيغة JSON

كل شريحة تحتاج `id` فريدًا و`type`. العنوان `title` شائع، أما بقية المفاتيح فتختلف حسب النوع. لا تضع HTML داخل البيانات.

## الأنواع النصية

تستخدم الأنواع `title`, `intro`, `content`, `quote`, `question`, `discussion`, `case-study`, `warning`, `tip`, `definition`, `reflection`, `summary`, `resources`, `divider`, `worksheet`, `image`, `video` البنية الأساسية:

```json
{ "id": "unique-id", "type": "content", "title": "عنوان", "body": "نص واضح" }
```

شريحة البداية تقبل `eyebrow`:

```json
{ "id": "m1-start", "type": "title", "eyebrow": "المحور الأول", "title": "العنوان", "body": "وصف مختصر" }
```

## القوائم والخطوات

تستخدم `bullets`, `steps`, `timeline`, `checklist`, `summary` مصفوفة `items`:

```json
{ "id": "steps-1", "type": "steps", "title": "خمس خطوات", "items": ["الأولى", "الثانية"] }
```

## البطاقات والمقارنة

```json
{ "id": "cards-1", "type": "cards", "title": "الخيارات", "items": [{ "title": "الخيار", "body": "الوصف" }] }
```

```json
{ "id": "compare-1", "type": "comparison", "title": "مقارنة", "columns": [{ "title": "الأول", "body": "الوصف" }, { "title": "الثاني", "body": "الوصف" }] }
```

## المثال

```json
{ "id": "example-1", "type": "example", "title": "قبل وبعد", "bad": "صياغة ضعيفة", "good": "صياغة محسنة" }
```

## المؤشرات والجدول

```json
{ "id": "stats-1", "type": "stats", "title": "الأداء", "items": [{ "label": "الرضا", "value": "92%" }] }
```

```json
{ "id": "table-1", "type": "table", "title": "البيانات", "headers": ["المؤشر", "القيمة"], "rows": [["الرضا", "92%"]] }
```

## Prompt

```json
{ "id": "prompt-1", "type": "prompt", "title": "مطالبة جاهزة", "body": "أنت مختص..." }
```

## النشاط

يدعم الحقول: `text`, `textarea`, `select`, `radio`, `checkbox`, `rating`. الإصدار الحالي يعرض text وtextarea وselect مباشرة، وتستطيع إضافة خيارات select عبر `options`.

```json
{
  "id": "activity-slide-1",
  "type": "activity",
  "activity": {
    "id": "activity-1",
    "title": "عنوان النشاط",
    "description": "هدف النشاط",
    "instructions": "تعليمات التنفيذ",
    "duration": "15 دقيقة",
    "fields": [
      { "id": "answer", "label": "إجابتك", "type": "textarea" },
      { "id": "level", "label": "المستوى", "type": "select", "options": ["أولي", "متقدم"] }
    ],
    "tips": ["نصيحة"],
    "example": "مثال",
    "completionCriteria": "إكمال الحقول"
  }
}
```

## الاختبار

تربط الشريحة بالاختبار عبر `quizId`:

```json
{ "id": "quiz-slide", "type": "quiz", "title": "مراجعة", "quizId": "quiz-example" }
```

وفي `data/quizzes.json`:

```json
{
  "id": "quiz-example",
  "title": "اختبار مثال",
  "questions": [{
    "id": "q1",
    "type": "single-choice",
    "question": "السؤال؟",
    "options": ["أ", "ب"],
    "correctAnswer": ["أ"],
    "explanation": "سبب صحة الإجابة"
  }]
}
```

أنواع السؤال: `single-choice`, `multiple-choice`, `true-false`. في الاختيار المتعدد ضع كل الإجابات الصحيحة داخل `correctAnswer`.

## مهمة المشروع

```json
{ "id": "project-1", "type": "project-task", "title": "المشروع", "body": "ابدأ المختبر", "href": "/project" }
```

بعد أي تعديل شغّل `npm run build`. حافظ على المعرّفات القديمة عند تحديث النصوص حتى لا تنفصل ملاحظات المستخدم وتقدمه المحفوظ عن المحتوى.
