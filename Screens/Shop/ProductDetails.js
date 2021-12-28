import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Button,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from '../../Component/CustomButton';
import { Color } from '../../Constant/Color';
import { Add_cart } from '../../Store/Actions/Cart';
const ProductDetails = props => {
  const state = useSelector(state => state.Product.availableProduct);
  const id = props.route.params.id;
  const Dispatch = useDispatch();

  const product = state.find(item => item.id === id);
  console.log(product);
  return (
    <ScrollView>
      <View>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
        <CustomButton
          color={Color.accent}
          title={'Add to cart'}
          onPress={() => {
            Dispatch(
              Add_cart({
                id: id,
                title: product.title,
                price: +product.price,
              })
            );
          }}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};
ProductDetails.navigationOptions = props => {
  const title = props.route.params.title;
  return {
    headerTitle: title,
  };
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  details: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: 'open-sans-bold',
  },
  price: {
    fontSize: 20,
    fontFamily: 'open-sans',
  },
  description: {
    alignItems: 'center',
    marginVertical: 10,
  },
  descriptionText: {
    fontSize: 15,

    fontFamily: 'open-sans',
  },
  descriptionTitle: {
    marginBottom: 10,
    borderBottomWidth: 3,
    padding: 6,
    fontSize: 20,
    fontFamily: 'open-sans-bold',
  },
});

export default ProductDetails;
