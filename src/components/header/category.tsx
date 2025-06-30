import Image from 'next/image'
import React from 'react'
import Tooltip from '../tooltip'
import { Headset, Package } from 'lucide-react'
import MaxWidthContainer from '../max-width-container'

const CategoryMenu = () => {
    return (
        <div
            className='py-3  px-5 md:px-0'
        // style={{ boxShadow: '0 3px 4px rgba(0, 0, 0, 0.1)' }}
        >

            <MaxWidthContainer className='flex items-center justify-between'>
                <div className="flex items-center min-[1100px]:justify-between w-full">
                    <button className='flex items-center gap-2 cursor-pointer'>
                        <Image src="/assets/icons/bar.svg" alt="Category Icon" width={24} height={24} className='size-5' />
                        <span className='font-onest font-medium'>Categories</span>
                    </button>
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