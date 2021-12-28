import React from 'react';
// import { createDrawerNavigator } from 'react-navigation-drawer';
// import { createNativeStackNavigator } from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Color } from '../Constant/Color';
import ProductDetails from '../Screens/Shop/ProductDetails';
import ProductOverview from '../Screens/Shop/ProductOverview';
import CartScreen from '../Screens/Shop/CartScreen';
import OrderScreens from '../Screens/Shop/OrdersScreens';
// import Shopnavigation from './Navigations/Shopnavigation';
import UserProduct from '../Screens/Shop/User/UserProduct';
import HeaderButton from '../Component/HeaderButtons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import EditProduct from '../Screens/Shop/User/EditProduct';
import AuthScreen from '../Screens/Shop/User/AuthScreen';
import { StartUp } from '../Screens/StartUp';
import { View, SafeAreaView, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { Logout, LogoutAuth } from '../Store/Actions/Auth';
// import {}

const ShopNavigator = createNativeStackNavigator();
const ShopNavigatorApp = () => {
  return (
    <ShopNavigator.Navigator
      screenOptions={{
        drawerIcon: config => {
          return <Ionicons name="md-cart" color={config.tintColor} size={25} />;
        },
      }}
      defaultScreenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: Color.primary,
        },
      }}
    >
      <ShopNavigator.Screen
        navigationKey="Product"
        name="Product"
        component={ProductOverview}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <ShopNavigator.Screen
        navigationKey="ProductDetails"
        name="ProductDetail"
        component={ProductDetails}
        options={{}}
      />
      <ShopNavigator.Screen
        navigationKey="CartScreen"
        name="CartScreen"
        component={CartScreen}
        options={{}}
      />
    </ShopNavigator.Navigator>
  );
};
const UserNavigation = createNativeStackNavigator();
const UserNavigationApp = () => {
  return (
    <UserNavigation.Navigator
      screenOptions={{
        drawerIcon: config => {
          return <Ionicons name="md-cart" color={config.tintColor} size={25} />;
        },
      }}
      defaultScreenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: Color.primary,
        },
      }}
    >
      <UserNavigation.Screen
        navigationKey="UserProduct"
        name="UserProduct"
        component={UserProduct}
      />
      <UserNavigation.Screen
        navigationKey="Edit"
        name="Edit"
        component={EditProduct}
      />
    </UserNavigation.Navigator>
  );
};
// {
//   Order: OrderScreens,
// },
// {
//   navigationOptions: {
//     drawerIcon: config => {
//       return <Ionicons name="md-list" color={config.tintColor} size={25} />;
//     },
//   },
//   defaultNavigationOptions: {
//     headerTitle: 'Your Orders',
//     headerStyle: {
//       backgroundColor: Color.primary,
//     },
//     headerTintColor: 'white',
//   },
// }
const OrderNavigation = createNativeStackNavigator();

const OrderNavigationApp = () => {
  return (
    <OrderNavigation.Navigator
      screenOptions={{
        drawerIcon: config => {
          return <Ionicons name="md-list" color={config.tintColor} size={25} />;
        },
      }}
    >
      <OrderNavigation.Screen
        navigationKey="OrderNavigation"
        name="Order"
        component={OrderScreens}
      />
    </OrderNavigation.Navigator>
  );
};
const DrawerNavigation = createDrawerNavigator();
const DrawerNavigationApp = () => {
  return (
    <DrawerNavigation.Navigator
      drawerContent={props => {
        return (
          <View>
            <DrawerItemList {...props} />
            <Drawer props={props} />
          </View>
        );
      }}
    >
      <DrawerNavigation.Screen
        navigationKey="Shop"
        name="Shop"
        component={ShopNavigatorApp}
        options={{
          headerShown: false,
          drawerIcon: config => {
            return <Ionicons size={25} color={Color.accent} name="md-cart" />;
          },
        }}
      />
      <DrawerNavigation.Screen
        navigationKey="Order"
        name="Order"
        component={OrderNavigationApp}
        options={{
          headerShown: false,
          drawerIcon: config => {
            return <Ionicons size={25} color={Color.accent} name="md-cafe" />;
          },
        }}
      />
      <DrawerNavigation.Screen
        navigationKey="Admin"
        name="Admin"
        component={UserNavigationApp}
        options={{
          headerShown: false,
          drawerIcon: config => {
            return (
              <Ionicons size={25} color={Color.accent} name="md-desktop" />
            );
          },
        }}
      />
    </DrawerNavigation.Navigator>
  );
};

const AuthNavigator = createNativeStackNavigator();
const AuthNavigatorApp = () => {
  return (
    <AuthNavigator.Navigator
      key={2}
      defaultScreenOptions={{
        headerTitle: 'Authentication',
        headerTintColor: Color.primary,
        headerStyle: {
          backgroundColor: Color.accent,
        },
      }}
    >
      <AuthNavigator.Screen
        navigationKey="StartUp"
        name={'StartUp'}
        component={StartUp}
        options={{ headerShown: false }}
      />
      <AuthNavigator.Screen
        navigationKey="Auth"
        name={'Auth'}
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      {/*   {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitle: 'Authentication',
      headerTintColor: Color.primary,

      headerStyle: {
        backgroundColor: Color.accent,
      },
    },
  } */}
    </AuthNavigator.Navigator>
  );
};
// const Auth = createNativeStackNavigator({
//   Auths: AuthScreen,
// });
const SwitchNavigator = createNativeStackNavigator();
const SwitchNavigatorApp = ({ refs }) => {
  return (
    <NavigationContainer ref={refs}>
      <SwitchNavigator.Navigator>
        <SwitchNavigator.Screen
          navigationKey="Authentication"
          name="Authentication"
          component={AuthNavigatorApp}
        />
        <SwitchNavigator.Screen
          navigationKey="ShopNavigator"
          name="ShopNavigator"
          component={DrawerNavigationApp}
          options={{ headerShown: false }}
        />
      </SwitchNavigator.Navigator>
    </NavigationContainer>
  );
};
// const App = () => {
//   return (
//     <NavigationContainer>
//       <SwitchNavigator />
//     </NavigationContainer>
//   );
// };
export default SwitchNavigatorApp;

const Drawer = props => {
  const Dispatch = useDispatch();
  return (
    <Button
      title="Logout"
      onPress={() => {
        // console.log(props.props.navigation);
        Dispatch(Logout());
        // props.props.navigation.navigate({
        //   name: 'Auth',
        //   key: 'Auth',
        // });
      }}
    />
  );
};
