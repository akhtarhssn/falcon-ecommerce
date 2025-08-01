import { cn } from '@/lib/utils'
import React from 'react'

const MaxWidthContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("max-w-7xl mx-auto px-4 xl:px-0", className)}>{children}</div>
    )
}

export default MaxWidthContainer