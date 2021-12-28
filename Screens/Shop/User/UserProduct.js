import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../../Component/HeaderButtons';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '../../../Component/Shop/ListItem';
import { DeleteItem } from '../../../Store/Actions/Production';
import { Color } from '../../../Constant/Color';

const UserProduct = props => {
  const [Loader, setLoader] = useState(false);
  const UserItems = useSelector(state =>
    state.Product.userProduct.sort((a, b) => a.id < b.id)
  );

  const Dispatch = useDispatch();
  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: 'User',
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              iconName="menu"
              iconSize={25}
              title="menu"
              onPress={() => props.navigation.toggleDrawer()}
            ></Item>
          </HeaderButtons>
        );
      },
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              iconName="md-create"
              iconSize={25}
              title="add"
              onPress={() => {
                props.navigation.navigate('Edit');
              }}
            ></Item>
          </HeaderButtons>
        );
      },
    });
  }, []);
  const DeleteHandler = async id => {
    setLoader(true);
    try {
      await Dispatch(DeleteItem(id));
    } catch (er) {
      console.log(er);
    }
    setLoader(false);
  };

  const Delete = id => {
    Alert.alert('DELETE', "'Do you want to delete this product.'", [
      {
        text: 'NO',
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => DeleteHandler(id),
      },
    ]);
  };
  if (Loader) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator color={Color.primary} size={'large'} />
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={UserItems}
        renderItem={item => {
          return (
            <ListItem
              title={item.item.title}
              price={item.item.price}
              imageUrl={item.item.imageUrl}
              viewDetails={() => {
                props.navigation.navigate('Edit', {
                  id: item.item.id,
                });
              }} // For Edit
              cart={() => {
                Delete(item.item.id);
              }} // For Delete
              button1={'EDIT'}
              button2={'DELETE'}
            />
          );
        }}
      />
    </View>
  );
};
UserProduct.navigationOptions = props => {
  return {};
};
export default UserProduct;
