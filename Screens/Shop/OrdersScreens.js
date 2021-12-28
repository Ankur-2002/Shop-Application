import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../Component/HeaderButtons';
import { useSelector, useDispatch } from 'react-redux';
import Order from '../../Component/Shop/Order';
import { Set_Orders } from '../../Store/Actions/Order';
const OrderScreens = props => {
  const state = useSelector(state => state.Order.orders);
  const [Spinner, setSpinner] = useState(false);
  const Dispatch = useDispatch();
  // console.log(state, 'asdf');
  const Load = async () => {
    setSpinner(true);
    try {
      await Dispatch(Set_Orders());
    } catch (er) {}
    setSpinner(false);
  };
  useEffect(() => {
    Load();
  }, []);
  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              iconName="menu"
              iconSize={25}
              title="menu"
              onPress={() => {
                props.navigation.toggleDrawer();
              }}
            ></Item>
          </HeaderButtons>
        );
      },
    });
  }, []);
  return (
    <View>
      <FlatList
        onRefresh={Load}
        refreshing={Spinner}
        data={state}
        renderItem={item => <Order items={item.item} />}
      />
    </View>
  );
};

export default OrderScreens;
