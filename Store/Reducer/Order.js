import { Add_Order } from '../Actions/Order';
import { Order } from '../../Modal/Order';
const initial_state = {
  orders: [],
};
export const OrderReducer = (state = initial_state, action) => {
  switch (action.type) {
    case 'SET_ORDER':
      return {
        ...state,
        orders: action.payload,
      };
    case Add_Order:
      const order = new Order(
        action.payload.id,
        action.payload.items,
        action.payload.amount,
        action.payload.date
      );
      return {
        ...state,
        orders: state.orders.concat(order),
      };
    default:
      return state;
  }
};
