import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ queries
export const PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  slug,
  price,
  originalPrice,
  description,
  category->{
    _id,
    name,
    slug
  },
  images,
  inStock,
  featured,
  specifications,
  brand
}`

export const PRODUCT_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  price,
  originalPrice,
  description,
  category->{
    _id,
    name,
    slug
  },
  images,
  inStock,
  featured,
  specifications,
  brand,
  relatedProducts[]->{
    _id,
    name,
    slug,
    price,
    images[0]
  }
}`

export const CATEGORIES_QUERY = `*[_type == "category"] | order(name asc) {
  _id,
  name,
  slug,
  description,
  image
}`

export const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && featured == true] | order(_createdAt desc) [0...6] {
  _id,
  name,
  slug,
  price,
  originalPrice,
  description,
  category->{
    _id,
    name,
    slug
  },
  images,
  inStock,
  brand
}`