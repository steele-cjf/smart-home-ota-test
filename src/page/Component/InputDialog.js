import React, {useState, useEffect} from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';

function DialogInput (props) {
  const [value, setValue] = useState(props.initValueTextInput || '');
  const [title] = useState(props.title || '');
  const [hintInput] = useState(props.hintInput || '');
  const [textProps] = useState(props.textInputProps || null);
  const [modalStyleProps] = useState(props.modalStyle || {});
  const [dialogStyleProps] = useState(props.dialogStyle || {});
  const [placeholderTextColor] = useState(props.placeholderTextColor);
  const [animationType] = useState(props.animationType || 'fade');
  const [cancelText] = useState('取消')
  const [submitText] = useState('保存')

  useEffect(() => {
    console.log('jjjj', props.initValueTextInput)
    if (props.initValueTextInput) {
      setValue(props.initValueTextInput)
    } else {
      setValue('')
    }
  }, [props.isDialogVisible]);

  handleOnCloseDialog = () => {
    props.closeDialog();
  };

  handleSubmit = () => {
    props.submitInput(value);
  };

  handleOnChangeText = (value) => {
    setValue(value)
  }

    return (
      <Modal
        animationType={animationType}
        transparent={true}
        visible={props.isDialogVisible}>
        <KeyboardAvoidingView style={{flex: 1,}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={[styles.container, {...modalStyleProps}]}>
            <TouchableOpacity
              style={styles.container}
              activeOpacity={1}
              onPress={handleOnCloseDialog}>
              {/* 阻止事件冒泡 */}
              <View style={[styles.modal_container, {...dialogStyleProps}]}>
                <View style={styles.modal_body} onStartShouldSetResponder={() => true} onMoveShouldSetResponder={() => true}>
                  <Text style={styles.title_modal}>{title}</Text>
                  <Text
                    style={[
                      props.message ? styles.message_modal : {height: 0},
                    ]}>
                    {props.message}
                  </Text>
                  <TextInput
                    style={styles.input_container}
                    autoCorrect={
                      textProps && textProps.autoCorrect == false ? false : true
                    }
                    autoCapitalize={
                      textProps && textProps.autoCapitalize
                        ? textProps.autoCapitalize
                        : 'none'
                    }
                    clearButtonMode={
                      textProps && textProps.clearButtonMode
                        ? textProps.clearButtonMode
                        : 'never'
                    }
                    clearTextOnFocus={
                      textProps && textProps.clearTextOnFocus == true
                        ? textProps.clearTextOnFocus
                        : false
                    }
                    keyboardType={
                      textProps && textProps.keyboardType
                        ? textProps.keyboardType
                        : 'default'
                    }
                    secureTextEntry={
                      textProps && textProps.secureTextEntry
                        ? textProps.secureTextEntry
                        : false
                    }
                    maxLength={
                      textProps && textProps.maxLength > 0
                        ? textProps.maxLength
                        : null
                    }
                    autoFocus={true}
                    underlineColorAndroid="transparent"
                    placeholder={hintInput}
                    placeholderTextColor={placeholderTextColor}
                    onChangeText={handleOnChangeText}
                    value={value}
                  ></TextInput>
                </View>
                <View style={styles.btn_container}>
                  <TouchableOpacity
                    style={styles.touch_modal}
                    onPress={handleOnCloseDialog}>
                    <Text style={styles.btn_modal_left}>{cancelText}</Text>
                  </TouchableOpacity>
                  <View style={styles.divider_btn} />
                  <TouchableOpacity
                    style={styles.touch_modal}
                    onPress={this.handleSubmit}>
                    <Text style={styles.btn_modal_right}>{submitText}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    ...Platform.select({
      android: {
        backgroundColor: 'rgba(0,0,0,0.62)',
      },
    }),
  },
  modal_container: {
    marginLeft: 30,
    marginRight: 30,
    ...Platform.select({
      ios: {
        backgroundColor: '#fff',
        borderRadius: 10,
        minWidth: 300,
      },
      android: {
        backgroundColor: '#fff',
        elevation: 24,
        minWidth: 280,
        borderRadius: 5,
      },
    }),
  },
  modal_body: {
    ...Platform.select({
      ios: {
        padding: 10,
      },
      android: {
        padding: 24,
      },
    }),
  },
  title_modal: {
    color: '#282828',
    fontSize: $screen.scaleSize(20),
    ...Platform.select({
      ios: {
        marginTop: 10,
        textAlign: 'center',
        marginBottom: 5,
      },
      android: {
        textAlign: 'left',
      },
    }),
  },
  message_modal: {
    fontSize: $screen.scaleSize(16),
    ...Platform.select({
      ios: {
        textAlign: 'center',
        marginBottom: 10,
      },
      android: {
        textAlign: 'left',
        marginTop: 20,
      },
    }),
  },
  input_container: {
    textAlign: 'left',
    fontSize: $screen.scaleSize(16),
    color: 'rgba(0,0,0,0.54)',
    ...Platform.select({
      ios: {
        backgroundColor: 'white',
        borderRadius: 5,
        paddingTop: 5,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        paddingBottom: 5,
        paddingLeft: 10,
        marginBottom: 15,
        marginTop: 10,
      },
      android: {
        marginTop: 8,
        borderBottomWidth: 2,
        borderColor: '#009688',
      },
    }),
  },
  btn_container: {
    flex: 1,
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: '#E9E9E9',
        maxHeight: 48,
      },
      android: {
        alignSelf: 'flex-end',
        maxHeight: 52,
        paddingTop: 8,
        paddingBottom: 8,
      },
    }),
  },
  divider_btn: {
    ...Platform.select({
      ios: {
        width: 1,
        backgroundColor: '#E9E9E9',
      },
      android: {
        width: 0,
      },
    }),
  },
  touch_modal: {
    ...Platform.select({
      ios: {
        flex: 1,
      },
      android: {
        paddingRight: 8,
        minWidth: 64,
        height: 36,
      },
    }),
  },
  btn_modal_left: {
    ...Platform.select({
      fontWeight: 'bold',
      ios: {
        fontSize: $screen.scaleSize(18),
        color: '#282828',
        textAlign: 'center',
        borderRightWidth: 5,
        borderColor: '#B0B0B0',
        padding: 10,
        height: 48,
        maxHeight: 48,
      },
      android: {
        textAlign: 'right',
        color: '#009688',
        padding: 8,
      },
    }),
  },
  btn_modal_right: {
    ...Platform.select({
      fontWeight: 'bold',
      ios: {
        fontSize: $screen.scaleSize(18),
        color: '#408AE2',
        textAlign: 'center',
        padding: 10,
      },
      android: {
        textAlign: 'right',
        color: '#009688',
        padding: 8,
      },
    }),
  },
});
export default DialogInput;
