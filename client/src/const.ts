export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "Website Tanya Jawab Fiqih KUA";

export const APP_LOGO = "https://placehold.co/128x128/059669/FFFFFF?text=KUA";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  // For local development without OAuth, redirect to admin login page
  return "/admin/login";
};

// KUA Contact Information
export const KUA_WHATSAPP = "6282313746691";
export const KUA_EMAIL = "kuapecalungan15@gmail.com";
export const KUA_MAPS_LINK = "https://maps.app.goo.gl/7Nq7FUTg6GG57skKA";
export const KUA_NAME = "KUA Kecamatan Pecalungan";
export const KUA_ADDRESS = "Kecamatan Pecalungan, Batang, Jawa Tengah";
