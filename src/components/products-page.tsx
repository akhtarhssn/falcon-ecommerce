'use client';

import { useGetProductsQuery } from '@/lib/api';
import { SingleProduct } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

const ProductsPageComponent = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();

    if (isLoading) {
        return (
            <div className="bg-[#F1F5F9] font-onest min-h-screen py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6">All Products</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, index) => ( // Render 8 skeleton cards
                            <div
                                key={index}
                                className="bg-gray-300 rounded-lg shadow flex flex-col"
                            >
                                {/* Skeleton for Image */}
                                <Skeleton className="w-full h-52 rounded-t-lg" />

                                {/* Skeleton for Product Info */}
                                <div className="flex flex-col flex-1 justify-between p-4">
                                    {/* Skeleton for Product Name */}
                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                    {/* Skeleton for Price */}
                                    <Skeleton className="h-5 w-1/2" />

                                    {/* Skeleton for Buttons */}
                                    <div className="mt-4 flex gap-2">
                                        <Skeleton className="h-10 flex-1 rounded-md" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) return <div className="text-center py-10 text-red-500">Error: {error instanceof Error ? error.message : 'Failed to fetch products'}</div>;

    return (
        <div className="bg-[#F1F5F9] font-onest min-h-screen py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">All Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products?.map((product: SingleProduct) => {
                        return (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col"
                            >
                                {/* Image */}
                                <div className="w-full h-52 overflow-hidden rounded-t-lg p-3">
                                    <Image
                                        width={400}
                                        height={300}
                                        src={product.thumbnail || '/assets/images/fallback.png'}
                                        alt={product.name}
                                        className="w-full h-full object-cover rounded-lg"
                                        onError={(e) => (e.currentTarget.src = '/assets/images/fallback.png')}
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="flex flex-col flex-1 justify-between p-4">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
                                        <div className="mt-2 text-gray-700 font-medium">
                                            <span className="text-[#00B795] text-lg">৳{parseFloat(product?.discount_price || '0').toFixed(2)}</span>
                                            {product?.discount_price && (
                                                <span className="ml-2 text-sm text-gray-400 line-through">
                                                    ৳{parseFloat(product?.regular_price).toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="mt-2 flex gap-2">
                                        <Link
                                            href={`/product/${product.slug}`}
                                            className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 rounded-md transition-colors"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {products && products.length === 0 && <p className="text-center text-gray-500 mt-10">No products available.</p>}
            </div>
        </div>
    );
};

export default ProductsPageComponent;