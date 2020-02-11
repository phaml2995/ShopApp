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
    defaultNavigationOptions: {
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
});

export default createAppContainer(ProductNav);