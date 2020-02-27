import { ADD_ORDER, LOAD_ORDER } from "../actions/order";
import Order from "../../models/order";

const initialState = {
    orders: []
};

const OrderRreducer = (state=initialState,action) => {
    switch(action.type) {
        case LOAD_ORDER:
            return {
                ...state,
                orders: action.payload
            }
        case ADD_ORDER:
            const newOrder = new Order(
                action.payload.id, 
                action.payload.items, 
                action.payload.amount,
                action.payload.date
            );
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
    }
    return state;
}

export default OrderRreducer;