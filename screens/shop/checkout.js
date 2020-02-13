import React from 'react';

import { FlatList,Text } from 'react-native';
import { useSelector } from  'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/headButton.component';
import CheckoutItem from '../../components/shop/checkoutItem.component';


const checkoutScreen = props => {
    const orders = useSelector(state => state.order.orders);
    return (
        <FlatList 
        data={orders} 
        keyExtractor={item=> item.id} 
        renderItem={itemData=> 
            <CheckoutItem 
                amount={itemData.item.totalAmount}
                date={itemData.item.readableDate}
                items={itemData.item.items}
            />
        }
        />
    );
};

checkoutScreen.navigationOptions = navData => {
    return {
        headerTitle: "Checkout",
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='menu'
                    iconName='ios-menu'
                    onPress={()=> {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>,
    }
}

export default checkoutScreen;