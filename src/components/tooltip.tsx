'use client'

import { ReactNode } from 'react'

type TooltipProps = {
    text: string
    children: ReactNode
    delay?: number // in ms
}

export default function Tooltip({ text, children, delay = 300 }: TooltipProps) {
    return (
        <div className="relative group inline-block">
            {children}
            <div
                className="absolute z-10 left-1/2 -translate-x-1/2 -top-10
                   opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
                   pointer-events-none transition-all duration-200 ease-out"
                style={{
                    transitionDelay: `${delay}ms`,
                }}
            >
                <div className="px-3 py-1 text-sm rounded-md text-white bg-gray-900 shadow-lg whitespace-nowrap">
                    {text}
                </div>
            </div>
        </div>
    )
}
