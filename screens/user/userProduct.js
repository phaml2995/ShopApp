import React from 'react';
import  { FlatList, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/productItem.component';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/headButton.component';
import colors from '../../constants/colors';
import * as productActions from '../../redux/actions/product';

const UserProductScreen = props => {
    const userProducts = useSelector(state => state.products.userProd)
    const dispatch = useDispatch();

    const editProdHandler = (id) => {
        props.navigation.navigate('EditProduct',{productId:id});
    }

    const deleteHandler = (id) => {
        Alert.alert("Warning","Are you sure you want to delete this item?", [
            {
                text: 'No', 
                style: 'default'
            },
            {
                text: 'Yes', 
                style: 'destructive', 
                onPress: () => {dispatch(productActions.deleteProd(id))}
            }
        ])
    };

    return (
        <FlatList 
            data={userProducts} 
            keyExtractor={item=>item.id} 
            renderItem={itemData => 
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={()=> {editProdHandler(itemData.item.id)}}
                >
                    <Button 
                        color={colors.accent} 
                        title="Edit" 
                        onPress={() => {editProdHandler(itemData.item.id)}}
                    />
                    <Button 
                        color={colors.accent} 
                        title='Delete' 
                        onPress={() => {deleteHandler(itemData.item.id)}}
                    />
                </ProductItem>
            }
        />
    )
}

UserProductScreen.navigationOptions = navData => {
    return {
        headerTitle: "Your Products",
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='menu'
                iconName='ios-menu'
                onPress={()=> {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Add'
                iconName='ios-create'
                onPress={()=> {
                    navData.navigation.navigate('EditProduct');
                }}
            />
        </HeaderButtons>,
    }
}

export default UserProductScreen