export const Add_to_cart = 'ADD_TO_CART';
export const Delete_to_cart = 'DELETE_TO_CART';
export const Clear_cart = 'CLEAR_CART';
export const Delete_cart = product => {
  return {
    type: Delete_to_cart,
    payload: product,
  };
};
export const Add_cart = product => {
  return {
    type: Add_to_cart,
    payload: product,
  };
};
export const Clear_Cart = () => {
  return {
    type: Clear_cart,
  };
};
