import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'

var styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        // resizeMode: 'contain'
        resizeMode: 'cover'
    }
})

export default (props) => {
    const [items, setItems] = useState(props.items)
    const [styleImg] = useState(props.imgStyle)  
    useEffect(() => {
        setItems(props.items)
    }, [props.items])
    return (
        <Swiper
            style={styles.wrapper}
            autoplay={false}
            autoplayTimeout={3}
            loop={true}
            showsPagination={true}
            paginationStyle={styles.dotStyle}>
            {items && items.map((item) => {
                return (
                    <View testID="Hello" style={styles.slide}>
                        <Image style={[styles.image, styleImg]} source={item} />
                    </View>
                )
            })}
        </Swiper>
    )
}