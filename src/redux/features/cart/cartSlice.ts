import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, Variation } from '@/types/product';

interface CartItem {
    id: string | number;
    name: string;
    thumbnail: string;
    price: string;
    quantity: number;
    variation?: Variation;
}

interface CartState {
    items: CartItem[];
}

// Load state from localStorage
const loadState = (): CartState => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) {
            return { items: [] };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Error loading cart from localStorage:', err);
        return { items: [] };
    }
};

// Save state to localStorage
const saveState = (state: CartState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cart', serializedState);
    } catch (err) {
        console.error('Error saving cart to localStorage:', err);
    }
};

const initialState: CartState = loadState();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product & { selectedVariation: Variation | null; quantity: number }>) => {
            const { id, name, thumbnail, product_detail, total_stock_qty, selectedVariation, quantity } = action.payload;
            const price = selectedVariation
                ? selectedVariation.discount_price || selectedVariation.regular_price
                : product_detail.discount_price || product_detail.regular_price;
            const stock = selectedVariation ? selectedVariation.total_stock_qty : total_stock_qty;
            const image = selectedVariation ? selectedVariation.image : thumbnail;
            if (stock < quantity) return; // Prevent adding if insufficient stock
            const itemId = selectedVariation ? `${id}-${selectedVariation.id}` : `${id}`;
            const item = state.items.find((item) => item.id === itemId);
            if (item) {
                if (stock < item.quantity + quantity) return; // Prevent exceeding stock
                item.quantity += quantity;
            } else {
                state.items.push({
                    id: itemId,
                    name: selectedVariation
                        ? `${name} (${selectedVariation.variation_attributes
                            .map((attr) => `${attr.attribute.name}: ${attr.attribute_option.attribute_value}`)
                            .join(', ')})`
                        : name,
                    thumbnail: image,
                    price,
                    quantity,
                    variation: selectedVariation || undefined,
                });
            }
            saveState(state); // Save to localStorage after state change
        },
        removeFromCart: (state, action: PayloadAction<string | number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            saveState(state); // Save to localStorage after state change
        },
        updateQuantity: (state, action: PayloadAction<{ id: string | number; quantity: number }>) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
                saveState(state); // Save to localStorage after state change
            }
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;