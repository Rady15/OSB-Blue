"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { type Resolver, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";

export const consultationSchema = z.object({
  fullName: z.string().min(3, "الاسم مطلوب"),
  phone: z.string().regex(/^05\d{8}$/, "رقم جوال سعودي غير صحيح"),
  email: z.string().email("بريد إلكتروني غير صحيح"),
  businessNature: z.string().optional(),
});

const compactSchema = consultationSchema.pick({ fullName: true, phone: true });

export type ConsultationFormData = z.infer<typeof consultationSchema>;

type ConsultationFormProps = {
  compact?: boolean;
  light?: boolean;
};

export function ConsultationForm({ compact = false, light = true }: ConsultationFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const schema = compact ? compactSchema : consultationSchema;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(schema) as unknown as Resolver<ConsultationFormData>,
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      businessNature: "",
    },
  });

  const onSubmit = async (data: Partial<ConsultationFormData>) => {
    setStatus("idle");
    const response = await fetch("/api/consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email ?? "",
        businessNature: data.businessNature ?? "",
      }),
    });
    setStatus(response.ok ? "success" : "error");
  };

  const inputClass = `w-full rounded-2xl border px-5 py-4 outline-none transition focus:border-[#2563eb] ${
    light ? "border-white/15 bg-white/10 text-white placeholder:text-white/45" : "border-white/15 bg-white/10 text-white placeholder:text-white/45"
  }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div>
        <input className={inputClass} placeholder="الاسم الكامل" {...register("fullName")} />
        {errors.fullName ? <p className="mt-2 text-sm text-red-500">{errors.fullName.message}</p> : null}
      </div>
      <div>
        <input className={inputClass} placeholder="رقم الجوال / واتساب" {...register("phone")} />
        {errors.phone ? <p className="mt-2 text-sm text-red-500">{errors.phone.message}</p> : null}
      </div>
      {!compact ? (
        <>
          <div>
            <input className={inputClass} placeholder="البريد الإلكتروني" {...register("email")} />
            {errors.email ? <p className="mt-2 text-sm text-red-500">{errors.email.message}</p> : null}
          </div>
          <textarea className={`${inputClass} min-h-36 resize-none`} placeholder="طبيعة نشاطك أو فكرتك" {...register("businessNature")} />
        </>
      ) : null}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "جارٍ الإرسال..." : "احجز الاستشارة"}
      </Button>
      {status === "success" ? (
        <p className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm font-bold text-white">
          <CheckCircle2 className="h-5 w-5" />
          تم استلام طلبك بنجاح، سيتواصل معك فريقنا قريباً.
        </p>
      ) : null}
      {status === "error" ? <p className="text-sm font-bold text-red-500">تعذر إرسال الطلب حالياً. حاول مرة أخرى.</p> : null}
    </form>
  );
}
