'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { 
  fetchProducts, 
  fetchCategories, 
  fetchFeaturedProducts,
  setSearchTerm,
  setSelectedCategory,
  setSortBy,
  clearFilters
} from '@/store/slices/productsSlice'
import { addItem } from '@/store/slices/cartSlice'
import { Product } from '@/lib/types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ShoppingCart, Search, Filter, Star, Heart, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import { toast } from 'sonner'

export default function ShopPage() {
  const dispatch = useAppDispatch()
  const { 
    products, 
    categories, 
    featuredProducts, 
    loading, 
    error, 
    searchTerm, 
    selectedCategory, 
    sortBy 
  } = useAppSelector((state) => state.products)
  
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
    dispatch(fetchFeaturedProducts())
  }, [dispatch])

  const handleAddToCart = (product: Product) => {
    dispatch(addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0] ? urlFor(product.images[0]).url() : '',
      quantity: 1
    }))
    toast.success(`${product.name} added to cart!`)
  }

  const handleSearch = (value: string) => {
    dispatch(setSearchTerm(value))
  }

  const handleCategoryChange = (categoryId: string) => {
    dispatch(setSelectedCategory(categoryId === 'all' ? '' : categoryId))
  }

  const handleSortChange = (sortValue: string) => {
    dispatch(setSortBy(sortValue as any))
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
    setPriceRange({ min: 0, max: 1000 })
  }

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || product.category._id === selectedCategory
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max
      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'newest':
        default:
          return 0
      }
    })

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3 mt-2" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={() => dispatch(fetchProducts())}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">KoolingKulture Shop</h1>
          <p className="text-xl md:text-2xl mb-8">Discover the latest in cooling technology and culture</p>
        </div>
      </div>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.slice(0, 3).map((product) => (
                <Card key={product._id} className="group hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.images[0] ? urlFor(product.images[0]).url() : '/placeholder.jpg'}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-red-500">Featured</Badge>
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary" className="p-2">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="p-2">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{product.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-3">{product.description}</p>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">(4.8)</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      className="flex-1"
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                    <Link href={`/shop/${product.slug.current}`}>
                      <Button variant="outline">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters and Search */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full sm:w-48">
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
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button variant="ghost" onClick={handleClearFilters}>
                Clear All
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Price Range</h3>
              <div className="flex gap-4 items-center">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                  className="w-24"
                />
                <span>-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  className="w-24"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">All Products</h2>
            <p className="text-gray-600">{filteredProducts.length} products found</p>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">No products found</p>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product._id} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.images[0] ? urlFor(product.images[0]).url() : '/placeholder.jpg'}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {!product.inStock && (
                      <Badge className="absolute top-4 left-4 bg-red-500">Out of Stock</Badge>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary" className="p-2">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Link href={`/shop/${product.slug.current}`}>
                        <Button size="sm" variant="secondary" className="p-2">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-blue-600">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full"
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}