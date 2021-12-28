import React, { useCallback, useEffect, useState, useReducer } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from '../../../Component/HeaderButtons';
import { EditProducts, NewCreate } from '../../../Store/Actions/Production';
import Input from '../../../Component/Input';
import { Color } from '../../../Constant/Color';
const Update_Form_Input = 'Update_Form_Input';
const Update_Form_Validity = 'Update_Validity';

const EditProduct = props => {
  const [Loader, setLoader] = useState(false);
  const [Error, setError] = useState(null);
  const userProduct = useSelector(state => state.Product.userProduct);
  const id = props.route?.params?.id;
  const FormReducer = (state, action) => {
    switch (action.type) {
      case Update_Form_Input:
        const InputValues = {
          ...state.InputText,
          [action.payload.id]: action.payload.text,
        };
        const InputValidity = {
          ...state.InputValid,
          [action.payload.id]: action.payload.isValid,
        };

        let Valid = true;
        for (const key in InputValidity) {
          Valid = Valid && InputValidity[key];
        }

        return {
          FormValid: Valid,
          InputText: InputValues,
          InputValid: InputValidity,
        };
      case Update_Form_Validity:
        return {
          ...state,
          InputValid: { ...action.payload },
          FormValid: false,
        };
      default:
        return state;
    }
  };
  const CurrentProuduct = id && userProduct.find(item => item.id === id);

  const [FormState, SetFormState] = useReducer(FormReducer, {
    InputText: {
      Title: CurrentProuduct ? CurrentProuduct.title : '',
      ImageUrl: CurrentProuduct ? CurrentProuduct.imageUrl : '',
      Description: CurrentProuduct ? CurrentProuduct.description : '',
      Price: CurrentProuduct ? CurrentProuduct.price : '',
    },
    InputValid: {
      Title: true,
      ImageUrl: true,
      Description: true,
      Price: true,
    },
    FormValid: false,
  });
  useEffect(() => {
    if (Error != null)
      return Alert.alert('Error', Error, [
        {
          text: 'OK',
          style: 'default',
        },
      ]);
  }, [Error]);

  const Dispatch = useDispatch();

  const InputHandler = async (text, id) => {
    let isValid = false;
    if (text.trim().length > 0) isValid = true;
    await SetFormState({
      type: Update_Form_Input,
      payload: {
        id: id,
        text: text,
        isValid: isValid,
      },
    });
  };
  const Update = useCallback(() => {
    if (
      FormState.InputText.Title.trim().length > 0 &&
      FormState.InputText.Price.toString().trim().length > 0 &&
      FormState.InputText.Description.trim().length > 0 &&
      FormState.InputText.ImageUrl.trim().length > 0
    ) {
      return {
        title: FormState.InputText.Title,
        price: FormState.InputText.Price,
        description: FormState.InputText.Description,
        imageUrl: FormState.InputText.ImageUrl,
        id: id,
      };
    } else {
      SetFormState({
        type: Update_Form_Validity,
        payload: {
          Title: FormState.InputText.Title.trim().length > 0,
          ImageUrl: FormState.InputText.ImageUrl.trim().length > 0,
          Price: FormState.InputText.Price.toString().trim().length > 0,
          Description: FormState.InputText.Description.trim().length > 0,
        },
      });
      Alert.alert('Error!', 'Please check your details', [
        { text: 'Ok', style: 'cancel' },
      ]);
      return false;
    }
  }, [FormState, SetFormState]);

  const UpdateHandler = async () => {
    const check = await Update();
    setLoader(true);
    setError(null);
    try {
      if (check) {
        if (id) await Dispatch(EditProducts(check));
        else await Dispatch(NewCreate(check));
      }
    } catch (error) {
      setLoader(false);
      setError(error.message);
    }
  };
  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: id ? 'Edit' : 'Create',
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              iconName="checkbox"
              iconSize={25}
              title="checkbox"
              onPress={async () => {
                await UpdateHandler().then(() => {
                  props.navigation.pop();
                });
              }}
            ></Item>
          </HeaderButtons>
        );
      },
    });
  }, [FormState]);

  if (Loader) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator color={Color.accent} size={'large'} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={Styles.Form}>
        <Input
          label={'Title'}
          text={FormState.InputText.Title}
          InputHandler={InputHandler}
          valid={FormState.InputValid.Title}
        />
        <Input
          label={'ImageUrl'}
          text={FormState.InputText.ImageUrl}
          InputHandler={InputHandler}
          valid={FormState.InputValid.ImageUrl}
        />

        <Input
          label={'Price'}
          text={FormState.InputText.Price?.toString()}
          InputHandler={InputHandler}
          keyboardType="number-pad"
          valid={FormState.InputValid.Price}
        />

        <Input
          label={'Description'}
          text={FormState.InputText.Description}
          InputHandler={InputHandler}
          multiline
          numberOfLines={2}
          valid={FormState.InputValid.Description}
        />
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  Form: {
    margin: 20,
  },
  formControl: {
    marginVertical: 10,
    padding: 10,
  },
  label: {
    fontFamily: 'open-sans-bold',
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 2,
    borderBottomWidth: 2,
    borderColor: '#ccc',
  },
});
export default EditProduct;
