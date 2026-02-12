export async function GET() {
    const baseUrl = "https://bhavyaz-portfolio.vercel.app";

    const staticPages = ["", "projects"];

    const urls = [...staticPages.map((path) => `${baseUrl}/${path}`)];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
            .map(
                (url) => `
<url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
</url>`
            )
            .join("")}
</urlset>`;

    return new Response(sitemap, {
        status: 200,
        headers: {
            "content-type": "application/xml",
            "cache-control": "s-maxage=3600, stale-while-revalidate",
        },
    });
}
