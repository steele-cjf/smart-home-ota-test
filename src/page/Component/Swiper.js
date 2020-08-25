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
        borderRadius: 10
    }
})

export default (props) => {
    const [items, setItems] = useState(props.items)
    useEffect(() => {
        setItems(props.items)
    }, [props.items])
    return (
        <Swiper style={styles.wrapper} autoplay={true} autoplayTimeout={1} loop={true} showsPagination={false}>
            {items && items.map((item) => {
                return (
                    <View testID="Hello" style={styles.slide}>
                        <Image style={styles.image} source={item} />
                    </View>
                )
            })}
        </Swiper>
    )
}