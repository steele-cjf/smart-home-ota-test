import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Text} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

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
                <Input
                  key={index}
                  value={obj[key]}
                  onChange={e => {
                    setData(key, e.nativeEvent.text);
                  }}
                  placeholder={placeholder}
                  leftIcon={<Text style={styles.label}>{name}</Text>}
                />
              );
            case 'DATE':
              return (
                <View>
                  <Input
                    key={index}
                    disabled
                    value={obj[key]}
                    onTouchStart={() => {
                      showDatePicker(key);
                    }}
                    placeholder={placeholder}
                    leftIcon={<Text style={styles.label}>{name}</Text>}
                  />
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible[key] || false}
                    mode="date"
                    locale="en_GB"
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
                <View style={styles.radioBox}>
                  <Text style={styles.radioLabel}>{name}</Text>
                  <RadioForm
                    style={styles.radioForm}
                    formHorizontal={true}
                    animation={true}>
                    {data.selectOptions &&
                      data.selectOptions.map((option, i) => (
                        // let check = (option.value === (obj[data.key] || data.selectOptions[0].value)) || false
                        <RadioButton labelHorizontal={true} key={'radio' + i}>
                          <RadioButtonInput
                            obj={option}
                            index={'radioButton' + i}
                            isSelected={option.value == obj[key]}
                            borderWidth={1}
                            onPress={value => {
                              setData(key, value);
                            }}
                            buttonInnerColor={'#2196f3'}
                            buttonOuterColor={
                              option.value == obj[key] ? '#2196f3' : '#000'
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
  label: {
    fontSize: 18,
    width: 100,
  },
  radioLabel: {
    fontSize: 18,
    lineHeight: 30,
  },
  radioForm: {
    width: 200,
    position: 'absolute',
    left: 90,
  },
  radioBox: {
    marginHorizontal: 10,
    borderBottomColor: 'rgba(0, 0, 0, .4)',
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginBottom: 20,
  },
});
