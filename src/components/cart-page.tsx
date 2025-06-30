'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeFromCart, updateQuantity } from '@/redux/features/cart/cartSlice';
import Image from 'next/image';
import Link from 'next/link';

const Cart = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const totalPrice = cartItems.reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
    );

    return (
        <div className="bg-gray-50 font-onest min-h-screen py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-semibold text-gray-900 mb-8">Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">Your cart is empty.</p>
                        <Link href="/" className="mt-4 inline-block bg-[#00B795] text-white py-2 px-6 rounded-md hover:bg-[#00A788] transition-colors">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="divide-y divide-gray-200">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center p-6 hover:bg-gray-50 transition-colors">
                                    <div className="w-24 h-24 flex-shrink-0">
                                        <Image
                                            src={item.thumbnail || '/assets/images/fallback.png'}
                                            alt={item.name}
                                            width={96}
                                            height={96}
                                            className="w-full h-full object-cover rounded-md"
                                            onError={(e) => (e.currentTarget.src = '/assets/images/fallback.png')}
                                        />
                                    </div>
                                    <div className="flex-1 ml-6">
                                        <h2 className="text-lg font-medium text-gray-900">{item.name}</h2>
                                        <p className="text-gray-600 mt-1">৳{parseFloat(item.price).toFixed(2)}</p>
                                        <div className="flex items-center mt-4">
                                            <div className="flex items-center border border-gray-300 rounded-full">
                                                <button
                                                    onClick={() =>
                                                        dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                                                    }
                                                    disabled={item.quantity <= 1}
                                                    className="w-10 h-10 flex items-center justify-center text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-l-full disabled:opacity-50 transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="w-12 text-center py-2 text-gray-900">{item.quantity}</span>
                                                <button
                                                    onClick={() =>
                                                        dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                                                    }
                                                    disabled={item.quantity >= item.quantity}
                                                    className="w-10 h-10 flex items-center justify-center text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-r-full disabled:opacity-50 transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            {item.quantity >= item.quantity && (
                                                <p className="text-red-500 text-sm ml-4">Maximum stock reached!</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="ml-6 text-right">
                                        <p className="text-lg font-semibold text-gray-900">
                                            ৳{(parseFloat(item.price) * item.quantity).toFixed(2)}
                                        </p>
                                        <button
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            className="mt-2 text-red-500 hover:text-red-700 text-sm underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 bg-gray-50">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-medium text-gray-700">Subtotal</span>
                                <span className="text-xl font-semibold text-gray-900">৳{totalPrice.toFixed(2)}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Shipping and taxes calculated at checkout.</p>
                            <button
                                className="mt-4 w-full bg-[#00B795] text-white py-3 rounded-md hover:bg-[#00A788] transition-colors font-medium"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;