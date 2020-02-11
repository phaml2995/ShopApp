import React from 'react';
import { FlatList} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/productItem.component';
import * as cartActions from '../../redux/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/headButton.component';


const ProductOverViewScreen = props => {
    const products = useSelector(state => state.products.availableProd);
    const dispatch = useDispatch();
    
    return (
        <FlatList 
            data={products} 
            keyExtractor={item=> item.id} 
            renderItem={itemData => 
                <ProductItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetail={() => {props.navigation.navigate({
                        routeName:'ProductDetail',
                        params: {
                            productId: itemData.item.id,
                            productTitle: itemData.item.title
                        }
                    })}}
                    onAddToCart={() => {dispatch(cartActions.addToCart(itemData.item))}}
                />
            }
        /> 
    )
}

ProductOverViewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
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

export default ProductOverViewScreen;