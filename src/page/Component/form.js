import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
//import {Input, Text} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Theme from '../../style/colors';

export default function Form(props) {
  const [config, setConfig] = useState(props.config);
  const [isDatePickerVisible, setDatePickerVisibility] = useState({});
  const [obj, setObj] = useState(props.oldData);

  useEffect(() => {
    setObj(props.oldData)
  }, [props.oldData]);

  const showPicker = key => {
    console.log(111, key);
    // let cache = Object.assign({}, isDatePickerVisible);
    // cache[key] = true;
    // setDatePickerVisibility(cache);

    
  };

  // 展示date时触发
  const showDatePicker = key => {
    let cache = Object.assign({}, isDatePickerVisible);
    cache[key] = true;
    setDatePickerVisibility(cache);
  };
  // date点击触发
  const hideDatePicker = key => {
    let cache = Object.assign({}, isDatePickerVisible);
    cache[key] = false;
    setDatePickerVisibility(cache);
  };
  // date提交触发
  const handleConfirm = (date, key) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;

    hideDatePicker(key);
    setData(key, year + '-' + month + '-' + day);
  };
  // form表单变化触发
  const setData = (key, value) => {
    let data = Object.assign({}, obj);
    data[key] = value;
    setObj(data);
    // 父类回调
    props.changeForm && props.changeForm(data);
  };

  return (
    <View style={props.class}>
      {config &&
        config.length &&
        config.map((data, index) => {
          if (!data.key) {
            return;
          } // 必须要有对应的key值
          let {key, placeholder, name, initial} = data;
          switch (data.type) {
            case 'INPUT':
              return (
                <View style={styles.inputContainer} key={key}>
                  <Text style={styles.label}>{name}</Text>
                  <TextInput style={styles.input}
                    key={index}
                    value={obj[key]}
                    onChange={e => {
                      setData(key, e.nativeEvent.text);
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={Theme.textMuted} 
                  />
                </View>
              );
            case 'DATE':
              return (
                <View style={styles.inputContainer} key={index}>
                  <Text style={styles.label}>{name}</Text>
                  <AntDesign name="right" style={styles.rightArrow} />
                  <TextInput style={styles.input}
                    //disabled
                    editable={false}
                    value={obj[key]}
                    onTouchStart={() => {
                      showDatePicker(key);
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={Theme.textMuted} 
                  />
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible[key] || false}
                    mode="date"
                    headerTextIOS={'选择日期'}
                    cancelTextIOS={'取消'}
                    confirmTextIOS={'确定'}
                    locale="zh-Hans"   //en_GB
                    onConfirm={date => {
                      handleConfirm(date, key);
                    }}
                    onCancel={() => {
                      hideDatePicker(key);
                    }}
                  />
                </View>
              );
            case 'PICKER':
              return (
                <View style={styles.inputContainer} key={index}>
                  <Text style={styles.label}>{name}</Text>
                  <AntDesign name="right" style={styles.rightArrow} />
                  <TextInput style={styles.input}
                    editable={false}
                    value={obj[key]}
                    onTouchStart={() => {
                      showPicker(key);
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={Theme.textMuted} 
                  />
                  {/* <DateTimePickerModal
                    isVisible={isDatePickerVisible[key] || false}
                    mode="date"
                    headerTextIOS={'选择日期'}
                    cancelTextIOS={'取消'}
                    confirmTextIOS={'确定'}
                    locale="zh-Hans"   //en_GB
                    onConfirm={date => {
                      handleConfirm(date, key);
                    }}
                    onCancel={() => {
                      hideDatePicker(key);
                    }}
                  /> */}
                </View>
              );
            case 'RADIO':
              obj[key] = obj[key] || initial;
              return (  
                <View style={styles.inputContainer} key={index}> 
                  <Text style={styles.label}>{name}</Text>
                  <RadioForm
                    style={styles.radioForm}
                    formHorizontal={true}
                    animation={true}>
                    {data.selectOptions &&
                      data.selectOptions.map((option, i) => (
                        <RadioButton labelHorizontal={true} key={'radio' + i}>
                          <RadioButtonInput
                            obj={option}
                            index={'radioButton' + i}
                            isSelected={option.value == obj[key]}
                            borderWidth={1}
                            onPress={value => {
                              setData(key, value);
                            }}
                            buttonInnerColor={Theme.primary}
                            buttonOuterColor={
                              option.value == obj[key] ? Theme.primary : Theme.tabIconDefault 
                            }
                            buttonSize={12}
                            //buttonOuterSize={12}
                            buttonWrapStyle={{marginLeft: 20}}
                          />
                          <RadioButtonLabel
                            obj={option}
                            index={'radioLabel' + i}
                            onPress={value => {
                              setData(key, value);
                            }}
                            labelStyle={{fontSize: 14, color: Theme.textDefault}}
                            labelHorizontal={true}
                          />
                        </RadioButton>
                      ))}
                  </RadioForm>
                </View>
              );
            default:
              return null;
          }
        })}
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: '#E9E9E9',
  },
  rightArrow: {
    position: 'absolute', 
    right: 0, 
    height: 54,
    lineHeight: 54,
    fontSize: 14, 
    color: Theme.textSecondary, 
  },
  label: {
    fontSize: 14,
    color: Theme.textDefault,
    width: 80,
    height: 54,
    lineHeight: 54,
  },
  input: {
    position: 'absolute',
    left: 80,
    right: 24,
    top: 0,
    bottom: 0,
    fontSize: 14,
    color: Theme.textDefault,
    textAlign: 'right',
  },
  radioForm: {
    position: 'absolute',
    right: 24,
    top: 17,

  },
});
