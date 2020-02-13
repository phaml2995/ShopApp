import React, { useState } from 'react';

import { View, Text, Image, Button, StyleSheet } from 'react-native';
import CartItem from './cartItem.component';
import colors from '../../constants/colors';



const CheckoutItem = props => {
    const [showDetails, setShowDetails] = useState(false); 
    return(
        <View style={styles.mainView}>
            <View style={styles.textContainer}>
                <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={colors.primary} title={showDetails ? "Hide Details" :"Show Details"  } onPress={()=>{
                setShowDetails(prevState => !prevState)
            }}/>
            {showDetails && <View style={styles.showDetails}>
                {props.items.map(cartItem => 
                    <CartItem
                        key={cartItem.producId}
                        quantity={cartItem.quantity}
                        amount = {cartItem.sum}
                        title={cartItem.prodTitle}
                    />
                )}
            </View>}
        </View>
    )
};

const styles = StyleSheet.create({
    mainView: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width:0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor:'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16
    },
    showDetails: {
        width: '100%'
    }
});

export default CheckoutItem;