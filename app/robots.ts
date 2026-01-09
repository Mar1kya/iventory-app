import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://iventory-app-ivory.vercel.app'

  return {
    rules: {
      userAgent: '*', 
      allow: '/',     
      disallow: [
        '/dashboard/',  
        '/inventory/',  
        '/settings/',   
        '/add-product/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`, 
  }
}