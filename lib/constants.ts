export const APP_CONFIG = {
  name: "AutoWay",
  description: "O marketplace de carros mais confiável do Brasil",
  url: process.env.NEXTAUTH_URL || "http://localhost:3000",
  version: "1.0.0",
  author: "AutoWay Team",
  social: {
    twitter: "@autoway",
    instagram: "@autoway_oficial",
    facebook: "AutoWayBrasil",
  },
}

export const PAGINATION = {
  defaultLimit: 12,
  maxLimit: 50,
}

export const UPLOAD_LIMITS = {
  maxImages: 5,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
}

export const CACHE_TAGS = {
  cars: "cars",
  users: "users",
  profile: "profile",
  stats: "admin-stats",
}
