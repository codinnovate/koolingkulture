export interface Product {
  _id: string
  name: string
  slug: {
    current: string
  }
  price: number
  originalPrice?: number
  description: string
  category: Category
  images: any[]
  inStock: boolean
  featured?: boolean
  specifications?: { [key: string]: string | undefined }
  brand: string
  relatedProducts?: Product[]
}

export interface Category {
  _id: string
  name: string
  slug: {
    current: string
  }
  description?: string
  image?: any
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}