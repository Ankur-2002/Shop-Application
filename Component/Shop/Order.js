import React, { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { Color } from '../../Constant/Color';
import CartItem from '../../Component/Shop/CartItem';
// import { useDispatch } from 'react-redux';
const Order = props => {
  // const Dispatch = useDispatch();
  const [Show, SetShow] = useState(false);
  const ItemsId = Object.keys(props.items.item);
  const Items = { ...props.items.item };
  // console.log(ItemsId, 'Ids');
  // console.log(props, 'Items');
  // console.log(props, 'IDS');
  // console.log(Items, 'ITEMS');
  return (
    // <View></View>
    <View style={Styles.Main}>
      <View style={Styles.screen}>
        <Text style={{ ...Styles.text, color: 'red' }}>
          ${props.items.totalAmount.toFixed(2)}
        </Text>
        <Text style={Styles.text}>{props.items.Time}</Text>
      </View>
      <View style={Styles.Button}>
        <Button
          title="View Details"
          onPress={() => {
            SetShow(!Show);
          }}
          color={Color.accent}
        />
      </View>
      {Show && <CartItem item={ItemsId} data={Items} key={1} />}
    </View>
  );
};
const Styles = StyleSheet.create({
  Main: {
    padding: 10,
    margin: 10,
    elevation: 2,
    shadowColor: 'grey',
    shadowOffset: { width: 10, height: 10 },
    borderRadius: 1,
  },
  screen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Button: {
    alignItems: 'center',
    margin: 10,
  },
  text: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,
  },
});

export default Order;
