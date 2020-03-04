import React , { useReducer , useCallback, useState, useEffect}from 'react';
import { 
    Button, 
    View, 
    ScrollView, 
    StyleSheet, 
    KeyboardAvoidingView,
    ActivityIndicator, 
    Alert
    } from 'react-native';
import { useDispatch } from 'react-redux';

import UserInput from '../../components/UI/input.component';
import colors from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import * as authActions from '../../redux/actions/auth';


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


const AuthScreen = props => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]  = useState();
    const dispatch  = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false
    })

    useEffect(() =>{
        if (error) {
            Alert.alert('An Error Occured!', error, [{text: 'Return'}])
        }
    },[error])

    const authHandler = async () => {
        let action;
        if (isSignUp) {
            action  = authActions.signup(formState.inputValues.email, formState.inputValues.password)
        } else {
            action  = authActions.login(formState.inputValues.email, formState.inputValues.password)
        }
        setError(null)
        setIsLoading(true)
        try{
            await dispatch(action); 
            props.navigation.navigate('Shop')
        } catch(err) {
            setError(err.message)
            setIsLoading(false) 
        }      
        
    }

    const inputChangeHandler = useCallback ((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: REDUCER_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })        
    },[dispatchFormState])

    if (isLoading) {
        return (
            <View style={styles.activityIndicator}>
                <ActivityIndicator size='large' color={colors.primary}/>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={styles.screen}>
            <LinearGradient colors={['#c33764', '#1d2671']} style={styles.gradient}>
                <View style={styles.authContainer}>
                    <ScrollView>
                        <UserInput 
                            id='email' 
                            label='E-mail' 
                            keyboardType='email-address' 
                            required 
                            email 
                            autoCapitalize='none'
                            errorText="Please enter a valid email address" 
                            onInputChange={inputChangeHandler} 
                            initialValue=''
                        />
                        <UserInput 
                            id='password' 
                            label='Password' 
                            keyboardType='default' 
                            secureTextEntry 
                            required
                            minLength={5}
                            autoCapitalize='none'
                            errorText="Please enter a valid password"  
                            onInputChange={inputChangeHandler} 
                            initialValue=''
                        />
                        <View style={styles.buttonContainer}>
                            <Button title={isSignUp ? 'Sign Up' : 'Login'} color={colors.primary} onPress={authHandler}/>
                            <Button 
                                title={isSignUp ? 'Already a member?' : 'New Member?'} 
                                color={colors.accent} 
                                onPress={() => setIsSignUp(prevState => !prevState)}
                            />
                        </View>
                        
                    </ScrollView>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

AuthScreen.navigationOptions = {
    headerTitle: "Sign In"
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width:0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor:'white',
        padding:20
    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    activityIndicator: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default AuthScreen;
