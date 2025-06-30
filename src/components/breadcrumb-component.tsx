import {
    Breadcrumb,
    BreadcrumbList
} from "@/components/ui/breadcrumb"

import React from 'react'

const BreadcrumbComponent = ({ children }: { children: React.ReactNode }) => {
    return (
        <Breadcrumb className="py-4 px-5 md:px-0 font-onest">
            <BreadcrumbList>
                {children}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadcrumbComponent