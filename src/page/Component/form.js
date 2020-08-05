import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Text} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Theme from '../../style/colors';

export default function Form(props) {
  const [config] = useState(props.config);
  const [isDatePickerVisible, setDatePickerVisibility] = useState({});
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
    let day = date.getDate();
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
  const [obj, setObj] = useState({});
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
                <Input containerStyle={styles.inputContainer} inputStyle={styles.input}
                  key={index}
                  value={obj[key]}
                  onChange={e => {
                    setData(key, e.nativeEvent.text);
                  }}
                  placeholder={placeholder}
                  placeholderTextColor={Theme.textMuted} 
                  leftIcon={<Text style={styles.label}>{name}</Text>}
                />
              );
            case 'DATE':
              return (
                <View key={index}>
                  <Input containerStyle={styles.inputContainer} inputStyle={styles.input}
                    disabled
                    value={obj[key]}
                    onTouchStart={() => {
                      showDatePicker(key);
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={Theme.textMuted} 
                    leftIcon={<Text style={styles.label}>{name}</Text>}
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
            case 'RADIO':
              obj[key] = obj[key] || initial;
              return (
                <View style={styles.radioBox}key={index}>
                  <Text style={styles.radioLabel}>{name}</Text>
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
                            buttonWrapStyle={{marginLeft: 20}}
                          />
                          <RadioButtonLabel
                            obj={option}
                            index={'radioLabel' + i}
                            onPress={value => {
                              setData(key, value);
                            }}
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
  font18: {
    fontSize: 18,
  },
  inputContainer: {
    height: 52,
  },
  label: {
    fontSize: 14,
    color: Theme.textDefault,
    width: 100,
  },
  input: {
    fontSize: 14,
    color: Theme.textDefault,
  },
  radioLabel: {
    fontSize: 14,
    color: Theme.textDefault,
    height: 48,
    lineHeight: 48,
  },
  radioForm: {
    width: 200,
    position: 'absolute',
    left: 90,
    top: 10,
  },
  radioBox: {
    height: 48,
    marginHorizontal: 10,
    borderBottomColor: 'rgba(0, 0, 0, .4)',
    borderBottomWidth: 1,
    // paddingBottom: 15,
    // marginBottom: 20,
  },
});
