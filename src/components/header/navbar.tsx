'use client'

import { SearchIcon, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import MaxWidthContainer from '../max-width-container';
import { RootState } from '@/redux/store';

type NavigationBarProps = {
    className?: string;
}

const NavigationBar = ({ className }: NavigationBarProps) => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    console.log('Cart items length:', cartItems.length); // Debug log

    return (
        <div className={cn("bg-[#0F172A]", className)}>
            <MaxWidthContainer className='p-0'>
                <nav className="flex justify-between text-white px-5 py-4">
                    {/* BRAND LOGO */}
                    <Link href="/" className="flex items-center gap-1">
                        <Image src="/assets/icons/falcon.svg" alt="Falcon Logo" width={40} height={40} className='size-10' />
                        <span className='text-2xl font-bold font-onest hidden md:block'>FALCON</span>
                    </Link>

                    {/* SEARCH BAR */}
                    <div className="flex items-center w-60 max-w-[760px] sm:w-full">
                        <input
                            type="text"
                            placeholder="Search for anything..."
                            className="bg-white text-[#475569] px-5 py-2 md:py-3.5 rounded-tl-lg rounded-bl-lg w-full focus:outline-none"
                        />
                        <button className='bg-[#00B795] p-2 sm:p-2.5 rounded-tr-lg rounded-br-lg hover:bg-[#00A88B] transition-colors duration-200 h-full cursor-pointer'>
                            <SearchIcon />
                        </button>
                    </div>

                    {/* USER MENU */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-7 sm:gap-5">
                            <Link href="/cart" className='relative cursor-pointer'>
                                <ShoppingCart size={28} />
                                {cartItems.length > 0 && (
                                    <p className='absolute -top-3 -right-3 sm:-top-2.5 sm:-right-2.5 bg-[#EF4444] text-white text-[10px] sm:text-xs font-semibold font-onest h-5 sm:h-6 min-w-[20px] sm:min-w-[24px] px-1.5 flex items-center justify-center rounded-full'>
                                        {cartItems.length}
                                    </p>
                                )}
                            </Link>
                            <button className='relative cursor-pointer'>
                                <Image src="/assets/icons/user.svg" alt='cart-icon' width={28} height={28} className='size-5 sm:size-7' />
                            </button>
                        </div>
                    </div>
                </nav>
            </MaxWidthContainer>
        </div>
    );
};

export default NavigationBar;