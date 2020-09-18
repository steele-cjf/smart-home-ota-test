import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import Swiper from 'react-native-swiper'
import { Spinner } from 'native-base'

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
    },
    pageStyle: {
        backgroundColor: '#282828',
        position: 'absolute',
        right: 16,
        bottom: 59,
        paddingVertical: 2,
        paddingHorizontal: 9,
        borderRadius: 10,
        opacity: .7,
        fontSize: 12,
        color: '#fff'
    }
})

export default (props) => {
    const [items, setItems] = useState(props.items)
    const [styleImg] = useState(props.imgStyle)
    useEffect(() => {
        let list = Object.assign([], props.items)
        setItems(list)
    }, [props.items, props])

    const renderItems = () => {
        let result = <Spinner />
        if (items && items.length) {
            let array = items.map((item, index) => {
                return (
                    <View testID="Hello" style={styles.slide} key={index}>
                        <Image style={[styles.image, styleImg]} source={item} />
                        {props.showPage && <Text style={styles.pageStyle}>图片{index + 1}/{items.length}</Text>}
                    </View>
                )
            })
            return array
        }
        return (result)
    }
    return (
        <Swiper
            style={styles.wrapper}
            autoplay={true}
            autoplayTimeout={3}
            index={0}
            // loop={true}
            // showsPagination={true}
            paginationStyle={styles.dotStyle}>
            {renderItems()}
        </Swiper>
    )
}