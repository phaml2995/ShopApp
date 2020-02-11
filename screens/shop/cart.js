import React from 'react';
import { View, Text, StyleSheet,Button, FlatList} from 'react-native';
import { useSelector } from 'react-redux' ;
import colors from '../../constants/colors';
import CartItem from '../../components/shop/cartItem.component';
import { useDispatch } from 'react-redux';

import * as cartActions from '../../redux/actions/cart';

const CartScreen = props => {
    const cartAmount = useSelector(state => state.cart.totalAmount);
    const cartItem = useSelector(state => {
        const cartArray  = [];
        for (const key in state.cart.items) {
            cartArray.push({
                producId: key,
                prodTitle: state.cart.items[key].title,
                prodPrice: state.cart.items[key].price,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return cartArray.sort((a,b) => a.producId> b.producId ? 1 : -1);
    });

    const dispatch = useDispatch();

    return (
        <View style={styles.mainView}>
            <View style={styles.summary}>
                <Text style={styles.price}>
                    Total: <Text style={styles.amount}>${cartAmount.toFixed(2)}</Text>
                </Text>
                <Button color={colors.accent} title='Checkout' disabled={cartItem.length===0}/>
            </View>
            <FlatList 
                data={cartItem} 
                keyExtractor={item=> item.producId} 
                renderItem={itemData => 
                    <CartItem 
                        quantity={itemData.item.quantity} 
                        title={itemData.item.prodTitle}
                        amount={itemData.item.sum}
                        onRemove={()=> {
                            dispatch(cartActions.removeFromCart(itemData.item.producId));
                        }}
                    />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width:0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor:'white'
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    amount: {
        color: colors.primary
    }
});

export default CartScreen;