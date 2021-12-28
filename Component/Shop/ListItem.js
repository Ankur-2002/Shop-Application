import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Color } from '../../Constant/Color';

const ListItem = item => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === 'android') TouchableComponent = TouchableWithoutFeedback;
  return (
    <TouchableComponent onPress={item.viewDetails} activeOpacity={0.1}>
      <View style={style.screen}>
        <Image source={{ uri: item.imageUrl }} style={style.image} />
        <View style={style.details}>
          <Text style={style.title}>{item.title}</Text>
          <Text style={style.price}>${+item.price.toFixed(2)}</Text>
        </View>
        <View style={style.Button}>
          <Button
            color={Color.primary}
            title={item.button1}
            onPress={item.viewDetails}
          />
          <Button
            color={Color.accent}
            title={item.button2}
            onPress={item.cart}
          />
        </View>
      </View>
    </TouchableComponent>
  );
};
const style = StyleSheet.create({
  screen: {
    flex: 1,
    height: 280,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 2,
    margin: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '65%',
  },

  Button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    maxHeight: '15%',
  },
  details: {
    justifyContent: 'center',
    height: '20%',
    padding: 10,
    alignItems: 'center',
  },
  title: {
    // fontWeight: '700',
    fontSize: 19,
    fontFamily: 'open-sans-bold',
  },
  price: {
    fontFamily: 'open-sans',
  },
});
export default ListItem;
