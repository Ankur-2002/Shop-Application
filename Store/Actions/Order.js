export const Add_Order = 'ADD_TO_ORDER';
export const Set_Order = 'Set_Order';
import { Order } from '../../Modal/Order';
// import { SetProduct, SET_PRODUCT } from './Production';
export const Set_Orders = () => {
  return async (dispatch, getState) => {
    const userId = getState().Auth.userId;
    try {
      // console.log('fasle');
      const Orders = await fetch(
        `https://shopappreactnative-e40ae-default-rtdb.firebaseio.com/orders/${userId}.json`
      );
      const Data = await Orders.json();
      const orders = [];

      for (const key in Data) {
        const order = new Order(
          key, // Data[key].name,
          Data[key].items,
          Data[key].totalAmount,
          Data[key].date
        );
        orders.push(order);
      }
      // console.log(orders);

      return await dispatch({
        type: 'SET_ORDER',
        payload: orders,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const Add_to_orders = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const userId = getState().Auth.userId;
    const date = new Date();
    const Order = await fetch(
      `https://shopappreactnative-e40ae-default-rtdb.firebaseio.com/orders/${userId}.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: { ...cartItems.items },
          totalAmount: totalAmount,
          date: date.toISOString(),
        }),
      }
    );
    const Data = await Order.json();
    return await dispatch({
      type: Add_Order,
      payload: {
        id: Data.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
