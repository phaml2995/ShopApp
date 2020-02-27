import Product from "../../models/product";

export const DELETE_PROD = 'DELETE_PROD';
export const CREATE_PROD = 'CREATE_PROD';
export const UPDATE_PROD = 'UPDATE_PROD';
export const SET_PRODUCT = 'SET_PRODUCT';

export const fetchProducts = () => {
    return async dispatch => {

        try {
            const response = await fetch('https://shopapp-6c1b0.firebaseio.com/products.json');

            if (!response.ok) {
                throw new Error('Something is wrong')
            }
            const resData = await response.json();
            const loadedItems = [];
            for (const item in resData) {
                loadedItems.push(new Product(
                    item, 
                    'u1', 
                    resData[item].title,
                    resData[item].imageUrl,
                    resData[item].description,
                    resData[item].price)
                )
            }
            dispatch({
                type: SET_PRODUCT,
                payload: loadedItems
            })
        } catch(error) {
            throw error;
        }
        
    }
};


export const deleteProd = productId => {
    return async dispatch => {

       const response = await fetch(`https://shopapp-6c1b0.firebaseio.com/products/${productId}.json`,{
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        
        dispatch ({
            type: DELETE_PROD,
            payload: productId
        });
    }
    
};

export const createProd = (title,description,imageUrl,price) => {
    return async dispatch => {

        const response = await fetch('https://shopapp-6c1b0.firebaseio.com/products.json',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        });

        const resData = await response.json();

        dispatch ({
        type: CREATE_PROD,
        payload: {
            id: resData.name,
            title,
            description,
            imageUrl,
            price
            }
        })
    }
    
};

export const updateProd = (id,title,description,imageUrl) => {
    return async dispatch => {

      const response =  await fetch(`https://shopapp-6c1b0.firebaseio.com/products/${id}.json`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        dispatch ({
            type: UPDATE_PROD,
            pid: id,
            payload: { 
                title,
                description,
                imageUrl,
            }
        });
    }
   
};
