import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Form from '../../Component/form'
import ImageUpload from '../../Component/imageUpload'
import vertifyCn from '../config/PassportVertify'
import {AppRoute} from '../../../navigator/AppRoutes'; // lyq test

export default function PassportVertifyPage(props) {
    const [formData, setFormData] = useState({});
    const [formImage, setFormImage] = useState([]);

    // 检查并提交form
    const handleConfirm = () => {
        props.navigation.navigate(AppRoute.VERDETAILS);  //lyq test

        let message = ''
        let key = vertifyCn.findIndex((item) => { return (item.required && !formData[item.key]) })
        message = vertifyCn[key] && vertifyCn[key].errorMsg[0]

        if (!message) {
            for (var i = 0; i < 3; i++) {
                let item = formImage[i]
                if (!item) {
                    message = '请上传图片'
                    continue;
                }
            }
        }

        if (message) {
            showToast(message);
            return;
        }
        var result = new FormData()
        changeToForm(result)
        // 暂时写死
        result.append('userId', '478609054946578432')
        result.append('identificationType', 'id_card')

        props.verifyIdCard(result, (res) => {
            console.log(res, 'end')
            showToast('success');
        })
        // props.navigation.navigate(AppRoute.UNRECORD);
    };
    // 修改成能提交的数据结构
    const changeToForm = (result) => {
        for (var index in formData) {
            result.append(index, formData[index])
        }
        for (var i in formImage) {
            result.append('images', formImage[i])
        }
    }
    const setImageForm = (type, obj) => {
        let data = Object.assign([], formImage)
        data[type] = obj
        setFormImage(data)
    }
    const changeForm = data => {
        setFormData(data);
    };
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.textTitle}>基本资料</Text>
                <Form config={vertifyCn} class={styles.formBox} changeForm={changeForm}></Form>
                <Text style={styles.textTitle}>照片上传</Text>
                <View style={styles.ImageUploadBox}>
                    <ImageUpload title='护照个人信息' setImageForm={(obj) => setImageForm(0, obj)} />
                    <ImageUpload title='护照入境信息' setImageForm={(obj) => setImageForm(1, obj)} />
                    <ImageUpload title='手持护照' setImageForm={(obj) => setImageForm(2, obj)} />
                </View>
                <View style={{height:'100%'}}>
                    <TouchableOpacity style={styles.Btn} onPress={() => {handleConfirm();}}>
                        <Text style={styles.btnText}>确认</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //height:'100%'
    },
    scrollContainer: {
        paddingTop: 16, 
        paddingHorizontal: 16, 
        backgroundColor: Theme.background,
    },
    textTitle: {
        fontSize: 16,
        color: Theme.textDefault,
    },
    formBox: {
        paddingBottom: 16,
        marginTop: 10,
    },
    ImageUploadBox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    Btn: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 258,
        marginTop: 100,
        height: 40,
        borderRadius: 20,
        backgroundColor: Theme.primary,
    },
    btnText: {
        height: 40,
        lineHeight: 40,
        textAlign: 'center',
        fontSize: 16, 
        color: '#FFFFFF',    
    },
})