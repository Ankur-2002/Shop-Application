import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const CustomButton = props => {
  return (
    <View style={Style.screen}>
      {/* <Text
        style={{
          ...Style.text,
          ...props.style,
          backgroundColor: props.color,
        }}
        onPress={props.onPress}
      >
        {props.title}
      </Text> */}
      <Button onPress={props.onPress} title={props.title} />
    </View>
  );
};

const Style = StyleSheet.create({
  screen: {
    alignItems: 'center',
    padding: 10,
  },
  text: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    fontSize: 18,
    fontWeight: '600',

    fontFamily: 'open-sans-bold',
  },
});
export default CustomButton;
