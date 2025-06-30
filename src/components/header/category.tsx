import { ChevronDown, Headset, Package } from 'lucide-react'
import Image from 'next/image'
import MaxWidthContainer from '../max-width-container'
import Tooltip from '../tooltip'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useGetCategoriesQuery } from '@/lib/api'

const CategoryMenu = () => {

    // get the categories from the API or a static list
    const { data: categories, isLoading, error } = useGetCategoriesQuery();

    if (isLoading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error: {error instanceof Error ? error.message : 'Failed to fetch products'}</div>;

    return (
        <div
            className='py-3  px-5 md:px-0'
        // style={{ boxShadow: '0 3px 4px rgba(0, 0, 0, 0.1)' }}
        >

            <MaxWidthContainer className='flex items-center justify-between'>
                <div className="flex items-center min-[1100px]:justify-between w-full">

                    <Sheet >
                        <SheetTrigger>
                            <button className='flex items-center gap-2 cursor-pointer'>
                                <Image src="/assets/icons/bar.svg" alt="Category Icon" width={24} height={24} className='size-5' />
                                <span className='font-onest font-medium'>Categories</span>
                            </button>
                        </SheetTrigger>
                        <SheetContent side='left' >
                            <SheetHeader className='py-6'>
                                <SheetTitle>All Categories</SheetTitle>
                                <SheetDescription>
                                    <div className="flex flex-col mt-10">
                                        {categories?.map((category, index) => (
                                            <div key={index} className="mb-4">
                                                <h4
                                                    className="font-onest font-medium cursor-pointer py-2 border-b border-gray-200 text-gray-800 hover:text-blue-600"
                                                    onClick={(e) => e.currentTarget.nextElementSibling?.classList.toggle('hidden')}
                                                >
                                                    <span className='flex items-center justify-between'>
                                                        {category.name}
                                                        <ChevronDown />
                                                    </span>
                                                </h4>
                                                {category.subcategories && category.subcategories.length > 0 && (
                                                    <ul className="ml-5 mt-2 space-y-3 hidden">
                                                        {category.subcategories.map((subCategory, subIndex) => (
                                                            <li key={subIndex} className="text-gray-600 hover:text-blue-500 cursor-pointer">
                                                                {subCategory.name}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>

                    <div className="">
                        <ul className="items-center gap-4 ml-4 hidden md:flex">
                            <li className="hover:text-[#00B795] cursor-pointer">Electronics</li>
                            <li className="hover:text-[#00B795] cursor-pointer">Home Appliances</li>
                            <li className="hover:text-[#00B795] cursor-pointer">Mother & Baby</li>
                            <li className="hover:text-[#00B795] cursor-pointer">Automotive</li>
                            <li className="hover:text-[#00B795] cursor-pointer">Sports Gear</li>
                        </ul>
                    </div>
                    <div className="hidden min-[1100px]:flex items-center gap-4 uppercase text-xs font-medium font-onest">
                        <Tooltip text="Track Order" delay={100}>
                            <div className="flex items-center gap-1 cursor-pointer text-gray-500 hover:text-[#00B795] transition-colors duration-300">
                                <Package size={24} />
                                <span className='hidden md:block'>track order</span>
                            </div>
                        </Tooltip>
                        <Tooltip text="Help Center" delay={100}>
                            <div className="flex items-center gap-1 cursor-pointer text-gray-500 hover:text-[#00B795] transition-colors duration-300">
                                <Headset size={24} />
                                <span className='hidden md:block'>help center</span>
                            </div>
                        </Tooltip>
                        <Tooltip text="Sell with Us" delay={100}>
                            <div className="flex items-center gap-1 cursor-pointer text-gray-500 hover:text-[#00B795] transition-colors duration-300">
                                <Image src="/assets/icons/sell.png" alt="Sell Icon" width={24} height={24} className='size-7 sm:size-5' />
                                <span className='hidden md:block'>sell with us</span>
                            </div>
                        </Tooltip>
                    </div>
                </div>
            </MaxWidthContainer>
        </div>
    )
}

export default CategoryMenu