import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Product, Category } from '@/lib/types'
import { client, PRODUCTS_QUERY, CATEGORIES_QUERY, FEATURED_PRODUCTS_QUERY, PRODUCT_QUERY } from '@/lib/sanity'

interface ProductsState {
  products: Product[]
  categories: Category[]
  featuredProducts: Product[]
  currentProduct: Product | null
  selectedProduct: Product | null
  loading: boolean
  error: string | null
  searchTerm: string
  selectedCategory: string
  sortBy: 'newest' | 'price-low' | 'price-high' | 'name'
}

const initialState: ProductsState = {
  products: [],
  categories: [],
  featuredProducts: [],
  currentProduct: null,
  selectedProduct: null,
  loading: false,
  error: null,
  searchTerm: '',
  selectedCategory: '',
  sortBy: 'newest',
}

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const products = await client.fetch(PRODUCTS_QUERY)
    return products
  }
)

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const categories = await client.fetch(CATEGORIES_QUERY)
    return categories
  }
)

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeaturedProducts',
  async () => {
    const featuredProducts = await client.fetch(FEATURED_PRODUCTS_QUERY)
    return featuredProducts
  }
)

export const fetchProductBySlug = createAsyncThunk<Product | null, string>(
  'products/fetchBySlug',
  async (slug: string) => {
    const query = `*[_type == "product" && slug.current == "${slug}"][0]{
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
      images[]{
        asset->{
          _id,
          url
        }
      },
      inStock,
      featured,
      brand,
      specifications[]
    }`;
    
    return await client.fetch(query);
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    clearFilters: (state) => {
      state.searchTerm = ''
      state.selectedCategory = ''
      state.sortBy = 'newest'
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null
    },
  },
  extraReducers: (builder) => {
    // Fetch products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch products'
      })
    
    // Fetch categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch categories'
      })
    
    // Fetch featured products
    builder
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false
        state.featuredProducts = action.payload
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch featured products'
      })
    
    // Fetch product by slug
    builder
      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading = false
        state.selectedProduct = action.payload || null
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch product'
      })
  },
})

export const { setSearchTerm, setSelectedCategory, setSortBy, clearFilters, clearCurrentProduct } = productsSlice.actions

export default productsSlice.reducer