import type { MetadataRoute } from "next";


export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
          url: 'http://localhost:3000/',
          lastModified: new Date(),
          changeFrequency: 'yearly',
          priority: 1,
        },
        {
          url: 'https://hrconnect.vercel.app/login',
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        },
        {
          url: 'http://localhost:3000/cookies',
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.5,
        },
      ]
}