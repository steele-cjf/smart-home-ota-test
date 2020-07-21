import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Switch, Modal} from 'react-native';
import {Button, Input, Text, CheckBox, Icon} from 'react-native-elements';
import ImageUpload from '../../Component/imageUpload';
import {AppRoute} from '../../../navigator/AppRoutes';
import RegionPicker from '../../Component/citySelect';
import {TouchableOpacity} from 'react-native-gesture-handler';

function RecordHouse(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [selectedValue, setSelectedValue] = useState('0');

  const [address, setAddress] = useState('');
  const [houseHolder, setHouseHolder] = useState({});
  const [houseLayout, setHouseLayout] = useState({});
  const [
    housePropertyCertificateImageUrl,
    setHousePropertyCertificateImageUrl,
  ] = useState('');
  const [regionId, setRegionId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>房源资料</Text>
        {/* <Input label="所在地区" placeholder="请选择地址" /> */}
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <Input
            placeholder="请选择地址"
            disabled="true"
            leftIcon={<Text style={styles.label}>所在地区</Text>}
          />
        </TouchableOpacity>
        {/* <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modal_content}>
            <Button
              icon={<Icon name="close" size={25} color="blank" />}
              type="clear"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
            <RegionPicker />
          </View>
        </Modal> */}
        <RegionPicker
          titleStyle={{
            content: {borderTopLeftRadius: 22, borderTopRightRadius: 22},
          }}
          contentStyle={{backgroundColor: '#F1F1F1'}}
          listStyle={{
            content: {},
            text: {color: '#666', fontSize: 28},
          }}
          activeColor="red"
        />
        <Input
          value={address}
          placeholder="街道、小区、楼与门牌号"
          leftIcon={<Text style={styles.label}>详细地址</Text>}
          onChangeText={setAddress}
        />
        {/* <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: 150}}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item label="本人" value="0" />
          <Picker.Item label="非本人" value="1" />
        </Picker> */}
        <Input leftIcon={<Text style={styles.label}>房屋所有者</Text>} />
        <Text style={styles.title}>房产证照片</Text>
        <ImageUpload />
        <Text style={styles.title}>建筑信息</Text>
        <Input
          value={houseLayout.area}
          label="建筑面积"
          placeholder="㎡"
          onChangeText={setHouseLayout}
        />
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Input
            style={{flex: 1}}
            value={houseLayout.floor}
            placeholder="第几层"
            leftIcon={<Text style={styles.label}>楼层</Text>}
            onChangeText={setHouseLayout}
          />
        </View>
        <Input
          style={{flex: 1}}
          value={houseLayout.floor}
          placeholder="共几层"
          onChangeText={setHouseLayout}
        />
        <CheckBox
          center
          title="电梯"
          checked={isEnabled}
          onPress={toggleSwitch}
        />
        <Input label="户型" placeholder="几室几厅几卫" />
        <Button
          title="提交审核"
          style={{paddingVertical: 20}}
          onPress={() => props.navigation.navigate(AppRoute.AUDIT)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 16,
    marginTop: 30,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  modal_content: {
    backgroundColor: '#fff',
    flex: 1,
    marginTop: 150,
  },
});
export default RecordHouse;
