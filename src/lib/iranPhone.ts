const re09 = /^09\d{9}$/;
const rePlus = /^\+989\d{9}$/;
const re0098 = /^00989\d{9}$/;

export function isValidIranMobile(input: string): boolean {
  const v = input.trim();
  return re09.test(v) || rePlus.test(v) || re0098.test(v);
}

export function normalizeTo09(input: string): string | null {
  const v = input.trim();
  if (re09.test(v)) return v;
  if (rePlus.test(v)) return "0" + v.slice(3);
  if (re0098.test(v)) return "0" + v.slice(4);
  return null;
}
