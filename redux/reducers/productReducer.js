import PRODUCTS from '../../data/dummy-data';
import { DELETE_PROD, CREATE_PROD, UPDATE_PROD, SET_PRODUCT } from '../actions/product';
import Product from '../../models/product';


const initialState = {
    availableProd : PRODUCTS,
    userProd: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

const productReducer =  (state=initialState, action) => {
    switch(action.type){
        case SET_PRODUCT:
            return {
                ...state,
                availableProd: action.payload,
                userProd: action.payload.filter(prod => prod.ownerId === 'u1')
            }
        case DELETE_PROD:
            return{
                ...state,
                availableProd: state.availableProd.filter(item=> item.id !== action.payload),
                userProd: state.userProd.filter(item => item.id !== action.payload)
            }
        case CREATE_PROD:
            const newProd = new Product(
                action.payload.id, 
                'u1', 
                action.payload.title, 
                action.payload.imageUrl, 
                action.payload.description,
                action.payload.price
                );
            return {
                ...state,
                availableProd: state.availableProd.concat(newProd),
                userProd: state.userProd.concat(newProd)
            }

        case UPDATE_PROD:
            const productIndex = state.userProd.findIndex(prod => prod.id === action.pid);
            const availableProdIndex = state.availableProd.findIndex(prod => prod.id === action.pid);
            const updatedProduct = new Product(
                action.pid, 
                state.userProd[productIndex].ownerId, 
                action.payload.title, 
                action.payload.imageUrl, 
                action.payload.description, 
                state.userProd[productIndex].price
                )
            const updatedUserProduct = [...state.userProd];
            const updatedAvailableProduct = [...state.availableProd];
            updatedUserProduct[productIndex] = updatedProduct
            updatedAvailableProduct[availableProdIndex] = updatedProduct
            
            return {
                ...state,
                availableProd: updatedAvailableProduct,
                userProd: updatedUserProduct
            }
        
    }
    return state;
}

export default productReducer;