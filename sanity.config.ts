import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

// Define the schema
const productSchema = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive()
    },
    {
      name: 'originalPrice',
      title: 'Original Price',
      type: 'number',
      validation: (Rule: any) => Rule.positive()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'object',
      fields: [
        { name: 'key', type: 'string', title: 'Key' },
        { name: 'value', type: 'string', title: 'Value' }
      ]
    }
  ]
}

const categorySchema = {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image'
    }
  ]
}

const orderSchema = {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email()
    },
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{ type: 'product' }]
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              validation: (Rule: any) => Rule.required().min(1)
            },
            {
              name: 'price',
              title: 'Price at Purchase',
              type: 'number',
              validation: (Rule: any) => Rule.required().min(0)
            }
          ]
        }
      ],
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'totalAmount',
      title: 'Total Amount',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0)
    },
    {
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Processing', value: 'processing' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' }
        ]
      },
      initialValue: 'pending',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'object',
      fields: [
        { name: 'street', title: 'Street', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'state', title: 'State', type: 'string' },
        { name: 'zipCode', title: 'Zip Code', type: 'string' },
        { name: 'country', title: 'Country', type: 'string' }
      ]
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ]
}

export default defineConfig({
  name: 'koolingkulture-shop',
  title: 'KoolingKulture Shop',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: [productSchema, categorySchema, orderSchema]
  }
})