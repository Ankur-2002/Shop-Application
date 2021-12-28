export const DELETE_ITEM = 'DELETE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const SET_PRODUCT = 'SET_PRODUCT';
import Product from '../../Modal/Product';
export const DeleteItem = id => {
  return async (dispatch, getState) => {
    const userId = getState().Auth.userId;
    const Delete = await fetch(
      `https://shopappreactnative-e40ae-default-rtdb.firebaseio.com/product/${userId}/${id}.json`,
      {
        method: 'DELETE',
      }
    );

    // console.log(Delete);
    dispatch({
      type: DELETE_ITEM,
      ProductId: id,
    });
  };
};

export const SetProduct = () => {
  return async (dispatch, getState) => {
    // console.log(getState(), 'Ankur');
    const userId = getState().Auth.userId;
    try {
      const Data = await fetch(
        `https://shopappreactnative-e40ae-default-rtdb.firebaseio.com/product/${userId}.json`
      );
      const data = await Data.json();
      let product = [];
      for (const key in data) {
        product.push(
          new Product(
            key,
            userId,
            data[key].title,
            data[key].imageUrl,
            data[key].description,
            +data[key].price
          )
        );
      }

      return await dispatch({
        type: SET_PRODUCT,
        products: product,
        userId: userId,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const EditProducts = product => {
  return async (dispatch, getState) => {
    const userId = getState().Auth.userId;
    try {
      const Update = await fetch(
        `https://shopappreactnative-e40ae-default-rtdb.firebaseio.com/product/${userId}/${product.id}.json`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: product.title,
            price: product.price,
            description: product.description,
            imageUrl: product.imageUrl,
          }),
        }
      );
      // console.log(Update, 'Update');
      if (!Update.ok) throw new Error('Something went wrong');

      return await dispatch({
        type: EDIT_ITEM,
        payload: product,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const NewCreate = product => {
  return async (dispatch, getState) => {
    // console.log(product, 'Database');
    const userId = getState().Auth.userId;
    try {
      const Product = await fetch(
        `https://shopappreactnative-e40ae-default-rtdb.firebaseio.com/product/${userId}.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: product.title,
            price: product.price,
            description: product.description,
            imageUrl: product.imageUrl,
          }),
        }
      );
      const Obj = await Product.json();
      const Name = Obj.name;
      return dispatch({
        type: EDIT_ITEM,
        payload: { ...product, id: Name },
      });
    } catch (error) {
      throw error;
    }
  };
};
