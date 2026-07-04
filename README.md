# OSB — One Stop Business

موقع عربي RTL مبني بـ Next.js 14 وTailwind CSS 3 حسب مواصفة `SPEC.md`.

## التشغيل المحلي

```bash
pnpm install
node node_modules\next\dist\bin\next dev -p 3001
```

افتح `http://localhost:3001`.

## البناء

```bash
node node_modules\next\dist\bin\next build
```

## إضافة خدمة جديدة

عدّل ملف `data/services.ts` فقط. صفحة قائمة الخدمات وصفحات الخدمات الفرعية يتم توليدها تلقائياً من نفس الملف.

## الملفات المهمة

- `IMPLEMENTATION_STEPS.md`: سجل التنفيذ والخطوات التالية لأي وكيل يكمل.
- `data/services.ts`: مصدر بيانات الخدمات الثمانية.
- `components/forms/ConsultationForm.tsx`: نموذج الاستشارة والتحقق العربي.
- `app/api/consultation/route.ts`: نقطة استقبال طلبات الاستشارة الأولية.
