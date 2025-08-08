import type { Metadata } from "next"
import { APP_CONFIG } from "./constants"

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: "website" | "article"
}

export function generateSEO({
  title,
  description = APP_CONFIG.description,
  image = `${APP_CONFIG.url}/og-image.png`,
  url = APP_CONFIG.url,
  type = "website",
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${APP_CONFIG.name}` : APP_CONFIG.name

  return {
    title: fullTitle,
    description,
    openGraph: {
      type,
      title: fullTitle,
      description,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      siteName: APP_CONFIG.name,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: APP_CONFIG.social.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  }
}
