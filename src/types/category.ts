export interface SubChild {
    id: number;
    name: string;
    slug: string;
    image: string;
}

export interface SubCategory {
    id: number;
    name: string;
    slug: string;
    image: string;
    subchilds: SubChild[];
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    image: string;
    subcategories: SubCategory[];
}