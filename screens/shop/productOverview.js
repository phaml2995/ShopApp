import React from 'react';
import { FlatList ,Button} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/productItem.component';
import * as cartActions from '../../redux/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/headButton.component';
import colors from '../../constants/colors';


const ProductOverViewScreen = props => {
    const products = useSelector(state => state.products.availableProd);
    const dispatch = useDispatch();
    
    const selectItemHandler = (id, title) => {
        props.navigation.navigate({
            routeName:'ProductDetail',
            params: {
                productId: id,
                productTitle: title
            }
        })
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

export default ProductOverViewScreen;