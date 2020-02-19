import React, { useState, useEffect, useCallback } from 'react';

import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/headButton.component';
import { useSelector, useDispatch } from 'react-redux';

import * as productActions from '../../redux/actions/product'

const EditProductScreen = props => {
    const dispatch = useDispatch();
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => 
        state.products.userProd.find(prod => prod.id === prodId));

    const [title,setTitle]  = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl,setImageUrl]  = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price,setPrice]  = useState('');
    const [description,setDescription]  = useState(editedProduct ? editedProduct.description : '');


    const submitHandler = useCallback(() => {
        if (editedProduct) {
            dispatch(productActions.updateProd(prodId,title,description,imageUrl));
        } else {
            dispatch(productActions.createProd(title,description,imageUrl,+price));
        }
        props.navigation.goBack();
    },[dispatch,prodId,title,description,imageUrl,price]);

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    },[submitHandler]);
        
    return (
        <ScrollView>
            <View style={styles.mainView}>
                <View style={styles.formControl}>
                    <Text style={styles.textStyle}>TITLE</Text>
                    <TextInput 
                        style={styles.input} 
                        value={title} 
                        onChangeText={text => setTitle(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.textStyle}>IMAGE</Text>
                    <TextInput 
                        style={styles.input}
                        value={imageUrl} 
                        onChangeText={text => setImageUrl(text)}
                        />
                </View>
                {editedProduct ? null : <View style={styles.formControl}>
                    <Text style={styles.textStyle}>PRICE</Text>
                    <TextInput 
                        style={styles.input} 
                        value={price} 
                        onChangeText={text => setPrice(text)}/>
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.textStyle}>DESCRIPTION</Text>
                    <TextInput 
                        style={styles.input} 
                        value={description} 
                        onChangeText={text => setDescription(text)}/>
                </View>
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = navData => {
    const submitFcn = navData.navigation.getParam('submit');

    return {
        headerTitle: navData.navigation.getParam('productId')? 'Edit Product' : 'Add Product',
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
            title='Add'
            iconName='ios-checkmark'
            onPress={submitFcn}
        />
    </HeaderButtons>,
    }
}

const styles = StyleSheet.create({
    mainView: {
        margin: 20
    },

    formControl: {
        width: '100%'
    },

    textStyle: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },

    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }

});

export default EditProductScreen;