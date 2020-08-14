import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Form from '../../Component/form'
import ImageUpload from '../../Component/imageUpload'
import vertifyCn from '../config/PassportVertify'
import { Spinner } from 'native-base'
import { AppRoute } from '../../../navigator/AppRoutes';

export default function PassportVertifyPage(props) {
    const [formData, setFormData] = useState({});
    const [formImage, setFormImage] = useState([]);
    const [userId, setUserId] = useState(null);
    const [oldData, setOldData] = useState({});
    const [loading, setLoading] = useState(false);
    const [imageUrl1, setImageUrl1] = useState(''); 
    const [imageUrl2, setImageUrl2] = useState(''); 
    const [imageUrl3, setImageUrl3] = useState(''); 

    // 初始化获取用户信息
    useEffect(() => {
        setUserId(props.userInfo.data.id);
        getAuthInfo();
    }, [props.userInfo]);

    function getAuthInfo() {
        setLoading(true);
        var userId = props.userInfo.data.id;
    
        props.getManualAuditInfo(userId, res => {
            console.log('*******AuditInfo-modify:*******', res);
            setLoading(false);
          
            if (!res.code) {
                if (res.data.identificationType !== 'passport') { 
                    return;
                }

                let {name, identificationNo, gender, birthDate, country} = res.data;
                var oldData = {name, identificationNo, gender, birthDate, country} ;
                console.log(999, oldData)
                setOldData(Object.assign({}, oldData));

                $getImage(res.data.imageUrls[0], uri => {
                    setImageUrl1(uri);
                });
                $getImage(res.data.imageUrls[1], uri => {
                    setImageUrl2(uri);
                });
                $getImage(res.data.imageUrls[2], uri => {
                    setImageUrl3(uri);
                });
                
            } else {
                showToast("90909"+res.message);
            }
        });
    }

    // 检查并提交form
    const handleConfirm = () => {
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
        result.append('userId', userId)
        result.append('identificationType', 'passport')
        setLoading(true);
        console.log('88userId: ', userId);

        props.verifyIdCard(result, (res) => {
            console.log('huzhaorenzhxiugai: ',res)
            setLoading(false);
            if (!res.code) {
                showToast('success');
                NavigatorService.navigate(AppRoute.HOME)
            } else {
                showToast(res.message)
                console.log('res.message*****: ',res.message)
            }
        })
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
            {loading ? <Spinner></Spinner> :
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.textTitle}>基本资料</Text>
                <Form config={vertifyCn} class={styles.formBox} changeForm={changeForm} oldData={oldData}></Form>
                <Text style={styles.textTitle}>照片上传</Text>
                <View style={styles.ImageUploadBox}>
                    <ImageUpload title='护照个人信息' setImageForm={(obj) => setImageForm(0, obj)} imgUrl={imageUrl1} />
                    <ImageUpload title='护照入境信息' setImageForm={(obj) => setImageForm(1, obj)} imgUrl={imageUrl2} />
                    <ImageUpload title='手持护照' setImageForm={(obj) => setImageForm(2, obj)} imgUrl={imageUrl3} />
                </View>
                <View style={{ height: '100%' }}>
                    <TouchableOpacity style={styles.Btn} onPress={() => { handleConfirm(); }}>
                        <Text style={styles.btnText}>确认</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            }
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