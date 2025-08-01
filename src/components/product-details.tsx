'use client';

import { ChevronDown, Heart, Share2, Star } from 'lucide-react';
import Image from 'next/image';
import { useGetProductBySlugQuery } from '@/lib/api';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { Variation } from '@/types/product';
import { useState } from 'react';
import { useParams } from 'next/navigation';

import BreadcrumbComponent from '@/components/breadcrumb-component';
import MaxWidthContainer from '@/components/max-width-container';
import DeliveryOptions from '@/components/product-details/delivery-option';
import ExpandableSection from './ExpandableSection';
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import toast from 'react-hot-toast';
import { Skeleton } from './ui/skeleton';

const ProductDetails = () => {
    const { slug } = useParams(); // Get the slug from the URL
    const { data: product, isLoading, error } = useGetProductBySlugQuery(slug as string);
    const dispatch = useDispatch();
    const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null);
    const [quantity, setQuantity] = useState(1);


    if (isLoading) {
        return (
            <div className="bg-[#F1F5F9] font-onest min-h-screen py-6">
                <div className="max-w-7xl mx-auto xl:p-0 px-5">
                    {/* Skeleton for Breadcrumbs */}
                    <div className="flex items-center gap-2 mb-6">
                        <Skeleton className="h-4 w-20 bg-gray-300" />
                        <Skeleton className="h-4 w-4 bg-gray-300" />
                        <Skeleton className="h-4 w-24 bg-gray-300" />
                        <Skeleton className="h-4 w-4 bg-gray-300" />
                        <Skeleton className="h-4 w-40 bg-gray-300" />
                    </div>
                </div>

                <section className="bg-white py-6">
                    <MaxWidthContainer className="font-onest xl:p-0">
                        <div className="mt-5 grid grid-cols-12 min-[670px]:gap-10">
                            {/* Gallery Skeleton */}
                            <div className="w-full flex flex-col gap-4 col-span-12 min-[670px]:col-span-6 min-[960px]:col-span-5 min-[1165px]:col-span-4">
                                <Skeleton className="w-full h-96 rounded-md bg-gray-300" /> {/* Big Thumbnail */}
                                <div className="grid grid-cols-5 gap-2 w-full">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Skeleton key={i} className="w-full h-20 rounded-md bg-gray-300" />
                                    ))}
                                </div>
                            </div>

                            {/* Product Details Overview Skeleton */}
                            <div className="w-full col-span-12 min-[670px]:col-span-6 min-[960px]:col-span-7 min-[1165px]:col-span-5">
                                {/* Title */}
                                <Skeleton className="h-8 w-3/4 mb-4 bg-gray-300" />
                                {/* Rating and Share */}
                                <div className="flex items-center justify-between mt-5">
                                    <Skeleton className="h-6 w-32 bg-gray-300" />
                                    <div className="flex gap-4">
                                        <Skeleton className="h-8 w-8 rounded-full bg-gray-300" />
                                        <Skeleton className="h-8 w-8 rounded-full bg-gray-300" />
                                    </div>
                                </div>
                                {/* Price */}
                                <Skeleton className="h-10 w-1/2 mt-5 bg-gray-300" />
                                {/* Promotion */}
                                <Skeleton className="h-8 w-56 mt-6 bg-gray-300" />

                                {/* Variation Select */}
                                <div className="flex flex-col gap-4 mt-6">
                                    <Skeleton className="h-5 w-36 bg-gray-300" />
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {Array.from({ length: 3 }).map((_, i) => (
                                            <Skeleton key={i} className="size-14 rounded-md bg-gray-300" />
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity Select */}
                                <div className="mt-4">
                                    <Skeleton className="h-5 w-24 mb-2 bg-gray-300" />
                                    <Skeleton className="h-10 w-40 rounded-full bg-gray-300" />
                                </div>

                                {/* Add to Cart Button */}
                                <Skeleton className="h-12 w-full max-w-[310px] mt-6 rounded-md bg-gray-300" />
                            </div>

                            {/* Delivery Options Skeleton */}
                            <div className="col-span-12 min-[1165px]:col-span-3 space-y-6">
                                {/* Assuming DeliveryOptions also has its own loading state or can be passed props for skeleton */}
                                <Skeleton className="h-48 w-full rounded-md bg-gray-300" /> {/* Placeholder for Delivery Options box */}
                                <Skeleton className="h-48 w-full rounded-md bg-gray-300" /> {/* Placeholder for Delivery Options box */}
                            </div>
                        </div>
                    </MaxWidthContainer>
                </section>

                <section>
                    <MaxWidthContainer className="font-onest p-0 pb-20">
                        {/* Product Description Skeleton */}
                        <div className="bg-white px-7 py-6 rounded-md mt-6 max-w-[950px]">
                            <Skeleton className="h-8 w-60 mb-4 bg-gray-300" />
                            <Skeleton className="h-40 w-full bg-gray-300" /> {/* Placeholder for expandable text */}
                        </div>

                        {/* Product Specifications Skeleton */}
                        <div className="bg-white px-7 py-6 rounded-md mt-6 max-w-[950px]">
                            <Skeleton className="h-8 w-60 mb-4 bg-gray-300" />
                            <Skeleton className="h-40 w-full bg-gray-300" /> {/* Placeholder for expandable text */}
                        </div>
                    </MaxWidthContainer>
                </section>
            </div>
        );
    }

    if (error) return <div className="text-center mt-10 text-red-500">Error fetching product</div>;
    if (!product) return <div className="text-center mt-10">No product found</div>;

    if (error) return <div className="text-center mt-10 text-red-500">Error fetching product</div>;
    if (!product) return <div className="text-center mt-10">No product found</div>;

    const effectivePrice = selectedVariation
        ? selectedVariation.discount_price || selectedVariation.regular_price
        : product.product_detail.discount_price || product.product_detail.regular_price;
    const effectiveStock = selectedVariation ? selectedVariation.total_stock_qty : product.total_stock_qty;
    const effectiveImage = selectedVariation ? selectedVariation.image : product.thumbnail;

    // Collect all images for the gallery (main image + variation images)
    const galleryImages = [
        effectiveImage,
        ...product.variations.map((v) => v.image).filter((img): img is string => !!img),
    ];

    return (
        <div className="">
            <div className="max-w-7xl mx-auto xl:p-0 px-5">
                {/* Breadcrumbs */}
                <BreadcrumbComponent>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">Tops</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{product.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbComponent>
            </div>

            {/* Product Details Section */}
            <section className="bg-white py-6">
                <MaxWidthContainer className="font-onest xl:p-0">
                    <div className="mt-5 grid grid-cols-12 min-[670px]:gap-10">
                        {/* gallery */}
                        <div className="w-full flex flex-col gap-4 col-span-12 min-[670px]:col-span-6 min-[960px]:col-span-5 min-[1165px]:col-span-4">
                            {/* Big Thumbnail */}
                            <div className="w-full">
                                <Image
                                    src={effectiveImage || '/assets/images/fallback.png'}
                                    alt={product.name}
                                    width={900}
                                    height={900}
                                    className="w-full h-full rounded-md"
                                    onError={(e) => (e.currentTarget.src = '/assets/images/fallback.png')}
                                />
                            </div>

                            {/* Thumbnail Gallery */}
                            <div className="grid grid-cols-5 gap-2 w-full">
                                {galleryImages.map((image, index) => (
                                    <Image
                                        key={index}
                                        src={image || '/assets/images/fallback.png'}
                                        alt={`${product.name} thumbnail ${index + 1}`}
                                        width={500}
                                        height={500}
                                        className="rounded cursor-pointer w-full h-full"
                                        onClick={() => setSelectedVariation(index === 0 ? null : product.variations[index - 1] || null)}
                                        onError={(e) => (e.currentTarget.src = '/assets/images/fallback.png')}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* product details overview */}
                        <div className="w-full col-span-12 min-[670px]:col-span-6 min-[960px]:col-span-7 min-[1165px]:col-span-5">
                            {/* product title */}
                            <h1 className="text-xl font-medium text-gray-600">{product.name}</h1>
                            {/* product rating and like/share button */}
                            <div className="flex items-center justify-between mt-5">
                                {/* rating */}
                                <div className="flex items-center gap-2.5">
                                    <span>{product.rating_avg.toFixed(1)}</span>
                                    <div className="flex items-center gap-0.5">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <Star
                                                size={20}
                                                key={index}
                                                className="text-amber-400"
                                                strokeWidth={0}
                                                fill={index < Math.round(product.rating_avg) ? 'currentColor' : 'none'}
                                            />
                                        ))}
                                    </div>
                                    <span>{product.rating_count}</span>
                                    <ChevronDown />
                                </div>
                                {/* like/share button */}
                                <div className="flex items-center gap-5 text-gray-500">
                                    <div className="cursor-pointer">
                                        <Heart />
                                    </div>
                                    <div className="cursor-pointer">
                                        <Share2 />
                                    </div>
                                </div>
                            </div>
                            {/* product price */}
                            <div className="mt-5">
                                <h4 className="text-2xl font-semibold text-[#00B795]">
                                    {/* discounted price */}
                                    <span>৳{parseFloat(effectivePrice).toFixed(2)}</span>
                                    {/* regular price */}
                                    {(selectedVariation ? selectedVariation.discount_price : product.product_detail.discount_price) && (
                                        <sup className="text-gray-400 text-sm line-through ml-4">
                                            ৳{parseFloat(selectedVariation ? selectedVariation.regular_price : product.product_detail.regular_price).toFixed(2)}
                                        </sup>
                                    )}
                                </h4>
                            </div>
                            {/* promotion */}
                            <div className="flex items-center gap-2 text-gray-500 mt-6">
                                <span className="text-sm font-medium">Promotion:</span>
                                <div className="bg-gradient-to-r from-[#FF8810] to-[#D23707] py-1.5 pl-5 pr-8 w-fit text-white text-sm font-bold flex items-center gap-2 clipped-ribbon">
                                    <span>Min. spend ৳550 </span>
                                    <ChevronDown />
                                </div>
                            </div>

                            {/* option select */}
                            <div className="flex flex-col gap-4 mt-6">
                                {/* variation select */}
                                {product.variations.length > 0 && (
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">Select Variation</span>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {product.variations.map((variation) => (
                                                <div
                                                    key={variation.id}
                                                    className={`size-14 rounded-md cursor-pointer outline-2 outline-transparent -outline-offset-2 hover:outline-[#00B795] transition-colors ${selectedVariation?.id === variation.id ? 'outline-[#00B795]' : ''}`}
                                                    onClick={() => {
                                                        setSelectedVariation(variation);
                                                        setQuantity(1); // Reset quantity when changing variation
                                                    }}
                                                >
                                                    <Image
                                                        src={variation.image || '/assets/images/fallback.png'}
                                                        alt={variation.variation_attributes
                                                            .map((attr) => `${attr.attribute.name}: ${attr.attribute_option.attribute_value}`)
                                                            .join(', ')}
                                                        width={100}
                                                        height={100}
                                                        className="w-full h-full rounded-md"
                                                        onError={(e) => (e.currentTarget.src = '/assets/images/fallback.png')}
                                                    />
                                                    <p className="text-xs text-gray-500 mt-1 text-center truncate">
                                                        {variation.variation_attributes
                                                            .map((attr) => `${attr.attribute_option.attribute_value}`)
                                                            .join(', ')}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* quantity select */}
                                <div className="mt-4">
                                    <span className="text-sm font-medium">Quantity</span>
                                    <div className="border border-gray-300 rounded-full p-0.5 flex items-center justify-between max-w-[160px] w-full mt-2">
                                        <button
                                            className="size-8 flex items-center justify-center text-gray-700 bg-[#F1F5F9] hover:bg-[#00A788] rounded-full transition-colors cursor-pointer"
                                            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                            disabled={quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-1.5 text-gray-700">{quantity}</span>
                                        <button
                                            className="size-8 flex items-center justify-center text-gray-700 bg-[#F1F5F9] hover:bg-[#00A788] rounded-full transition-colors cursor-pointer"
                                            onClick={() => setQuantity((prev) => Math.min(effectiveStock, prev + 1))}
                                            disabled={quantity >= effectiveStock}
                                        >
                                            +
                                        </button>
                                    </div>
                                    {effectiveStock < 10 && (
                                        <p className="text-red-500 text-sm mt-2">Only {effectiveStock} left in stock!</p>
                                    )}
                                </div>
                            </div>

                            {/* add to cart button */}
                            <div className="mt-6">
                                <button
                                    className="max-w-[310px] w-full bg-[#00B795] text-white py-3 rounded-md hover:bg-[#00A788] transition-colors font-medium cursor-pointer"
                                    onClick={() => {
                                        dispatch(
                                            addToCart({
                                                ...product,
                                                selectedVariation,
                                                quantity,
                                            })
                                        );
                                        toast.success('Product added to cart!');
                                    }}
                                    disabled={effectiveStock === 0}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        {/* delivery options */}
                        <DeliveryOptions className="col-span-12 min-[1165px]:col-span-3" />
                    </div>
                </MaxWidthContainer>
            </section>
            <section>
                <MaxWidthContainer className="font-onest p-0 pb-20">
                    {/* product description */}
                    <div className="bg-white px-7 py-6 rounded-md mt-6 max-w-[950px]">
                        <h3 className="text-2xl font-medium text-gray-800">Product Description</h3>
                        <ExpandableSection withMask={true}>
                            <p className="text-gray-500 mt-4">{product.description}</p>
                        </ExpandableSection>
                    </div>

                    {/* product specifications */}
                    <div className="bg-white px-7 py-6 rounded-md mt-6 max-w-[950px]">
                        <h3 className="text-2xl font-medium text-gray-800">Product Specifications</h3>
                        <ExpandableSection withMask={true}>
                            <p className="text-gray-500 mt-4 text-xl font-medium">{product.name}</p>
                            <ul className="list-decimal list-inside text-gray-500 mt-4 pl-5">
                                {product.variations.length > 0 && (
                                    <li>Variants: {product.variations.length} options (e.g., {product.variations[0].variation_attributes.map((attr) => `${attr.attribute.name}: ${attr.attribute_option.attribute_value}`).join(', ')})</li>
                                )}
                                <li>Stock: {product.total_stock_qty} units</li>
                                <li>Merchant: {product.merchant.shop_name}</li>
                                <li>SKU: {product.sku}</li>
                                <li>Barcode: {product.barcode}</li>
                                <li>Category ID: {product.category_id}</li>
                                <li>Brand ID: {product.brand_id}</li>
                                <li>Delivery Fees: Inside Dhaka ৳{product.shop_product.id_delivery_fee}, Outside Dhaka ৳{product.shop_product.od_delivery_fee}, Express ৳{product.shop_product.ed_delivery_fee}</li>
                            </ul>
                        </ExpandableSection>
                    </div>
                </MaxWidthContainer>
            </section>
        </div>
    );
};

export default ProductDetails;