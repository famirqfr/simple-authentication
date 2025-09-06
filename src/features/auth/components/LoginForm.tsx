"use client";

import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthProvider";
import { isValidIranMobile } from "@/lib/iranPhone";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";

const phoneSchema = z
  .string()
  .min(10, "شماره معتبر نیست")
  .max(14, "شماره معتبر نیست")
  .refine((v) => isValidIranMobile(v), {
    message: "فرمت معتبر: 09xxxxxxxxx | +989xxxxxxxxx | 00989xxxxxxxxx",
  });

const schema = z.object({ mobile: phoneSchema });
type FormValues = z.infer<typeof schema>;

export default function LoginForm() {
  const { loginWithPhone } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { mobile: "" },
  });

  async function onSubmit(values: FormValues) {
    try {
      setSubmitting(true);
      await loginWithPhone(values.mobile);
      router.push("/dashboard");
    } catch (e: any) {
      const msg =
        e?.message === "INVALID_PHONE"
          ? "شماره موبایل نامعتبر است"
          : "خطا در ورود. دوباره تلاش کنید.";
      form.setError("mobile", { message: msg });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="
        min-h-svh grid place-items-center p-4
        bg-[radial-gradient(1200px_600px_at_10%_-10%,hsl(249_92%_92%/.7),transparent),radial-gradient(1200px_600px_at_110%_110%,hsl(199_92%_90%/.6),transparent)]
        dark:bg-[radial-gradient(1200px_600px_at_10%_-10%,hsl(248_34%_20%/.5),transparent),radial-gradient(1200px_600px_at_110%_110%,hsl(199_38%_18%/.45),transparent)]
      "
    >
      <Card
        className="
          w-full max-w-md border border-border/60
          backdrop-blur-md bg-card/70 shadow-[0_10px_30px_rgba(0,0,0,.08)]
          dark:bg-card/60
        "
      >
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-xl font-extrabold tracking-tight">
            ورود به داشبورد
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            لطفاً شماره موبایل خود را وارد کنید
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شماره موبایل</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div
                          className="
                            absolute left-2 top-1/2 -translate-y-1/2
                            pointer-events-none select-none
                            flex items-center justify-center
                            rounded-md border border-border/70 bg-muted
                            p-1 text-muted-foreground
                          "
                        >
                          <Phone className="size-4" />
                        </div>
                        <Input
                          dir="ltr"
                          inputMode="numeric"
                          placeholder="09xxxxxxxxx"
                          className="pl-12 h-11"
                          {...field}
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-11 font-semibold"
                disabled={submitting}
                aria-busy={submitting}
              >
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="size-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                    در حال ورود...
                  </span>
                ) : (
                  "ورود"
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                فرمت‌های مجاز: <span dir="ltr">09xxxxxxxxx</span> ،{" "}
                <span dir="ltr">+989xxxxxxxxx</span> ،{" "}
                <span dir="ltr">00989xxxxxxxxx</span>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
