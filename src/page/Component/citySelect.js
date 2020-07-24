import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';
import TabView from './test';

export default function RegionPicker(props) {
  const {visible, tabs} = props;
  const [regionId, setRegionId] = useState(0);
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={() => close()}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={() => close()}>
        <View style={[styles.mask]} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.content]}>
        <View style={[styles.titleMain]}>
          <Text style={[styles.title]}>所在地区</Text>
          <TouchableOpacity
            style={styles.icons}
            activeOpacity={0.8}
            onPress={() => close()}>
            <Icon name="close" size={25} style={styles.close} color="blank" />
          </TouchableOpacity>
        </View>
        <TabView style={[styles.tabView]} tabs={tabs} getRegion={getRegion} />
      </Animated.View>
    </Modal>
  );

  function getRegion(data, tabsList) {
    setRegionId(data);
    props.setTabs(tabsList)
  }

  function close() {
    props.close(false, regionId);
  }
}

const {width, height} = Dimensions.get('window');
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mask: {
    flex: 1,
    backgroundColor: '#000',
    opacity: 0.7,
  },
  content: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: screenWidth,
    height: parseInt((screenHeight * 4) / 6),
  },
  tabView: {
    // backgroundColor: '#fff',
    backgroundColor: '#F1F1F1',
  },
  tabViewLoad: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleMain: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#fff',
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
    position: 'relative',

    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    flex: 1,
    fontSize: 15,
    color: '#222',
    textAlign: 'center',
  },
  icons: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 999,
  },
  close: {
    width: 21,
    height: 21,
  },
});
