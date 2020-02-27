import React, { useEffect, useState} from 'react';

import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from  'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/headButton.component';
import CheckoutItem from '../../components/shop/checkoutItem.component';
import * as orderActions from '../../redux/actions/order';
import colors from '../../constants/colors';

const checkoutScreen = props => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const orders = useSelector(state => state.order.orders);

    useEffect(() => {
        setIsLoading(true);
        dispatch(orderActions.fetchOrder())
            .then(() => setIsLoading(false))
    },[dispatch])

    if (isLoading) {
        return (
            <View style={styles.indicatorContainer}>
                <ActivityIndicator size='large' color={colors.primary}/>
            </View>
        )
    }
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

const styles = StyleSheet.create({
    indicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default checkoutScreen;