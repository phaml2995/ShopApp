import React, { useEffect, useCallback, useReducer, useState } from 'react';

import { 
    View, 
    StyleSheet, 
    ScrollView, 
    Alert,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/headButton.component';
import { useSelector, useDispatch } from 'react-redux';

import * as productActions from '../../redux/actions/product'
import UserInput from '../../components/UI/input.component';
import colors from '../../constants/colors';


const REDUCER_UPDATE = 'REDUCER_UPDATE';

const formReducer = (state,action) => {
    if (action.type === REDUCER_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }

        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
}


const EditProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => 
        state.products.userProd.find(prod => prod.id === prodId));
    
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false
    })

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred!',error,[{
                text: 'Okay'
            }])
        }
    },[error])

    const submitHandler = useCallback( async () => {
        if(!formState.formIsValid){
            Alert.alert('Wrong Input',"Please check if your inputs are valid",[
                {text: 'Okay'}
            ])
            return;
        }
        setError(null);
        setIsLoading(true);
        try {
            if (editedProduct) {
                await dispatch(productActions.updateProd(
                    prodId,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl
                    ));
            } else {
                await dispatch(productActions.createProd(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price
                    ));
            } 
            props.navigation.goBack();
        } catch (err) {
            setError(err.message);
        }
        
        setIsLoading(false)
       
    },[dispatch,prodId,formState]);

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    },[submitHandler]);


    const textChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: REDUCER_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })        
    },[dispatchFormState])
    
    if (isLoading){
        return (
            <View style={styles.indicatorContainer}>
                <ActivityIndicator size='large' color={colors.primary}/>
            </View>
        )
    }
    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior='padding' keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.mainView}>
                    <UserInput
                        id='title'
                        label='Title'
                        errorText='Please check your input!'
                        keyboardType='default' 
                        autoCapitalize='sentences'
                        onInputChange={textChangeHandler}
                        initialValue={editedProduct ? editedProduct.title: ''}
                        initiallyValid={!!editedProduct}
                    />
                    <UserInput
                        id='imageUrl'
                        label='ImageUrl'
                        errorText='Please check your input!'
                        keyboardType='default' 
                        autoCapitalize='sentences'
                        onInputChange={textChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl: ''}
                        initiallyValid={!!editedProduct}
                    />
                    {editedProduct ? null : (
                        <UserInput
                            id='price'
                            label='Price'
                            errorText='Please check your input'
                            keyboardType='decimal-pad' 
                            onInputChange={textChangeHandler}
                        />)}
                    <UserInput
                        id='description'
                        label='Description'
                        errorText='Please check your input'
                        keyboardType='default' 
                        autoCapitalize='sentences'
                        multiline
                        numberOfLines={3}
                        onInputChange={textChangeHandler}
                        initialValue={editedProduct ? editedProduct.description: ''}
                        initiallyValid={!!editedProduct}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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

    indicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

});

export default EditProductScreen;