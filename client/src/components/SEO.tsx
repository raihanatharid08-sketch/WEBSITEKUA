import { useEffect } from "react";
import { APP_TITLE } from "@/const";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
}

export default function SEO({ 
  title, 
  description = "Website Tanya Jawab Fiqih Islam KUA Kecamatan Pecalungan. Dapatkan jawaban fiqih dari ustadz terpercaya untuk kehidupan sehari-hari Anda.",
  keywords = "KUA Pecalungan, fiqih islam, tanya jawab fiqih, materi fiqih, thaharah, shalat, zakat, puasa, haji, muamalah, munakahat",
  ogImage = "/og-image.png",
  ogType = "website"
}: SEOProps) {
  const pageTitle = title ? `${title} | ${APP_TITLE}` : APP_TITLE;

  useEffect(() => {
    // Update document title
    document.title = pageTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute("content", content);
    };

    // Standard meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Open Graph meta tags
    updateMetaTag("og:title", pageTitle, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:type", ogType, true);
    updateMetaTag("og:image", ogImage, true);
    updateMetaTag("og:url", window.location.href, true);

    // Twitter Card meta tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", pageTitle);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", ogImage);
  }, [pageTitle, description, keywords, ogImage, ogType]);

  return null;
}
