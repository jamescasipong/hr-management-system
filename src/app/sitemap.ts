import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    // Base URL for production
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://hrconnect.vercel.app";

    // Current date for lastModified
    const currentDate = new Date();

    // Routes extracted from the folder structure in the images
    const routes = [
        { path: "/", priority: 1.0, changeFrequency: "yearly" },
        { path: "/auth", priority: 0.9, changeFrequency: "monthly" },
        //
        // // Dashboard section and its subroutes
        // { path: "/dashboard", priority: 0.9, changeFrequency: "weekly" },
        // { path: "/dashboard/admin", priority: 0.8, changeFrequency: "weekly" },
        // { path: "/dashboard/attendance", priority: 0.8, changeFrequency: "daily" },
        // { path: "/dashboard/billing", priority: 0.8, changeFrequency: "monthly" },
        // { path: "/dashboard/dashboard", priority: 0.9, changeFrequency: "daily" },
        // { path: "/dashboard/leaves", priority: 0.8, changeFrequency: "daily" },
        // { path: "/dashboard/overtimes", priority: 0.8, changeFrequency: "daily" },
        // { path: "/dashboard/payroll", priority: 0.8, changeFrequency: "weekly" },
        // { path: "/dashboard/profile", priority: 0.7, changeFrequency: "monthly" },
        // { path: "/dashboard/profile/user", priority: 0.7, changeFrequency: "monthly" },
        // { path: "/dashboard/usersettings", priority: 0.7, changeFrequency: "monthly" },

        // API Reference section and its subroutes
        { path: "/api-reference", priority: 0.7, changeFrequency: "monthly" },
        { path: "/api-reference/faq", priority: 0.7, changeFrequency: "monthly" },
        { path: "/api-reference/integration", priority: 0.7, changeFrequency: "monthly" },
        { path: "/api-reference/quick-start", priority: 0.8, changeFrequency: "monthly" },
        { path: "/api-reference/rest", priority: 0.7, changeFrequency: "monthly" },
        { path: "/api-reference/updates", priority: 0.7, changeFrequency: "weekly" },
        { path: "/api-reference/videos", priority: 0.6, changeFrequency: "monthly" },

        { path: "/api-status", priority: 0.7, changeFrequency: "daily" },
        { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
        { path: "/contact-us", priority: 0.8, changeFrequency: "monthly" },
        { path: "/cookies", priority: 0.5, changeFrequency: "yearly" },
        { path: "/documentation", priority: 0.8, changeFrequency: "monthly" },
        { path: "/features", priority: 0.8, changeFrequency: "monthly" },
        { path: "/free-trial", priority: 0.9, changeFrequency: "monthly" },
        { path: "/guides", priority: 0.8, changeFrequency: "monthly" },
        { path: "/home", priority: 1.0, changeFrequency: "weekly" },
        { path: "/integrations", priority: 0.8, changeFrequency: "monthly" },
        { path: "/press", priority: 0.7, changeFrequency: "monthly" },
        { path: "/privacy", priority: 0.6, changeFrequency: "yearly" },
        { path: "/security", priority: 0.6, changeFrequency: "yearly" },
        { path: "/terms", priority: 0.6, changeFrequency: "yearly" },
        { path: "/updates", priority: 0.8, changeFrequency: "weekly" },
        { path: "/login", priority: 0.9, changeFrequency: "monthly" }
    ];

    // Generate sitemap entries
    return routes.map(route => ({
        url: `${baseUrl}${route.path}`,
        lastModified: currentDate,
        changeFrequency: route.changeFrequency as "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never",
        priority: route.priority
    }));
}