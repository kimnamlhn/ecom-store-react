export interface Category {
    name: string;
    img: string;
    code: string;
    categoryId: string;
}

export interface ProductDetail {
    id: string;
    name: string;
    img: string;
    category: Category;
    in_stock: number;
    sold: number;
    regular_price: number;
    sale_price: number;
    rating: number;
}
