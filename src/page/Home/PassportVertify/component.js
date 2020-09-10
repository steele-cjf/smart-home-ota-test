import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Form from '../../Component/form'
import ImageUpload from '../../Component/imageUpload'
import vertifyCn from '../config/PassportVertify'
import { Spinner, Content } from 'native-base'
import HeaderCommon from '../../Component/HeaderCommon'
import { AppRoute } from '../../../navigator/AppRoutes';

export default function PassportVertifyPage(props) {
    const [formData, setFormData] = useState({});
    const [formImages, setFormImages] = useState([]);
    const [userId, setUserId] = useState(null);
    const [oldData, setOldData] = useState({});
    const [loading, setLoading] = useState(false);

    // 初始化获取用户信息
    useEffect(() => {
        setUId();
        getAuthInfo();
    }, []); //[props.userInfo]

    function setUId() {
        const {params} = props.route;
        if (params && params.userId) {
          setUserId(params.userId);
        } else {
          setUserId(props.userInfo.data.id)
        }
    }

    function getAuthInfo() {
        var uId = props.userInfo.data.id;
        const {params} = props.route;
        if (params && params.userId) {
            uId= params.userId;
        }

        setLoading(true);
        props.getManualAuditInfo(uId, res => {
            // console.log('*******AuditInfo:*******', res);
            setLoading(false);
          
            if (!res.code) {
                if (!(res.data)
                    || (res.data.identificationType !== 'passport')) { 
                    return;
                }

                let {name, identificationNo, gender, birthDate, country} = res.data;
                var oldData = {name, identificationNo, gender, birthDate, country} ;
                if (!oldData.gender) {
                    oldData.gender = 'male';
                }
                setOldData(Object.assign({}, oldData));
                setFormData(oldData);

                let imgs = [];
                if (res.data.imageUrls && res.data.imageUrls.length) {
                  res.data.imageUrls.map((item, index) => {
                    $getImage(item, response => {
                      let data = Object.assign([], imgs);
                      data[index] = response;
                      setFormImages(data);
        
                      imgs[index] = response;
                    }, true)
                  })
                }
                
            } else {
                showToast(res.message);
            }
        });
    }

    // 检查并提交form
    const handleConfirm = () => {
        let message = ''
        let key = vertifyCn.findIndex((item) => { return (item.required && !formData[item.key]) })
        message = vertifyCn[key] && vertifyCn[key].errorMsg[0]

        console.log('****3:', formData);
        if (formData) {
            var nowDateTime = new Date();
            var selDateTime = new Date(formData.birthDate);

            if ( nowDateTime.getTime() < selDateTime.getTime()) {
                message = '出生日期不能大于当前日期';
            }
        } 

        if (!message) {
            for (var i = 0; i < 3; i++) {
                let item = formImages[i]
                if (!item) {
                    message = '请上传三张图片';
                    break;
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
                showToast('提交成功');
                NavigatorService.navigate(AppRoute.VERDETAILS);
                //NavigatorService.goBack();

                const {params} = props.route;
                if (params && params.refreshStatus) {
                  params.refreshStatus();
                }
                
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
        for (var i in formImages) {
            result.append('images', formImages[i])
        }
    }

    const changeForm = data => {
        setFormData(data);
        setOldData(data);
    };

    const setImageForm = (type, obj) => {
        let data = Object.assign([], formImages)
        data[type] = obj
        setFormImages(data)
    }
    

    return (
        <View style={styles.container}>
            <HeaderCommon
                options={{
                backTitle: '返回',
                title: '护照认证'
                }}
            />
            {loading ? <Spinner style={STYLES.spinner} color="#5C8BFF"/> :
            <Content>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.textTitle}>基本资料</Text>
                    <Form 
                        config={vertifyCn} 
                        class={styles.formBox} 
                        changeForm={changeForm} 
                        oldData={oldData}
                    />
                    <Text style={styles.textTitle}>照片上传</Text>
                    <View style={styles.ImageUploadBox}>
                        <ImageUpload title='护照个人信息' 
                        setImageForm={(obj) => setImageForm(0, obj)} 
                        imgUrl={formImages[0] && formImages[0].uri}
                        />
                        <ImageUpload title='护照入境信息' 
                        setImageForm={(obj) => setImageForm(1, obj)} 
                        imgUrl={formImages[1] && formImages[1].uri}
                        />
                        <ImageUpload title='手持护照' 
                        setImageForm={(obj) => setImageForm(2, obj)} 
                        imgUrl={formImages[2] && formImages[2].uri}
                        />
                    </View>
                    <TouchableOpacity style={styles.Btn} onPress={() => { handleConfirm(); }}>
                        <Text style={styles.btnText}>确认</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Content>
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
        fontSize: $screen.scaleSize(16),
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
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // bottom: 258,
        marginTop: 100,
        marginBottom: 50,
        height: 40,
        borderRadius: 20,
        backgroundColor: Theme.primary,
    },
    btnText: {
        height: 40,
        lineHeight: 40,
        textAlign: 'center',
        fontSize: $screen.scaleSize(16),
        color: '#FFFFFF',
    },
})