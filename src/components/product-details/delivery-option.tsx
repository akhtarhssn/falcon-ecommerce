import { cn } from '@/lib/utils'
import { BadgeCheck, MessageCircleMore, PackageIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const DeliveryOptions = ({ className }: { className?: string }) => {
    return (
        <div className={cn("w-full mx-auto", className)}>
            <div className="flex min-[700px]:flex-row min-[1165px]:flex-col flex-col justify-center gap-4 mt-10 min-[1100px]:mt-0">
                {/* delivery Option */}
                <div className="w-full px-4 py-3 rounded-md border border-gray-300">
                    <h4 className="text-lg font-medium text-gray-600">Delivery Options</h4>
                    <div className="flex flex-col gap-3 mt-3">
                        <div className="flex gap-2 capitalize">
                            <PackageIcon className='text-[#00B795]' />
                            <div>
                                <p className='font-medium text-gray-600'>regular</p>
                                <span className='text-sm text-gray-500'>delivery within 2-3 days</span>
                            </div>
                        </div>
                        <div className="flex gap-2 capitalize text-gray-300">
                            <Image src="/assets/icons/package-moving.svg" alt='Package Icon' width={50} height={50} className='size-6' />
                            <div>
                                <p className='flex items-center gap-1 font-medium'>express <span className='text-red-400'>not available</span></p>
                                <span className='text-sm'>delivery within 24 hours</span>
                            </div>
                        </div>

                    </div>
                </div>
                {/* Store Info */}
                <div className="w-full px-4 py-3 rounded-md border border-gray-300">
                    <span>Sold by</span>
                    <div className="divide-y-2 flex flex-col gap-4 ">
                        <div className='flex flex-col gap-4 pb-4'>
                            <div className="">
                                {/* store logo */}
                                <div className="flex items-center">
                                    <Image src="/assets/images/store-logo.png" alt='store logo' width={50} height={50} className="rounded-full" />
                                    <div className="w-full">
                                        <h4 className="text-lg font-medium text-gray-600 ml-3 flex items-center gap-2">BD FASHION HOUSE <BadgeCheck className='text-white' strokeWidth={1} fill="#3B82F6" /> </h4>
                                        <div
                                            className='flex items-center justify-center text-white gap-4 py-1.5 mt-1'
                                            style={{
                                                backgroundImage: 'url(/assets/images/polygon-bg.svg)',
                                                backgroundPosition: 'center',
                                                backgroundSize: 'contain',
                                                backgroundRepeat: 'no-repeat',
                                            }}
                                        >
                                            <Image src="/assets/icons/rising-star.png" alt='rising star icon' width={100} height={100} className='-ml-8 size-6' />
                                            <span className='text-sm ml-8'>Rising Star</span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* chat option */}
                            <div className="flex items-center justify-between gap-3 text-sm">
                                <div className="bg-green-200 py-2 w-full rounded-md font-medium flex items-center justify-center gap-1 text-[#00B795] cursor-pointer hover:bg-green-300 transition-colors">
                                    <MessageCircleMore />
                                    <span className='ml-2 capitalize'>Chat now</span>
                                </div>

                                <div className="bg-[#F1F5F9] py-2 w-full rounded-md font-medium text-center">
                                    <span className='ml-2 capitalize'>View shop</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-5">
                            <div className="flex flex-col gap-2 capitalize">
                                <span className='text-xs text-gray-600'>ship on time</span>
                                <span className='text-3xl text-gray-500'>100%</span>
                            </div>
                            <div className="flex flex-col gap-2 capitalize">
                                <span className='text-xs text-gray-600'>chat response</span>
                                <span className='text-3xl text-gray-500'>90%</span>
                            </div>
                            <div className="flex flex-col gap-2 capitalize">
                                <span className='text-xs text-gray-600'>shop rating</span>
                                <span className='text-3xl text-gray-500'>99.8%</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DeliveryOptions