/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ScrollAbleTabView from 'react-native-scrollable-tab-view';
import { getCityList } from '../../store/home/index';

import CitySelect from './cityTabView/select';
import CityTab from './cityTabView/tab';

function TabView(props) {
  const [selectIndex, setSelectIndex] = useState(props.tabs.length - 1);
  const [tabs, setTabs] = useState(props.tabs);
  const [address, setAddress] = useState([]);
  const { style } = props;

  useEffect(() => {
    let index = selectIndex - 1;
    let id = index < 0 ? 0 : tabs[index].id;
    props.getRegion(id, tabs);
    props.getCityList({ pid: id }, res => {
      setAddress(res.data);
    });
  }, [props, selectIndex, tabs]);

  const _setTabsChangeAddress = item => {
    let data = Object.assign([], tabs);
    let len =
      data.length - selectIndex - 1 > 0 ? data.length - selectIndex - 1 : 0;
    data.splice(selectIndex, len);
    data.splice(data.length - 1, 0, item);
    setSelectIndex(data.length - 1);
    setTabs(data);
  };
  const _renderTab = () => {
    return (
      <CityTab
        changeSelectId={i => setSelectIndex(i)}
        options={tabs}
        selectIndex={selectIndex}
      />
    );
  };
  return (
    <View style={[styles.container, style]}>
      <ScrollAbleTabView
        style={styles.main}
        locked
        renderTabBar={() => _renderTab()}>
        <CitySelect
          selected={tabs}
          selectId={tabs[selectIndex].id}
          address={address}
          changeAddress={item => {
            _setTabsChangeAddress(item);
          }}
        />
      </ScrollAbleTabView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingBottom: 0,
  },
  main: {
    flex: 1,
  },
});
// reducer获取
function mapStateToProps(state) {
  return {};
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getCityList }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(TabView);
