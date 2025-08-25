"use client";

import { useState } from 'react'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useAppDispatch, useAppSelector } from '@/store'
import { removeItem, updateQuantity, clearCart } from '@/store/slices/cartSlice'
import { Badge } from '@/components/ui/badge'

export default function Cart() {
  const dispatch = useAppDispatch()
  const { items, totalItems, totalPrice } = useAppSelector((state) => state.cart)
  const [isOpen, setIsOpen] = useState(false)

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeItem(productId))
    } else {
      dispatch(updateQuantity({ id: productId, quantity: newQuantity }))
    }
  }

  const handleCheckout = () => {
    // In a real app, this would redirect to checkout
    alert('Checkout functionality would be implemented here')
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingBag className="w-5 h-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-sky-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Shopping Cart
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dispatch(clearCart())}
                className="text-red-600 hover:text-red-700"
              >
                Clear All
              </Button>
            )}
          </SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? 'Your cart is empty' : `${totalItems} item${totalItems > 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Your cart is empty</p>
              <Button onClick={() => setIsOpen(false)} className="bg-sky-600 hover:bg-sky-700">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.image || 'https://images.pexels.com/photos/8005399/pexels-photo-8005399.jpeg'}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                          {item.name}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-sky-600">
                              ₦{(item.price * item.quantity).toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              ₦{item.price.toLocaleString()} each
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => dispatch(removeItem(item.id))}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4 mt-6">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₦{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{totalPrice > 50000 ? 'Free' : '₦5,000'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>₦{(totalPrice * 0.075).toLocaleString()}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₦{(totalPrice + (totalPrice > 50000 ? 0 : 5000) + (totalPrice * 0.075)).toLocaleString()}</span>
                </div>
              </div>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white"
              size="lg"
            >
              Proceed to Checkout
            </Button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Secure checkout with SSL encryption
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}