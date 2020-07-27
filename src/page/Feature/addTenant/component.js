import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ButtonGroup, Icon, Button, Input } from 'react-native-elements';
import { AppRoute } from '../../../navigator/AppRoutes';
import Camera from '../../Component/Camera';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function AddTenant(props) {
  const buttons = ['扫一扫添加住户', '手动添加住户'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showCamera, setCamera] = useState(false);
  const [cameraContent, setCameraContext] = useState(null)

  const getCode = (result) => {
    console.log(result, '11111111111')
    setCamera(false)
    setCameraContext(result)
  }
  function updateIndex(index) {
    console.log(index);
    setSelectedIndex(index);
  }
  const renderCameraContent = () => {
    if (cameraContent) {
      return (
        <TouchableOpacity onPress={() => { console.log(9999); setCamera(true) }}>
          <Text> {cameraContent.data}</Text>
        </TouchableOpacity>)
    }
    return (<Icon name="done" size={100} color="green" onPress={() => { console.log(9999); setCamera(true) }} />)
  }
  return (
    <View style={styles.container}>
      {showCamera && <Camera getCode={getCode} close={() => setCamera(false)} />}
      <ButtonGroup
        onPress={index => updateIndex(index)}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{ height: 100 }}
      />
      <View
        style={
          ({ paddingHorizontal: 10 }, selectedIndex ? { display: 'none' } : '')
        }>
        <Text style={{ fontSize: 16, marginTop: 20, color: '#999' }}>
          可扫已实名的APP用户的二维码
      </Text>
        {renderCameraContent()}
      </View>
      <View style={selectedIndex !== 1 ? { display: 'none' } : ''}>
        <Input
          inputStyle={styles.input_content}
          leftIcon={<Text style={styles.label}>真实姓名</Text>}
        />
        <Input
          inputStyle={styles.input_content}
          leftIcon={<Text style={styles.label}>身份证号</Text>}
        />
        <Input
          inputStyle={styles.input_content}
          leftIcon={<Text style={styles.label}>手机号</Text>}
        />
      </View>
      <Button
        style={{ paddingHorizontal: 10 }}
        title="保存"
        onPress={() => props.navigation.navigate(AppRoute.HOUSEDETAIL)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    color: '#999',
    fontSize: 16,
  },
});
