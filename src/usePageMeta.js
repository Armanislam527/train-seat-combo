import { useEffect } from "react";

const SITE_ORIGIN = "https://trainseatchecker.tech";

export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    if (description) {
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", description);
    }
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", `${SITE_ORIGIN}${path}`);
  }, [title, description]);
}
