export const DELETE_PROD = 'DELETE_PROD';
export const CREATE_PROD = 'CREATE_PROD';
export const UPDATE_PROD = 'UPDATE_PROD';

export const deleteProd = productId => {
    return {
        type: DELETE_PROD,
        payload: productId
    };
};

export const createProd = (title,description,imageUrl,price) => {
    return {
        type: CREATE_PROD,
        payload: {
            title,
            description,
            imageUrl,
            price
        }
    };
};

export const updateProd = (id,title,description,imageUrl) => {
    return {
        type: UPDATE_PROD,
        pid: id,
        payload: { 
            title,
            description,
            imageUrl,
        }
    };
};
