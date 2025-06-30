'use client'

import { ReactNode, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

type Props = {
    children: ReactNode
    className?: string
    withMask?: boolean
}

export default function ExpandableSection({
    children,
    className = '',
    withMask = true,
}: Props) {
    const [show, setShow] = useState(false)

    const handleToggle = () => {
        setShow(!show)
    }

    return (
        <AnimatePresence initial={false}>
            <motion.div
                key="expandable"
                initial={{ height: 220, opacity: 1 }}
                animate={{ height: show ? 'auto' : 220, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className={`overflow-hidden ${className} ${!show && withMask ? "[mask-image:linear-gradient(to_bottom,transparent,black_0%,black_50%,transparent)]" : ""}`}
            >
                <div>
                    {children}
                </div>
            </motion.div>
            <button
                className="w-full mt-5 cursor-pointer py-2 flex items-center gap-1 justify-center mx-auto"
                onClick={handleToggle}
            >
                See More
                <ChevronDown className={`${show ? "rotate-180" : ""} duration-500`} />
            </button>
        </AnimatePresence>
    )
}
