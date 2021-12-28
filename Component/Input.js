import React, { useReducer } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const Input_Update = 'Input_Update';

// const FormReducer = (state, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };
const Input = props => {
  const InputStyles = !props.valid
    ? { borderBottomWidth: 2, borderColor: 'red' }
    : '';
  //   const [Formstate, setForm] = useReducer(FormReducer, {
  //     InputText: {
  //       text: props.text ? props.text : '',
  //     },
  //     InputValid: {
  //       text: props.text ? true : false,
  //     },
  //     FormValid: props?.text ? true : false,
  //   });
  //   const InputHandler = (text, id) => {
  //     let valid = false;
  //     if (text.trim().length > 0) {
  //       valid = true;
  //     }
  //     setForm({
  //       type: Input_Update,
  //       payload: {
  //         id: id,
  //         text: text,
  //         isValid: valid,
  //       },
  //     });
  //   };
  return (
    <KeyboardAvoidingView keyboardVerticalOffset={100} behavior="height">
      <View style={Styles.Form} key={props.label}>
        <View style={{ ...Styles.formControl }}>
          <Text style={Styles.label}>{props.label}</Text>
          {/* <TextInput
          // style={{ ...Styles.input, ...props?.style, ...InputStyles }}
          keyboardType={props?.keyboardType ? props.keyboardType : 'default'}
          value={props?.text}
          autoCorrect
          onChangeText={text => props.InputHandler(text, props.label)}
          multiline
          numberOfLines={props?.numberOfLines ? props.numberOfLines : 1}
        /> */}
          <View>
            <TextInput
              value={props.text}
              style={{
                ...Styles.input,
                ...props.style,
                ...InputStyles,
              }}
              onChangeText={text => props.InputHandler(text, props.label)}
              keyboardType={props.keyboardType ? props.keyboardType : 'default'}
            />
          </View>
        </View>

        {!props.valid && <Ionicons name="bug" color={'red'} size={20} />}
      </View>
    </KeyboardAvoidingView>
  );
};
const Styles = StyleSheet.create({
  Form: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formControl: {
    marginVertical: 1,
    padding: 10,
    flex: 1,
  },
  label: {
    fontFamily: 'open-sans-bold',
    fontWeight: '700',
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 2,
    borderBottomWidth: 2,

    borderColor: '#ccc',
  },
});
export default Input;
