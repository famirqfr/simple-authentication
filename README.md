حتماً! این محتوا رو عیناً داخل فایل `README.md` بذار:

````markdown
# 📱 Simple Auth App (Next.js + Tailwind)

اپ نمونه‌ی **ورود با شماره موبایل ایران** با ذخیره‌سازی دیتای کاربر در **localStorage** و نمایش در **Dashboard**.  
ساخته‌شده با **Next.js App Router + TypeScript + TailwindCSS v4** و کامپوننت‌های **shadcn/ui**.

---

## ✨ Features
- ورود با موبایل ایران (فرمت‌های معتبر: `09xxxxxxxxx`، `+989xxxxxxxxx`، `00989xxxxxxxxx`)
- اعتبارسنجی سمت کلاینت با **zod + react-hook-form**
- فراخوانی API تستی: `https://randomuser.me/api/?results=1&nat=us`
- ذخیره‌سازی `user` و `isAuthenticated` در **localStorage**
- Dashboard با خوشامدگویی و دکمه **Logout** (پاک‌سازی storage و بازگشت به Login)
- UI مدرن، ریسپانسیو (mobile-first)، دسترس‌پذیر

---

## ⚙️ Tech Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 (فقط Tailwind برای استایل)
- shadcn/ui (Button, Card, Input, Form)
- react-hook-form + zod (ولیدیشن)
- (اختیاری) zustand

---

## 📂 Project Structure
```bash
src/
  app/
    layout.tsx              # Root layout + metadata
    globals.css             # Tailwind + theme tokens
    login/page.tsx          # صفحه Login (فرم شماره ایران)
    dashboard/page.tsx      # صفحه Dashboard
  components/
    ui/                     # Button, Card, Input, Form, ...
  features/
    auth/
      providers/AuthProvider.tsx
      hooks/useAuth.ts
      services/userService.ts
      types.ts
      constants.ts
  lib/
    iranPhone.ts            # اعتبارسنجی/نرمال‌سازی شماره ایران
````

---

## 🚀 Getting Started

### 1) نصب

```bash
pnpm install
```

> مطمئن شوید PostCSS برای Tailwind v4 تنظیم شده:
>
> ```js
> // postcss.config.js
> export default {
>   plugins: { "@tailwindcss/postcss": {} },
> };
> ```
>
> و در `globals.css`:
>
> ```css
> @import "tailwindcss";
> /* theme tokens + base styles ... */
> ```

### 2) اجرا (Development)

```bash
pnpm dev
```

رفتن به: [http://localhost:3000](http://localhost:3000)

### 3) Build & Start (Production)

```bash
pnpm build
pnpm start
```

---

## 🔄 User Flow

1. کاربر به `/login` می‌رود، شماره موبایل معتبر ایران را وارد می‌کند و **Login** را می‌زند.
2. اپ از `randomuser.me` یک کاربر تستی می‌گیرد و همراه با شماره موبایل در **localStorage** ذخیره می‌کند.
3. ریدایرکت به `/dashboard`.
4. Dashboard پیام خوشامد با **نام کاربر** را نشان می‌دهد.
5. دکمه **Logout** همه‌چیز را پاک می‌کند و کاربر را به `/login` برمی‌گرداند.
6. اگر کاربر بدون ورود مستقیم به `/dashboard` برود → **redirect به `/login`**.

---

## 🧩 UI Components (Tailwind)

* **Input**: همراه با Label، حالت خطا، focus style، و اعتبارسنجی.
* **Button**: حالت primary، disabled، و loading (با `aria-busy`).

---

## ♿ Accessibility

* ارتباط `label` با `input` (با `htmlFor`)
* `aria-invalid` برای پیام خطا
* `focus-visible` states واضح
* کنتراست مناسب با theme tokens

---

## 📘 Scripts

```jsonc
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build --turbopack",
  "start": "next start",
  "lint": "eslint",
  "format": "prettier -w .",
  "typecheck": "tsc --noEmit"
}
```

---

## ✅ Acceptance Criteria

* [ ] ورودی موبایل فقط سه فرمت مجاز را قبول کند و پیام خطای مناسب بدهد.
* [ ] کلیک روی Login تا وقتی ورودی معتبر نیست، API نزند.
* [ ] ذخیره‌ی `{ name, email, picture, phone }` در `localStorage.user` و `isAuthenticated=true`.
* [ ] ورود به `/dashboard` بدون داده‌ی کاربر → redirect به `/login`.
* [ ] Logout → پاک‌سازی کامل و بازگشت به Login.
* [ ] UI ریسپانسیو و دسترس‌پذیر (focus/disabled/loading درست).
* [ ] کد تمیز، نام‌گذاری یکدست، پوشه‌بندی feature-based.

---

## 📝 Notes

* برای RTL می‌توانید در `layout.tsx` از `<html lang="fa" dir="rtl">` استفاده کنید.
* theme tokens (مثل `--background`, `--foreground`, `--input`, `--ring`) در `globals.css` تنظیم شده تا کامپوننت‌های shadcn ظاهری سازگار داشته باشند.

---

```
```
