"use client";

import { useState, useEffect } from 'react'
import { ShoppingCart, Filter, Search, Star, Truck, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { client, PRODUCTS_QUERY, CATEGORIES_QUERY, FEATURED_PRODUCTS_QUERY } from '@/lib/sanity'
import { Product, Category } from '@/lib/types'
import { useAppDispatch } from '@/store'
import { addItem } from '@/store/slices/cartSlice'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('newest')
  const dispatch = useAppDispatch()

  // Mock data for demo purposes
  const mockCategories: Category[] = [
    { _id: '1', name: 'Air Conditioners', slug: { current: 'air-conditioners' }, description: 'Central and window AC units' },
    { _id: '2', name: 'Heating Systems', slug: { current: 'heating-systems' }, description: 'Furnaces and heat pumps' },
    { _id: '3', name: 'Thermostats', slug: { current: 'thermostats' }, description: 'Smart and programmable thermostats' },
    { _id: '4', name: 'Air Filters', slug: { current: 'air-filters' }, description: 'HEPA and standard filters' },
    { _id: '5', name: 'Ductwork', slug: { current: 'ductwork' }, description: 'Ducts and ventilation components' },
    { _id: '6', name: 'Tools & Parts', slug: { current: 'tools-parts' }, description: 'Professional HVAC tools and parts' }
  ]

  const mockProducts: Product[] = [
    {
      _id: '1',
      name: 'Carrier 24ACC6 Central Air Conditioner',
      slug: { current: 'carrier-24acc6-central-ac' },
      price: 2499,
      originalPrice: 2799,
      description: 'High-efficiency central air conditioning unit with 16 SEER rating. Perfect for homes up to 2000 sq ft.',
      category: mockCategories[0],
      images: ['https://images.pexels.com/photos/8005399/pexels-photo-8005399.jpeg'],
      inStock: true,
      featured: true,
      brand: 'Carrier',
      specifications: {
        'SEER Rating': '16',
        'BTU/Hour': '36,000',
        'Coverage': 'Up to 2000 sq ft',
        'Warranty': '10 years'
      }
    },
    {
      _id: '2',
      name: 'Nest Learning Thermostat',
      slug: { current: 'nest-learning-thermostat' },
      price: 249,
      originalPrice: 299,
      description: 'Smart thermostat that learns your schedule and programs itself. Energy Star certified.',
      category: mockCategories[2],
      images: ['https://images.pexels.com/photos/7031591/pexels-photo-7031591.jpeg'],
      inStock: true,
      featured: true,
      brand: 'Google Nest',
      specifications: {
        'Connectivity': 'Wi-Fi',
        'Compatibility': 'Most HVAC systems',
        'Display': '2.08" color display',
        'Warranty': '2 years'
      }
    },
    {
      _id: '3',
      name: 'Rheem Performance Plus Gas Furnace',
      slug: { current: 'rheem-performance-plus-furnace' },
      price: 1899,
      description: 'High-efficiency gas furnace with 96% AFUE rating. Quiet operation and reliable heating.',
      category: mockCategories[1],
      images: ['https://images.pexels.com/photos/5691636/pexels-photo-5691636.jpeg'],
      inStock: true,
      featured: true,
      brand: 'Rheem',
      specifications: {
        'AFUE Rating': '96%',
        'BTU Input': '80,000',
        'Stages': 'Two-stage',
        'Warranty': '10 years'
      }
    },
    {
      _id: '4',
      name: 'Honeywell HEPA Air Filter',
      slug: { current: 'honeywell-hepa-filter' },
      price: 29,
      description: 'True HEPA filter captures 99.97% of particles. Compatible with most HVAC systems.',
      category: mockCategories[3],
      images: ['https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg'],
      inStock: true,
      brand: 'Honeywell',
      specifications: {
        'Filter Type': 'True HEPA',
        'Efficiency': '99.97%',
        'Size': '20x25x4',
        'Lifespan': '6-12 months'
      }
    },
    {
      _id: '5',
      name: 'Flexible Insulated Ductwork',
      slug: { current: 'flexible-insulated-ductwork' },
      price: 89,
      description: 'R-6 insulated flexible ductwork, 25 feet. Perfect for residential installations.',
      category: mockCategories[4],
      images: ['https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg'],
      inStock: true,
      brand: 'Master Flow',
      specifications: {
        'Insulation': 'R-6',
        'Length': '25 feet',
        'Diameter': '8 inch',
        'Material': 'Polyester'
      }
    },
    {
      _id: '6',
      name: 'Professional HVAC Tool Kit',
      slug: { current: 'professional-hvac-tool-kit' },
      price: 299,
      description: 'Complete tool kit for HVAC professionals. Includes gauges, wrenches, and diagnostic tools.',
      category: mockCategories[5],
      images: ['https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg'],
      inStock: true,
      brand: 'Klein Tools',
      specifications: {
        'Pieces': '45 tools',
        'Case': 'Hard carrying case',
        'Warranty': 'Lifetime',
        'Professional': 'Grade'
      }
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData, featuredData] = await Promise.all([
          client.fetch(PRODUCTS_QUERY),
          client.fetch(CATEGORIES_QUERY),
          client.fetch(FEATURED_PRODUCTS_QUERY)
        ])
        
        setProducts(productsData || [])
        setCategories(categoriesData || [])
        setFeaturedProducts(featuredData || [])
      } catch (error) {
        console.error('Error fetching shop data:', error)
        // Set mock data for demo
        setProducts(mockProducts)
        setCategories(mockCategories)
        setFeaturedProducts(mockProducts.slice(0, 3))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [mockProducts, mockCategories])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category._id === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '',
      quantity: 1
    }
    dispatch(addItem(cartItem))
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="shop" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-sky-100 text-sky-800 rounded-full text-sm font-medium mb-4">
            🛒 HVAC Equipment Store
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Professional HVAC Equipment
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Shop our extensive collection of high-quality HVAC equipment, parts, and tools. 
            Professional-grade products with competitive pricing and expert support.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <Truck className="w-8 h-8 text-sky-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Free Shipping</h3>
            <p className="text-sm text-gray-600">On orders over $500</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Warranty Included</h3>
            <p className="text-sm text-gray-600">Manufacturer warranties</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <Star className="w-8 h-8 text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Expert Support</h3>
            <p className="text-sm text-gray-600">Professional guidance</p>
          </div>
        </div>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Featured Products</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <Card key={product._id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.images?.[0] || 'https://images.pexels.com/photos/8005399/pexels-photo-8005399.jpeg'}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.originalPrice && (
                      <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                        Save ${product.originalPrice - product.price}
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {product.category.name}
                      </Badge>
                      <div className="text-right">
                        {product.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            ${product.originalPrice}
                          </div>
                        )}
                        <div className="text-lg font-bold text-sky-600">
                          ${product.price}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 line-clamp-2">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{product.brand}</span>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="bg-sky-600 hover:bg-sky-700 text-white"
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {sortedProducts.length} products found
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Card key={product._id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
              <div className="relative">
                <Image
                  src={product.images?.[0] || 'https://images.pexels.com/photos/8005399/pexels-photo-8005399.jpeg'}
                  alt={product.name}
                  width={300}
                  height={160}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.originalPrice && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                    Save ${product.originalPrice - product.price}
                  </Badge>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-1">
                  <Badge variant="secondary" className="text-xs">
                    {product.category.name}
                  </Badge>
                  <div className="text-right">
                    {product.originalPrice && (
                      <div className="text-xs text-gray-500 line-through">
                        ${product.originalPrice}
                      </div>
                    )}
                    <div className="text-sm font-bold text-sky-600">
                      ${product.price}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight">
                  {product.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{product.brand}</span>
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    className="bg-sky-600 hover:bg-sky-700 text-white text-xs px-3 py-1"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}