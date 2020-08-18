import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {Form, Textarea} from 'native-base'
import ImageUpload from '../Component/imageUpload'
import Theme from '../../style/colors';
 

// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import {getUserInfo} from '../../store/home/index';
// import {modifyPersonalInfo} from '../../store/user/index';


export default SuggestionPage = (props) => { 

  const setImageForm = (type, obj) => {
    let data = Object.assign([], formImage);
    data[type] = obj;
    setFormImage(data);
  };

  function setContactInfo2(text) {
    setContactInfo(text);
  }

  function submitInfo() {

    //console.log('formImage***: ', formImage);

    var result = new FormData();
    result.append('contactInfo', contactInfo);

    for (var i in formImage) {
      result.append('images', formImage[i]);
    }

    console.log('result***: ', result);

  }

  

  const [contactInfo, setContactInfo] = useState('');
  const [formImage, setFormImage] = useState([]);

  return (
    <View style={styles.containerStyle}> 
      <Text style={styles.topTextStyle1}>反馈详情</Text>
      <Text style={styles.topTextStyle1}>反馈描述</Text>
      <Form>
          <Textarea
            style={{backgroundColor: Theme.cardBackground}}
            rowSpan={5}
            placeholder="请输入具体反馈内容"
          />
      </Form>
      <View>
        <Text style={[styles.textTitle, styles.colorDefault]}>联系方式</Text>
        <TextInput style={styles.textContent}
          placeholder='手机/邮箱/QQ'
          placeholderTextColor={Theme.textMuted}
          onChangeText={(text) => {setContactInfo2(text);}}
          //value=''
        />
      </View>
      <Text style={[styles.topTextStyle1, styles.space]}>{'照片上传'}</Text> 
      <Text style={[styles.topTextStyle1, styles.space]}>{'最多6张'}</Text> 
      <View style={styles.ImageBox}>
        <ImageUpload setImageForm={(obj) => setImageForm(0, obj)} />
        <ImageUpload setImageForm={(obj) => setImageForm(1, obj)} />
        <ImageUpload setImageForm={(obj) => setImageForm(2, obj)} />
      </View>
      <View style={styles.ImageBox}>
        <ImageUpload setImageForm={(obj) => setImageForm(3, obj)} />
        <ImageUpload setImageForm={(obj) => setImageForm(4, obj)} />
        <ImageUpload setImageForm={(obj) => setImageForm(5, obj)} />
      </View>

      <TouchableOpacity style={styles.btnStyle} onPress={submitInfo}> 
        <Text style={styles.btnTextStyle}>提交</Text>
      </TouchableOpacity>
    </View>


  );

}


const styles = StyleSheet.create({  
  headerText: {
    color: '#527BDF', 
    fontSize: 16,
    justifyContent: 'center', 
    paddingTop: 5, 
  },
  containerStyle: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Theme.background,
  },
  topViewFail: {
    height: 70, 
    padding: 12,
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: '#FFECEC',
  },
  topViewWait: {
    backgroundColor: '#ECF2FF',
  },
  topTextStyle1: {
    fontSize: 16,
    color: Theme.textDefault,
  },
  topTextStyle2: {
    fontSize: 14,
    color: Theme.textSecondary,
    marginTop: 10,
  },
  textTitle: {
    paddingVertical: 10,
    fontSize: 14,
    color: Theme.textSecondary,
  },
  textContent: {
    position: 'absolute',
    left: 80,
    right: 0,
    paddingVertical: 10,
    textAlign: 'right',
    fontSize: 14,
    color: Theme.textDefault,
    backgroundColor: 'yellow',
  },
  space: {
    marginTop: 45,
  },
  ImageBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  imageStyle: {
    width: 116,
    height: 87,
    resizeMode: 'cover',
    backgroundColor: '#f4f4f4',
    borderWidth: 1,
    borderColor: Theme.border,
    borderRadius: 4,
  },
  btnStyle: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 50,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5C8BFF'
  },
  btnTextStyle: {
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    fontSize: 16, 
    color: '#FFFFFF', 
  },
});