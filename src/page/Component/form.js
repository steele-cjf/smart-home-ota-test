import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Text, ListItem } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

export default function Form(props) {
    const [config, setConfig] = useState(props.config)
    const [checkedB, setCheck] = useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };
    return (
        <View style={props.class}>
            {
                config && config.length && config.map((data, index) => {
                    switch (data.type) {
                        case 'INPUT':
                            return (
                                <Input key={index}
                                    placeholder={data.placeholder} leftIcon={
                                        <Text style={styles.label}>{data.name}</Text>
                                    } />)
                        case 'DATE':
                            return (
                                <Input key={index}
                                    disabled
                                    onTouchStart={() => { showDatePicker() }}
                                    placeholder={data.placeholder} leftIcon={
                                        <Text style={styles.label}>{data.name}</Text>
                                    } />
                            )
                        case 'RADIO':
                            return (
                                <View style={styles.radioBox}>
                                    <Text style={styles.radioLabel}>{data.name}</Text>
                                    <RadioForm
                                        style={styles.radioForm}
                                        formHorizontal={true}
                                        animation={true}
                                    >
                                        {
                                            data.selectOptions && data.selectOptions.map((obj, i) => (
                                                <RadioButton labelHorizontal={true} key={'radio' + i} >
                                                    <RadioButtonInput
                                                        obj={obj}
                                                        index={i}
                                                        isSelected={data.initial === i}
                                                        borderWidth={1}
                                                        buttonInnerColor={'#2196f3'}
                                                        buttonOuterColor={data.initial === i ? '#2196f3' : '#000'}
                                                        buttonWrapStyle={{ marginLeft: 20 }}
                                                    />
                                                    <RadioButtonLabel
                                                        obj={obj}
                                                        index={i}
                                                        labelHorizontal={true}
                                                        labelWrapStyle={{}}
                                                    />
                                                </RadioButton>
                                            ))
                                        }
                                    </RadioForm>
                                </View>
                            )
                        default:
                            return null
                    }
                })
            }
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    font18: {
        fontSize: 18
    },
    label: {
        fontSize: 18,
        width: 100
    },
    radioLabel: {
        fontSize: 18,
        lineHeight: 30
    },
    radioForm: {
        width: 200,
        position: 'absolute',
        left: 90
    },
    radioBox: {
        marginHorizontal: 10,
        borderBottomColor: 'rgba(0, 0, 0, .4)',
        borderBottomWidth: 1,
        paddingBottom: 15,
        marginBottom: 20
    }
})