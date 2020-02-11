import PRODUCTS from '../../data/dummy-data';


const initialState = {
    availableProd : PRODUCTS,
    userProd: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

const productReducer =  (state=initialState, action) => {
    return state;
}

export default productReducer;