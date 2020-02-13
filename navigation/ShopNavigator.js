import React from 'react'

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';

import colors from '../constants/colors';

import ProductOverViewScreen from '../screens/shop/productOverview';
import ProductDetailScreen from '../screens/shop/productDetail';
import CartScreen from '../screens/shop/cart';
import checkoutScreen from '../screens/shop/checkout';
import { Ionicons } from '@expo/vector-icons';


const defaultNav = {
    headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: 'white'
}


const ProductNav = createStackNavigator({
    ProductOverview: {
        screen: ProductOverViewScreen
    },
    ProductDetail: {
        screen: ProductDetailScreen
    },
    Cart: {
        screen: CartScreen
    }
    
},{
    navigationOptions:{
        drawerIcon: drawerConfig => <Ionicons 
            name= { Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
            size={23}
            color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions: defaultNav
})
    

const CheckoutNav = createStackNavigator({
    Checkout: {
        screen: checkoutScreen
    }
},{
    navigationOptions:{
        drawerIcon: drawerConfig => <Ionicons 
            name= { Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
            size={23}
            color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions: defaultNav
})


const ShopNav = createDrawerNavigator({
    Products: {
        screen: ProductNav
    },
    Checkout: CheckoutNav
},{
    contentOptions: {
        activeTintColor: colors.primary,
    }
})


export default createAppContainer(ShopNav);