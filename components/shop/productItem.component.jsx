import React from 'react';

import { 
    Button,
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
    } from 'react-native';

import colors from '../../constants/colors';

const ProductItem = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <TouchableCmp onPress={props.onViewDetail} useForeground>
            <View style={styles.mainView}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: props.image}}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style = {styles.price}>${props.price.toFixed(2)}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button color={colors.accent} title="View" onPress={props.onViewDetail}/>
                    <Button color={colors.accent} title='Add To Cart' onPress={props.onAddToCart}/>
                </View>
            </View>
        </TouchableCmp>
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
        height: 300,
        margin: 20
    },
    textContainer: {
        alignItems: 'center',
        height: '20%',
        padding: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '20%',
        margin: 10
    },
    image: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontFamily:'open-sans-bold',
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888'
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    }
});

export default ProductItem;