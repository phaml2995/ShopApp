import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { createStore,combineReducers,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import Thunk from 'redux-thunk';

import productReducer from './redux/reducers/productReducer';
import ShopNavigator from './navigation/ShopNavigator';
import cartReducer from './redux/reducers/cartReducer';
import OrderRreducer from './redux/reducers/orderReducer';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  order: OrderRreducer
});

const store = createStore(rootReducer,applyMiddleware(Thunk));

const fetchFonts = () => {
  return (
    Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    })
  )
}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);
  
  if (!fontLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={() => {
      setFontLoaded(true)
    }}/>
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
