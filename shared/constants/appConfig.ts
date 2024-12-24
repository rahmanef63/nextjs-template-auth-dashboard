export const appConfig = {
  name: 'Next.js Enterprise',
  description: 'Enterprise-grade Next.js application template',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
} as const;