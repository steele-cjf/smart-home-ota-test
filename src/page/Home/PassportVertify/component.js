import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Form from '../../Component/form'
import ImageUpload from '../../Component/imageUpload'

import vertifyCn from '../config/PassportVertify'
export default function PassportVertifyPage(props) {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.font18}>基本资料</Text>
            <Form config={vertifyCn} class={styles.formBox}></Form>
            <Text style={[styles.font18, styles.title]}>照片上传</Text>
            <View style={styles.ImageUploadBox}>
                <ImageUpload title='护照个人信息'/>
                <ImageUpload title='护照入境信息' />
                <ImageUpload title='手持护照' />
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 20,
        fontSize: 18
    },
    font18: {
        fontSize: 18
    },
    title: {
        marginTop: 10,
        paddingVertical: 20
    },
    formBox: {
        backgroundColor: '#fff',
        paddingTop: 15,
        paddingBottom: 0,
        marginTop: 20
    },
    ImageUploadBox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    }
})