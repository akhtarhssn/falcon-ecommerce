import MaxWidthContainer from '@/components/max-width-container'
import { Headset, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className='bg-[#0F172A] py-20'>
            <MaxWidthContainer>
                <div className="flex flex-wrap justify-between gap-6 font-onest gap-y-10">
                    <div className="max-w-[270px] w-full">
                        {/* BRAND LOGO */}
                        <Link href="/" className="flex items-center gap-1 text-white">
                            <Image src="/assets/icons/falcon.svg" alt="Falcon Logo" width={40} height={40} className='size-10' />
                            <span className='text-5xl font-bold font-onest hidden md:block'>FALCON</span>
                        </Link>
                        <p className='text-sm text-gray-300 mt-4'>Experience our new platform &  Enjoy exiting deals and offers on your day to day</p>

                        {/* address */}
                        <div className="flex flex-col gap-4 mt-4">
                            <div className="flex items-center gap-2">
                                <div className='p-2.5 rounded-full bg-white '>
                                    <MapPin size={20} />
                                </div>
                                <p className='text-white text-sm'>House #64, Road 13, ASA Center, Uttara, Dhaka-1402</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className='p-2.5 rounded-full bg-white '>
                                    <Phone size={20} />
                                </div>
                                <p className='text-white text-sm'>+880 1234-567890</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className='p-2.5 rounded-full bg-white '>
                                    <Mail size={20} />
                                </div>
                                <p className='text-white text-sm'>info@falcon.com</p>
                            </div>
                        </div>
                    </div>

                    {/* about */}
                    <div className="max-w-[270px] w-full">
                        <p className='text-neutral-400 font-medium'>ABOUT</p>
                        <ul className='text-gray-100 mt-4 flex flex-col gap-2 font-medium'>
                            <li><Link href="#" >Contact Us</Link></li>
                            <li><Link href="#" >About Us</Link></li>
                            <li><Link href="#" >Careers</Link></li>
                            <li><Link href="#" >Press</Link></li>
                            <li><Link href="#" >Cancellation & Returns</Link></li>
                            <li><Link href="#" >Terms of Use</Link></li>
                        </ul>
                    </div>

                    {/* help */}
                    <div className="max-w-[270px] w-full">
                        <p className='text-neutral-400 font-medium'>HELP</p>
                        <ul className='text-gray-100 mt-4 flex flex-col gap-2 font-medium'>
                            <li><Link href="#" >Payments</Link></li>
                            <li><Link href="#" >Shipping</Link></li>
                            <li><Link href="#" >My Orders</Link></li>
                            <li><Link href="#" >FAQs</Link></li>
                            <li><Link href="#" >Terms of Use</Link></li>
                            <li><Link href="#" >Security</Link></li>
                            <li><Link href="#" >Privacy</Link></li>
                        </ul>
                    </div>

                    {/* support */}
                    <div className="max-w-[270px] w-full">
                        <p className='text-neutral-400 font-medium mb-2'>Need Support?</p>
                        <div className='py-2 px-4 border border-white rounded-md flex items-center gap-2 text-white'>
                            <Headset size={24} className='text-[#00B795]' strokeWidth={2.5} />
                            10724-781400
                        </div>
                        <ul className='text-gray-100 mt-4 flex flex-col gap-4 font-medium'>
                            <div>
                                <p className='text-neutral-400 font-medium mb-2'>DOWNLOAD APP</p>
                                <li className='py-2 px-4 border border-white rounded-md flex items-center gap-2'>
                                    <Image src="/assets/icons/playstore.svg" alt='play store icon' width={100} height={100} className='size-7' />
                                    <p className='flex flex-col'>
                                        <span className='uppercase text-xs'>get it on</span>
                                        <span className='capitalize'>google play</span>
                                    </p>
                                </li>
                                <li className='py-2 px-4 border border-white rounded-md flex items-center gap-2 mt-4'>
                                    <Image src="/assets/icons/appstore.svg" alt='app store icon' width={100} height={100} className='size-7' />
                                    <p className='flex flex-col'>
                                        <span className='uppercase text-xs'>download on the</span>
                                        <span className='capitalize'>app store</span>
                                    </p>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </MaxWidthContainer>
        </footer>
    )
}

export default Footer