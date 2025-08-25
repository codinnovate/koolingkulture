import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/lib/types'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
}



const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload
      const existingItem = state.items.find(item => item.id === newItem.id)
      
      if (existingItem) {
        existingItem.quantity += newItem.quantity
      } else {
        state.items.push(newItem)
      }
      
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      
      if (item) {
        item.quantity = quantity
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id)
        }
      }
      
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    
    clearCart: (state) => {
      state.items = []
      state.totalItems = 0
      state.totalPrice = 0
    },
  },
})

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer