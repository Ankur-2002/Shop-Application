import Data from '../../Data/dummy-data';
import Product from '../../Modal/Product';
import { DELETE_ITEM, EDIT_ITEM, SET_PRODUCT } from '../Actions/Production';
const initial_state = {
  availableProduct: Data,
  userProduct: Data.filter(item => item.ownerId === 'u1'),
};

export const ProductReducer = (state = initial_state, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...state,
        availableProduct: action.products,
        userProduct: action.products.filter(
          item => item.ownerId === action.userId
        ),
      };
    case DELETE_ITEM:
      let userProduct = state.userProduct;
      let availableProduct = state.availableProduct;
      availableProduct = availableProduct.filter(
        item => item.id !== action.ProductId
      );
      userProduct = userProduct.filter(item => item.id !== action.ProductId);

      return {
        ...state,
        availableProduct: availableProduct,
        userProduct: userProduct,
      };
    case EDIT_ITEM:
      // console.log(state);
      const prod = action.payload;
      // console.log(prod);
      const product = new Product(
        prod?.id ? prod.id : new Date().toString(),
        'u1',
        prod.title,
        prod.imageUrl,
        prod.description,
        +prod.price
      );
      // console.log(product, 'Ankurr');
      let AvailableProducts = state.availableProduct;
      let UserProducts = state.userProduct;
      const index = UserProducts.findIndex(item => item.id === prod.id);
      if (index === -1) {
        UserProducts = UserProducts.concat(product);
        AvailableProducts = AvailableProducts.concat(product);
      } else {
        let indexs = AvailableProducts.findIndex(item => item.id === prod.id);
        // console.log(prod, AvailableProducts, 'Ankur');
        AvailableProducts.splice(indexs, 1);
        AvailableProducts = AvailableProducts.concat(product);
        UserProducts.splice(index, 1);
        UserProducts = UserProducts.concat(product);
      }
      return {
        ...state,
        availableProduct: AvailableProducts,
        userProduct: UserProducts,
      };
    default:
      return state;
  }
};
