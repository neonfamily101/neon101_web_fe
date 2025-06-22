// utils/isIOS.ts
export function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  return /iPhone|iPad|iPod/.test(navigator.userAgent);
}
