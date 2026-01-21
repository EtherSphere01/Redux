import { Add_To_Cart } from "../constants";

// this file is for action creators for redux
interface CartItem {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
}

export const addToCart = ({ itemData }: { itemData: CartItem }) => {
    return {
        type: Add_To_Cart,
        data: itemData,
    };
};
