import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'zsykh7y7', 
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-08-06', 
})
