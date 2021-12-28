import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Delete_cart } from '../../Store/Actions/Cart';
const CartItem = ({ item, data, state, Where }) => {
  // const data = useSelector(state => state.Cart.items);
  // console.log(data, 'Data');
  const Dispatch = useDispatch();
  const Products = useSelector(state => state.Product.availableProduct);
  return (
    <FlatList
      data={item}
      keyExtractor={item => item}
      renderItem={id => {
        const img = Products.find(item => item.id === id.item).imageUrl;
        return (
          <View key={id.item} style={Styles.CartItem}>
            <View style={Styles.top}>
              <Image
                source={{
                  uri: img,
                }}
                style={Styles.Image}
              />
            </View>
            <View style={Styles.middle}>
              <Text style={Styles.text}>{data[id.item].productTitle}</Text>
              <Text style={Styles.text}>
                Price : ${data[id.item].productPrice}
              </Text>
              <Text style={Styles.text}>QTY : {data[id.item].quantity}</Text>
              <Text style={Styles.text}>
                Total : $
                {(
                  +data[id.item].productPrice * +data[id.item].quantity
                ).toFixed(2)}
              </Text>
            </View>
            <View style={Styles.icon}>
              {Where === true && (
                <Ionicons
                  name="trash"
                  size={30}
                  onPress={() => {
                    Dispatch(
                      Delete_cart({
                        id: id.item,
                        price: data[id.item].productPrice,
                        quantity: data[id.item].quantity,
                      })
                    );
                  }}
                />
              )}
            </View>
          </View>
        );
      }}
    />
  );
};
const Styles = StyleSheet.create({
  CartItem: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 15,
    alignItems: 'stretch',
    // borderWidth: 1,
    marginBottom: 10,
    elevation: 1,
    overflow: 'hidden',
  },
  top: {
    padding: 10,
    height: 120,
    width: 120,
    overflow: 'hidden',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    width: '100%',
    height: '100%',
  },
  middle: {
    justifyContent: 'space-evenly',
  },
  icon: {
    // margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  text: {
    fontFamily: 'open-sans-bold',
  },
});
export default CartItem;
