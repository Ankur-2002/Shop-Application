import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '../../Component/Shop/ListItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Add_cart } from '../../Store/Actions/Cart';
import HeaderButton from '../../Component/HeaderButtons';
import { SetProduct } from '../../Store/Actions/Production';
import { Color } from '../../Constant/Color';
// import { Button } from 'react-native-web';
const ProductOverview = props => {
  // console.log(props);
  const [Spinner, setSpinner] = useState(false);
  const [Error, setError] = useState(null);
  const Dispatch = useDispatch();
  const Loader = async () => {
    setError(null);
    try {
      await Dispatch(SetProduct());
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const fun = props.navigation.addListener('willFocus', Loader);
    return () => fun?.remove();
  }, []);
  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: 'All Product',
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              iconName="menu"
              iconSize={25}
              title="menu"
              onPress={() => {
                props.navigation.toggleDrawer();
                // props.navigate.DrawerToggle();
              }}
            ></Item>
          </HeaderButtons>
        );
      },
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              iconName="cart"
              title="cart"
              iconSize={25}
              color="white"
              onPress={() => {
                props.navigation.navigate('CartScreen');
              }}
            />
          </HeaderButtons>
        );
      },
    });
    setSpinner(true);
    Loader().then(() => {
      setSpinner(false);
    });
  }, []);

  const data = useSelector(state =>
    state.Product.availableProduct.sort((a, b) => a.id < b.id)
  );
  if (Spinner)
    return (
      <View style={Styles.Spinner}>
        <ActivityIndicator size={'large'} color={Color.primary} />
      </View>
    );
  else if (!Spinner && data.length === 0)
    return (
      <View style={Styles.Spinner}>
        <Text>No Product Found</Text>
      </View>
    );
  else if (Error) {
    return (
      <View style={Styles.Spinner}>
        <Text>{Error}</Text>
        <Button
          title="Try Again"
          onPress={() => {
            Loader();
          }}
        />
      </View>
    );
  }
  return (
    <FlatList
      onRefresh={Loader}
      refreshing={Spinner}
      data={data}
      renderItem={data => {
        return (
          <ListItem
            imageUrl={data.item.imageUrl}
            title={data.item.title}
            price={data.item.price}
            button1={'View Details'}
            button2={'Cart'}
            viewDetails={() => {
              props.navigation.navigate('ProductDetail', {
                id: data.item.id,
                title: data.item.title,
              });
            }}
            cart={() => {
              Dispatch(
                Add_cart({
                  id: data.item.id,
                  title: data.item.title,
                  price: +data.item.price,
                })
              );
            }}
          />
        );
      }}
    />
  );
};

const Styles = StyleSheet.create({
  Spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ProductOverview;
