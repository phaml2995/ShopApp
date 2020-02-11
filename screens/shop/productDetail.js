import React from 'react';

import { 
    View, 
    Text, 
    StyleSheet, 
    Button, 
    Image, 
    ScrollView
    } from 'react-native';

import { useSelector,useDispatch } from 'react-redux'
import colors from '../../constants/colors';
import * as cartActions from '../../redux/actions/cart';


const ProductDetailScreen = props =>{
    const productId = props.navigation.getParam('productId');
    const selectedProd = useSelector(state => state.products.availableProd.find(prod => prod.id === productId));
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image style ={styles.image} source={{uri: selectedProd.imageUrl}}/>
            <View syle={styles.buttonContainer}>
                <Button color={colors.primary} title='Add To Cart' onPress={() => {
                    dispatch(cartActions.addToCart(selectedProd))
                }}/>
            </View>
           
            <Text style={styles.price}>${selectedProd.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProd.description}</Text>
        </ScrollView>
    )
}

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    };
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },

    buttonContainer:{
        marginVertical: 20,
        alignItems: 'center'
    },

    price: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans'
    },

    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 30,
        fontFamily: 'open-sans'
    },

})


export default ProductDetailScreen;