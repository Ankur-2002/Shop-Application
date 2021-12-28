import { CartItem } from '../../Modal/CartItem';
import { Add_to_cart, Clear_cart, Delete_to_cart } from '../Actions/Cart';
import { Add_Order } from '../Actions/Order';
import { DELETE_ITEM } from '../Actions/Production';
const initial_state = {
  items: {},
  TotalAmount: 0,
};

export const CartReducer = (state = initial_state, action) => {
  switch (action.type) {
    case Add_to_cart:
      const product = action.payload;
      const productPrice = product.price;
      const productTitle = product.title;
      let item = {};
      item = state.items;
      if (state.items[product.id] !== undefined) {
        // Item already exits
        item[product.id].quantity += 1;
        item[product.id].sum += product.price;
      } else {
        // create new one
        item[product.id] = new CartItem(
          1,
          +productPrice,
          productTitle,
          +productPrice
        );
      }
      return {
        ...state,
        items: item,
        TotalAmount: state.TotalAmount + productPrice,
      };
    case Delete_to_cart:
      const products = action.payload;
      let totalAmount = +state.TotalAmount;
      let items = state.items;

      if (items[products.id].quantity == 1) {
        totalAmount -= +products.price;
        delete items[products.id];
      } else {
        items[products.id].quantity -= 1;
        totalAmount -= +products.price;
      }
      return {
        ...state,
        TotalAmount: totalAmount,
        item: item,
      };
    case Add_Order:
      return {
        items: {},
        TotalAmount: 0,
      };
    case DELETE_ITEM:
      if (!state.items[action.ProductId]) return state;
      // let item1 = state.items;
      const totalAmount1 =
        state.TotalAmount - state.items[action.ProductId].sum;
      delete state.items[action.ProductId];
      return {
        ...state,
        TotalAmount: totalAmount1,
      };

    default:
      return state;
  }
};
