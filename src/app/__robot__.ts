import type { MetadataRoute } from 'next'

export default function __robot__(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: 'Googlebot',
                allow: ['/'],
                disallow: '/private/',
            },
            {
                userAgent: ['Applebot', 'Bingbot'],
                disallow: ['/'],
            },
        ],
        sitemap: 'https://hrconnect.vercel.app/sitemap.xml',
    }
}