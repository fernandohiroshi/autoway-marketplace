import type { MetadataRoute } from "next"
import { prisma } from "@/lib/prisma"
import { APP_CONFIG } from "@/lib/constants"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = APP_CONFIG.url

  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/cars`,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 0.9,
    },
  ]

  try {
    
    const cars = await prisma.car.findMany({
      select: {
        id: true,
        updatedAt: true,
      },
      take: 1000, 
    })

    const carPages = cars.map((car) => ({
      url: `${baseUrl}/detail/${car.id}`,
      lastModified: car.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))

    
    const users = await prisma.user.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
      take: 500, 
    })

    const userPages = users.map((user) => ({
      url: `${baseUrl}/user/${user.slug}`,
      lastModified: user.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))

    return [...staticPages, ...carPages, ...userPages]
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return staticPages
  }
}
