import React from 'react';
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Add_Order, Add_to_orders } from '../../Store/Actions/Order';
// import CustomButton from '../../Component/CustomButton';
import CartItem from '../../Component/Shop/CartItem';
import { Color } from '../../Constant/Color';
// import { Clear_Cart } from '../../Store/Actions/Cart';
const CartScreen = props => {
  const Dispatch = useDispatch();
  const cart = useSelector(state => state.Cart);
  const state = useSelector(state => state.Product);
  const item = Object.keys(cart.items);
  const data = cart.items;
  // console.log(item);
  const totalAmount = cart.TotalAmount;
  // console.log(cart);z

  return (
    <>
      <View style={Styles.top}>
        <View style={Styles.Text}>
          <Text style={Styles.total}>Total </Text>
          <Text style={Styles.amount}>${totalAmount.toFixed(2)}</Text>
        </View>
        {/* <CustomButton
          title="Order"
          style={{
            fontFamily: 'open-sans',
            width: '50%',
            fontSize: 20,
            textAlign: 'center',
          }}
          color={Color.accent}
          disable={item.length}
          
        /> */}
        <Button
          title="Order"
          color={Color.accent}
          disabled={item.length === 0}
          onPress={() => {
            Dispatch(Add_to_orders(cart, totalAmount));
          }}
        />
      </View>

      <View style={Styles.Bottom}>
        <Text style={Styles.title}>Your Cart</Text>
        <View style={Styles.header}>
          <Text
            style={{
              marginLeft: 20,
            }}
          >
            {'Name'}
          </Text>
          <Text
            style={{
              marginLeft: 20,
            }}
          >
            {'Price'}
          </Text>
          <Text
            style={{
              marginLeft: 20,
            }}
          >
            {'Qty'}
          </Text>
        </View>
      </View>
      <CartItem item={item} data={data} state={state} Where={true} />
    </>
  );
};
const Styles = StyleSheet.create({
  screen: {},
  top: {
    margin: 10,
    padding: 10,
    elevation: 1,
    shadowColor: ' rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
    shadowOffset: { width: 1, height: 1 },
    borderRadius: 10,
  },
  Text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  total: {
    fontFamily: 'open-sans-bold',
    padding: 7,
    fontSize: 20,
  },
  amount: {
    fontFamily: 'open-sans-bold',
    padding: 7,
    fontSize: 20,
  },
  Bottom: {
    margin: 10,
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    borderBottomWidth: 2,
    paddingBottom: 10,
    // width:"50%"
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});
export default CartScreen;
