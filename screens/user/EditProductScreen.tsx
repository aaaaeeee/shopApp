import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors';
import { AppState } from '../../store/configureStore'
import { Product } from '../../types/product'

import { addProduct, editProduct } from '../../store/actions/productsAction'
const EditProductScreen = props => {
    const productId = props.navigation.getParam('productId')
    const editedProduct: Product = useSelector((state: AppState) => state.products.userProducts.find(prod => prod.id === productId))

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '')
    const dispatch = useDispatch()


    const submitHandler = useCallback(() => {
        console.log('**Submitting', title);

        if (editedProduct) {
            const updatedProduct = {
                id: editedProduct.id,
                ownerId: editedProduct.ownerId,
                price: editedProduct.price,
                title: title,
                imageUrl: imageUrl,
                description: description,
            }
            dispatch(editProduct(updatedProduct))
        } else {
            const newProduct = {
                id: new Date().getTime().toString(),
                ownerId: 'u1',
                title: title,
                imageUrl: imageUrl,
                price: price,
                description: description,
            }
            dispatch(addProduct(newProduct))
        }
        props.navigation.goBack()
    }, [dispatch, title, imageUrl, price, description])

    useEffect(() => {
        props.navigation.setParams({ 'submit': submitHandler })
    }, [submitHandler])

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)} ></TextInput>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={styles.input} value={imageUrl} onChangeText={text => setImageUrl(text)}></TextInput>
                </View>
                {editedProduct ? null : (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput style={styles.input} value={price} onChangeText={text => setPrice(text)}></TextInput>
                    </View>)}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)}></TextInput>
                </View>
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = navData => {
    const submitFunction = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        // headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
        //     <Item title="Menu" iconName={'ios-menu'} onPress={() => { navData.navigation.toggleDrawer() }} />
        // </HeaderButtons>),
        headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Save" iconName={'ios-checkmark'} onPress={submitFunction} />
        </HeaderButtons>)
    }

}
const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%',
        marginBottom: 10
    },
    label: {
        fontFamily: 'open-sans-bold'

    },
    input: {
        paddingHorizontal: 3,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
})

export default EditProductScreen