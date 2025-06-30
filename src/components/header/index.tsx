import React from 'react';

import CategoryMenu from '@/components/header/category';
import NavigationBar from '@/components/header/navbar';
import { cn } from '@/lib/utils';

type HeaderProps = {
    className?: string;
    children?: React.ReactNode;
}

const Header = ({ className }: HeaderProps) => {
    return (
        <header className={cn("bg-white", className)}>
            <NavigationBar />
            <CategoryMenu />
        </header>
    )
}

export default Header