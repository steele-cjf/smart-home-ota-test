import React, { useEffect, useState } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
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
    const [items] = useState(props.items)
    return (
        <Swiper style={styles.wrapper} autoplay autoplayTimeout={1} loop={true}>
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