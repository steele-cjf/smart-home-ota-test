import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements'
import Form from '../../Component/form'
import ImageUpload from '../../Component/imageUpload'

import vertifyCn from '../config/PassportVertify'
export default function PassportVertifyPage(props) {
    const [formData, setFormData] = useState({})
    const handleConfirm = () => {
        console.log('formData', formData)
    }
    const changeForm = (data) => {
        setFormData(data)
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.font18}>基本资料</Text>
                <Form config={vertifyCn} class={styles.formBox} changeForm={changeForm}></Form>
                <Text style={[styles.font18, styles.title]}>照片上传</Text>
                <View style={styles.ImageUploadBox}>
                    <ImageUpload title='护照个人信息' />
                    <ImageUpload title='护照入境信息' />
                    <ImageUpload title='手持护照' />
                </View>
                <Button title="确认" style={styles.Btn} onPress={() => { handleConfirm() }} />
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 18
    },
    scrollContainer: {
        paddingTop: 30,
        paddingHorizontal: 20
    },
    font18: {
        fontSize: 18
    },
    title: {
        marginTop: 20,
        paddingVertical: 20
    },
    formBox: {
        backgroundColor: '#fff',
        paddingTop: 15,
        paddingBottom: 0,
        marginTop: 10
    },
    ImageUploadBox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    Btn: {
        marginTop: 40,
        marginBottom: 60
    }
})