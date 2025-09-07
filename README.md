# 📱 Simple Auth App (Next.js + Tailwind)

Sample app for **login with Iranian mobile number**, storing user data in **localStorage** and displaying it in a **Dashboard**.
Built with **Next.js App Router + TypeScript + TailwindCSS v4** and **shadcn/ui** components.

---

## ✨ Features

* Login with Iranian mobile number (valid formats: `09xxxxxxxxx`, `+989xxxxxxxxx`, `00989xxxxxxxxx`)
* Client-side validation using **zod + react-hook-form**
* Test API call: `https://randomuser.me/api/?results=1&nat=us`
* Store `user` and `isAuthenticated` in **localStorage**
* Dashboard with welcome message and **Logout** button (clears storage and redirects to Login)
* Modern, responsive (mobile-first), accessible UI

---

## ⚙️ Tech Stack

* Next.js 15 (App Router) + TypeScript
* Tailwind CSS v4 (only Tailwind for styling)
* shadcn/ui (Button, Card, Input, Form)
* react-hook-form + zod (validation)
* (Optional) zustand

---

## 📂 Project Structure

```bash
src/
  app/
    layout.tsx              # Root layout + metadata
    globals.css             # Tailwind + theme tokens
    login/page.tsx          # Login page (Iran phone form)
    dashboard/page.tsx      # Dashboard page
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
    iranPhone.ts            # Iran phone validation/normalization
```

---

## 🚀 Getting Started

### 1) Install

```bash
pnpm install
```

> Make sure PostCSS is set up for Tailwind v4:
>
> ```js
> // postcss.config.js
> export default {
>   plugins: { "@tailwindcss/postcss": {} },
> };
> ```
>
> And in `globals.css`:
>
> ```css
> @import "tailwindcss";
> /* theme tokens + base styles ... */
> ```

### 2) Run (Development)

```bash
pnpm dev
```

Open: [http://localhost:3000](http://localhost:3000)

### 3) Build & Start (Production)

```bash
pnpm build
pnpm start
```

---

## 🔄 User Flow

1. User goes to `/login`, enters a valid Iranian phone number, and clicks **Login**.
2. The app fetches a test user from `randomuser.me` and stores it along with the phone number in **localStorage**.
3. Redirects to `/dashboard`.
4. Dashboard shows a welcome message with the **user’s name**.
5. **Logout** clears everything and redirects to `/login`.
6. If the user tries to access `/dashboard` without being logged in → **redirect to `/login`**.

---

## 🧩 UI Components (Tailwind)

* **Input**: with Label, error state, focus style, and validation.
* **Button**: primary, disabled, and loading states (with `aria-busy`).

---

## ♿ Accessibility

* Connect `label` with `input` (via `htmlFor`)
* `aria-invalid` for error messages
* Clear `focus-visible` states
* Proper contrast using theme tokens

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

* [ ] Phone input only accepts the three valid formats and shows proper error messages.
* [ ] Clicking Login does not trigger API unless input is valid.
* [ ] Save `{ name, email, picture, phone }` in `localStorage.user` and set `isAuthenticated=true`.
* [ ] Accessing `/dashboard` without user data → redirect to `/login`.
* [ ] Logout → fully clear data and return to Login.
* [ ] Responsive, accessible UI (focus/disabled/loading states work correctly).
* [ ] Clean code, consistent naming, feature-based folder structure.

---

## 📝 Notes

* For RTL support, you can use `<html lang="fa" dir="rtl">` in `layout.tsx`.
* Theme tokens (e.g., `--background`, `--foreground`, `--input`, `--ring`) are set in `globals.css` so shadcn components look consistent.