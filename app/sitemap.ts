import { MetadataRoute } from 'next'

const SITE_URL = 'https://vyapo.tech'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/work`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/alliance`, lastModified: new Date(), priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), priority: 0.7 },
    { url: `${SITE_URL}/pos`, lastModified: new Date(), priority: 0.7 },
    { url: `${SITE_URL}/edtech`, lastModified: new Date(), priority: 0.7 },
    { url: `${SITE_URL}/exam-portal`, lastModified: new Date(), priority: 0.7 },
    { url: `${SITE_URL}/web`, lastModified: new Date(), priority: 0.7 },
    // Work detail pages
    { url: `${SITE_URL}/work/chakhana-by-kilo`, lastModified: new Date(), priority: 0.5 },
    { url: `${SITE_URL}/work/veg-spicy-hut`, lastModified: new Date(), priority: 0.5 },
    { url: `${SITE_URL}/work/gharelu-khana`, lastModified: new Date(), priority: 0.5 },
    { url: `${SITE_URL}/work/rainbow-school`, lastModified: new Date(), priority: 0.5 },
    // Legal
    { url: `${SITE_URL}/privacy`, lastModified: new Date(), priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: new Date(), priority: 0.3 },
  ]
}
