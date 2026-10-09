import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/id/', '/dashboard'] },
    ],
    sitemap: 'https://vyapo.tech/sitemap.xml',
  }
}
