// Mapping ilustrasi untuk setiap kategori materi fiqih
export const categoryIllustrations: Record<string, string> = {
  'thaharah': '/illustrations/thaharah.png',
  'shalat': '/illustrations/shalat.png',
  'zakat': '/illustrations/zakat.png',
  'puasa': '/illustrations/puasa.png',
  'haji': '/illustrations/haji.png',
  'muamalah': '/illustrations/muamalah.png',
  'munakahat': '/illustrations/munakahat.png',
};

export function getCategoryIllustration(slug: string): string {
  return categoryIllustrations[slug] || '/illustrations/default.png';
}
