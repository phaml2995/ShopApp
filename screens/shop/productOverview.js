import React ,{ useState ,useEffect } from 'react';
import { View, Text, FlatList ,Button, ActivityIndicator, StyleSheet} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/productItem.component';
import * as cartActions from '../../redux/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/headButton.component';
import colors from '../../constants/colors';
import * as productActions from '../../redux/actions/product';

const ProductOverViewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProd);
    const dispatch = useDispatch();
    
    useEffect(() => {
        setIsLoading(true);
        dispatch(productActions.fetchProducts())
            .then(() => setIsLoading(false))
            .catch(error => setError(error))
    },[dispatch]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate({
            routeName:'ProductDetail',
            params: {
                productId: id,
                productTitle: title
            }
        })
    }

    if (error) {
        return (
            <View style={styles.loadingView}>
                <Text>An Error Occured</Text>
            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={styles.loadingView}>
                <ActivityIndicator size='large' color={colors.primary}/>
            </View>
        )
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.loadingView}>
                <Text>No Products Found</Text>
            </View>
        )
    }
    return (
        <FlatList 
            data={products} 
            keyExtractor={item=> item.id} 
            renderItem={itemData => 
                <ProductItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id,itemData.item.title)
                    }}
                >
                    <Button 
                        color={colors.accent} 
                        title="View" 
                        onPress={() => {selectItemHandler(itemData.item.id,itemData.item.title)}}
                    />
                    <Button color={colors.accent} title='Add To Cart' onPress={()=>{dispatch(cartActions.addToCart(itemData.item))}}/>
                </ProductItem>
            }
        /> 
    )
}

ProductOverViewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='menu'
                iconName='ios-menu'
                onPress={()=> {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>,

        headerRight:() => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title='cart' 
                iconName='ios-cart'
                onPress={() => {
                    navData.navigation.navigate({
                        routeName: 'Cart'
                    })
                }}
            />
        </HeaderButtons>
     }
}

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProductOverViewScreen;