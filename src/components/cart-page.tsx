'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeFromCart, updateQuantity } from '@/redux/features/cart/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import BreadcrumbComponent from './breadcrumb-component';
import { ChevronRight, Package2 } from 'lucide-react';
import { Checkbox } from './ui/checkbox';

const Cart = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const totalPrice = cartItems.reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
    );

    // State to manage selected item IDs
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [selectedStores, setSelectedStores] = useState<Set<string>>(new Set());

    // Group items by store
    const itemsByStore = cartItems.reduce((acc, item) => {
        const storeName = item?.fullProduct?.merchant?.shop_name || 'Unknown Store';
        if (!acc[storeName]) acc[storeName] = [];
        acc[storeName].push(item);
        return acc;
    }, {} as Record<string, typeof cartItems>);

    // Sync selected items when cartItems change
    useEffect(() => {
        setSelectedItems(new Set());
        setSelectedStores(new Set());
    }, [cartItems]);

    // Handle item selection
    const handleItemSelect = (itemId: string, isChecked: boolean) => {
        const newSelectedItems = new Set(selectedItems);
        if (isChecked) {
            newSelectedItems.add(itemId);
        } else {
            newSelectedItems.delete(itemId);
        }
        setSelectedItems(newSelectedItems);
    };

    // Handle store selection
    const handleStoreSelect = (storeName: string, isChecked: boolean) => {
        const newSelectedStores = new Set(selectedStores);
        const storeItemIds = itemsByStore[storeName].map(item => String(item.id));

        if (isChecked) {
            newSelectedStores.add(storeName);
            setSelectedItems(prev => new Set([...prev, ...storeItemIds]));
        } else {
            newSelectedStores.delete(storeName);
            setSelectedItems(prev => {
                const newSet = new Set(prev);
                storeItemIds.forEach(id => newSet.delete(id));
                return newSet;
            });
        }
        setSelectedStores(newSelectedStores);
    };

    // Handle select all
    const handleSelectAll = (isChecked: boolean) => {
        const allItemIds = cartItems.map(item => String(item.id));
        if (isChecked) {
            setSelectedItems(new Set(allItemIds));
            setSelectedStores(new Set(Object.keys(itemsByStore)));
        } else {
            setSelectedItems(new Set());
            setSelectedStores(new Set());
        }
    };

    // Handle delete selected items
    const handleDeleteSelected = () => {
        selectedItems.forEach(itemId => dispatch(removeFromCart(itemId)));
        setSelectedItems(new Set());
        setSelectedStores(new Set());
    };

    return (
        <div className="bg-[#F1F5F9] font-onest pb-20">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumbs */}
                <BreadcrumbComponent>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>My Cart</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbComponent>
                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">Your cart is empty.</p>
                        <Link href="/" className="mt-4 inline-block bg-[#00B795] text-white py-2 px-6 rounded-md hover:bg-[#00A788] transition-colors">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="w-full">
                            <div className="text-xl font-semibold text-gray-500 flex items-center bg-white rounded-md p-5">
                                My Cart ({cartItems.length})
                                <span className="ml-auto flex items-center space-x-4">
                                    <label className="text-sm cursor-pointer flex items-center">
                                        <Checkbox
                                            checked={selectedItems.size === cartItems.length}
                                            onCheckedChange={handleSelectAll}
                                            className="mr-2 border-gray-500 size-4"
                                        />
                                        Select All
                                    </label>
                                    <button
                                        onClick={handleDeleteSelected}
                                        className="text-sm"
                                        disabled={selectedItems.size === 0}
                                    >
                                        Clear All
                                    </button>
                                </span>
                            </div>

                            {/* Cart Items Section */}
                            <div className="w-full overflow-hidden bg-white rounded-md">
                                {Object.entries(itemsByStore).map(([storeName, storeItems]) => (
                                    <div key={storeName} className="divide-y divide-gray-200">
                                        <label className="text-sm cursor-pointer flex items-center gap-4 text-gray-500 bg-[#F1F5F9] py-2 p-5">
                                            <Checkbox
                                                checked={selectedStores.has(storeName)}
                                                onCheckedChange={(checked) => handleStoreSelect(storeName, checked as boolean)}
                                                className='border-gray-600 size-5'
                                            />
                                            <span className="flex items-center gap-1">
                                                <Package2 />
                                                {storeName}
                                                <ChevronRight size={18} />
                                            </span>
                                        </label>
                                        {storeItems.map((item) => (
                                            <div className="flex p-5 hover:bg-gray-50 transition-colors bg-white rounded-md" key={item.id}>
                                                <Checkbox
                                                    checked={selectedItems.has(String(item.id))}
                                                    onCheckedChange={(checked) => handleItemSelect(String(item.id), checked as boolean)}
                                                    className='border-gray-600 size-5'
                                                    data-store={storeName}
                                                />
                                                <div className="size-24 flex-shrink-0">
                                                    <Image
                                                        src={item.thumbnail || '/assets/images/fallback.png'}
                                                        alt={item.name}
                                                        width={100}
                                                        height={100}
                                                        className="w-full h-full object-cover rounded-md"
                                                        onError={(e) => (e.currentTarget.src = '/assets/images/fallback.png')}
                                                    />
                                                </div>
                                                <div className="flex-1 ml-4">
                                                    <h2 className="font-medium text-gray-700">{item.name}</h2>
                                                    <div>
                                                        Variation: {item.variation ? item.variation.variation_attributes.map(attr => `${attr.attribute.name}: ${attr.attribute_option.attribute_value} `).join(', ') : 'None'}
                                                    </div>
                                                    <div className="flex items-center mt-2 space-x-2">
                                                        <button
                                                            onClick={() =>
                                                                dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                                                            }
                                                            disabled={item.quantity <= 1}
                                                            className="w-6 h-6 flex items-center justify-center text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full disabled:opacity-50 transition-colors"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-8 text-center py-1 text-gray-900">{item.quantity}</span>
                                                        <button
                                                            onClick={() =>
                                                                dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                                                            }
                                                            disabled={item.quantity >= item.quantity}
                                                            className="w-6 h-6 flex items-center justify-center text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full disabled:opacity-50 transition-colors"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="ml-4 text-right">
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        ৳{(parseFloat(item.price) * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary Section */}
                        <div className="w-full lg:w-1/3">
                            <div className="space-y-2 bg-white rounded-md p-5">
                                <h2 className="text-xl font-semibold text-gray-500 mb-4">Order summary</h2>
                                <div className="border-b-2 border-gray-300 border-dashed pb-4">
                                    <div className="flex justify-between font-medium text-gray-500">
                                        <span>Price ({cartItems.length} items)</span>
                                        <span>৳{totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-medium text-gray-500 mb-4">
                                        <span>Shipping fee</span>
                                        <span className='text-green-400'>Free Shipping</span>
                                    </div>
                                    <div className="flex justify-between font-medium text-gray-500">
                                        <input type="text" className="border border-gray-300 rounded-tl-md  rounded-bl-md py-2 px-4" placeholder="Store / Falcon coupon" />
                                        <button className="bg-[#00B795] text-white py-2 px-4 rounded-tr-md rounded-br-md hover:bg-[#00A788] transition-colors">Apply</button>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <div className="flex justify-between font-medium text-sm">
                                        <span>Sub Total</span>
                                        <span>৳{totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button
                                    className="mt-4 w-full bg-[#00B795] text-white py-2 rounded-md hover:bg-[#00A788] transition-colors text-sm font-medium"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                            <div className="mt-4 text-xs text-green-600">
                                <label className='flex gap-2'>
                                    <Checkbox id="terms" className='border-gray-600 size-5 ' />
                                    I have read and agree to the Terms and Conditions, Privacy Policy and Refund and Return Policy.</label>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;