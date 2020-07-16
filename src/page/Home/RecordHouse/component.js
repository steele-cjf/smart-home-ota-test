import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Switch} from 'react-native';
import {Button, Input, Text, CheckBox} from 'react-native-elements';
import ImageUpload from '../../Component/imageUpload';
import {AppRoute} from '../../../navigator/AppRoutes';

function RecordHouse(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [address, setAddress] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>房源资料</Text>
        {/* <Input label="所在地区" placeholder="请选择地址" /> */}
        <Input
          placeholder="请选择地址"
          leftIcon={<Text style={styles.label}>所在地区</Text>}
        />
        <Input
          placeholder="街道、小区、楼与门牌号"
          leftIcon={<Text style={styles.label}>详细地址</Text>}
        />
        <Input leftIcon={<Text style={styles.label}>房屋所有者</Text>} />
        <Text style={styles.title}>房产证照片</Text>
        <ImageUpload />
        <Text style={styles.title}>建筑信息</Text>
        <Input label="建筑面积" placeholder="㎡" />
        <Input label="楼层" placeholder="街道、小区、楼与门牌号" />
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
});
export default RecordHouse;
