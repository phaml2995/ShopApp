import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const LOAD_ORDER = 'LOAD_ORDER'; 

export const addOrder = (cartItems,totalAmount) => {
    return async dispatch => {

        const date = new Date();
        const response = await fetch('https://shopapp-6c1b0.firebaseio.com/orders/u1.json',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const resData = await response.json();

        dispatch ({
            type: ADD_ORDER,
            payload: {
                id: resData.name,
                items: cartItems,
                amount: totalAmount,
                date: date
            }
        });
    }
    
};


export const fetchOrder = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://shopapp-6c1b0.firebaseio.com/orders/u1.json');

            if (!response.ok) {
                throw new Error('Something is wrong')
            }
            const resData = await response.json();
            const loadedOrders = [];
            for (const item in resData) {
               loadedOrders.push(new Order(
                   item,
                   resData[item].cartItems,
                   resData[item].totalAmount,
                   new Date(resData[item].date)
               ))
            }
            dispatch ({
                type: LOAD_ORDER,
                payload: loadedOrders
            })
        } catch (err) {

        }
    }
}