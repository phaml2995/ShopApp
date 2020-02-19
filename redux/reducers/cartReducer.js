import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/order";
import { DELETE_PROD } from "../actions/product";

const initialState = {
    items: {},
    totalAmount: 0
};


const cartReducer =  (state=initialState, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const addedProdPrice = addedProduct.price;
            const prodTitle = addedProduct.title;

            if (state.items[addedProduct.id]) {
                const updatedCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodTitle,
                    addedProdPrice,
                    state.items[addedProduct.id].sum + addedProdPrice
                );
                return {
                    ...state,
                    items: {...state.items, [addedProduct.id]: updatedCartItem},
                    totalAmount: state.totalAmount + addedProdPrice
                }
            } else {
                const newCartItem = new CartItem(1,prodTitle,addedProdPrice,addedProdPrice)
                return {
                    ...state,
                    items: {...state.items, [addedProduct.id]: newCartItem},
                    totalAmount: state.totalAmount + addedProdPrice
                }
            }
        case REMOVE_FROM_CART:
            const selectedProdId = state.items[action.pid]
            const currentQty = selectedProdId.quantity;
            let updatedCartItems;
            if (currentQty > 1){
                const updatedCartItem = new CartItem(
                    selectedProdId.quantity -1,
                    selectedProdId.title,
                    selectedProdId.price,
                    selectedProdId.sum - selectedProdId.price
                );
                updatedCartItems = {...state.items,[action.pid]: updatedCartItem}
            } else {
                updatedCartItems = {...state.items};
                delete updatedCartItems[action.pid];
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: Math.abs(state.totalAmount - selectedProdId.price)
            }
        case ADD_ORDER:
            return initialState;
        case DELETE_PROD:
            if (!state.items[action.payload]){
                return state;
            }
            const updatedItems = {...state.items};
            const itemTotal = state.items[action.payload].sum;
            delete updatedItems[action.payload]
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount-itemTotal
            }
    }
    return state;
}

export default cartReducer;