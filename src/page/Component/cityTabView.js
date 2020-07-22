/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ScrollAbleTabView from 'react-native-scrollable-tab-view';
import {getCityList} from '../../store/home/index';
import showToast from '../../util/toast';

function TabView(props) {
  const [activeColor] = useState('#e4393c');
  const [page, setPage] = useState(0);
  const [address, setAddress] = useState([]);
  const [tag, setTag] = useState();
  const [tabs, setTabs] = useState(props.tabs);

  useEffect(() => {
    props.getCityList({pid: 0}, res => {
      console.log('1111', res);
      if (!res.code) {
        const list = res.data;
        list.map((item, index) => {});
        setAddress(res.data);
      } else {
        showToast(res.message);
      }
    });
  }, [props]);

  function tabOnPress(tab, i) {
    props.getCityList({pid: tab.id}, res => {
      if (!res.code) {
        const list = res.data;
        list.map((val, index) => {
          if (val.name === tab.name) {
            setTag(index);
          }
        });
        setAddress(list);
        setPage(i);
      } else {
        showToast(res.message);
      }
    });
  }

  function Tab() {
    return (
      <View style={[tabStyles.container]}>
        {tabs.map((tab, i) => {
          return (
            <TouchableOpacity
              style={tabStyles.tabJoke}
              activeOpacity={0.9}
              key={tab.id}
              onPress={() => tabOnPress(tab, i)}
              removeClippedSubviews={false}>
              <Text
                style={[tabStyles.text, page === i && {color: activeColor}]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  function _select(item, index) {
    // setTag(index);
    props.getCityList({pid: item.id}, res => {
      if (!res.code) {
        if (page && tabs.length > 1) {
          tabs.splice(page + 1);
          tabs[page].name = item.name;
          setTag(null);
        } else {
          tabs[tabs.length - 1].name = item.name;
        }
        setAddress(res.data);
        setTabs([...tabs, {name: '请选择', id: item.id}]);
        console.log('tab', tabs);
      } else {
        showToast(res.message);
      }
    });
  }

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        key={index}
        onPress={() => _select(item, index)}
        style={styles.list}>
        <Text
          style={{
            fontSize: 14,
            color: tag === index ? '#D6382F' : '#666666',
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  function _renderTabView() {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={address}
        renderItem={_renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    );
  }

  function _onChangeIndex(index) {
    setPage(index);
  }

  const {style} = props;
  return (
    <View style={[styles.container, style]}>
      <ScrollAbleTabView
        style={styles.main}
        locked
        renderTabBar={() => <Tab />}
        page={page}
        onChangeTab={({i}) => _onChangeIndex(i)}>
        {_renderTabView()}
      </ScrollAbleTabView>
    </View>
  );
}

const tabStyles = StyleSheet.create({
  container: {
    height: 40,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
    position: 'relative',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabJoke: {
    // height: 40,
    marginHorizontal: 16,
  },
  line: {
    position: 'absolute',
    height: 2,
    bottom: 0,
  },
  text: {
    fontSize: 14,
    color: '#252426',
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingBottom: 0,
  },
  main: {
    flex: 1,
  },
  list: {
    height: 40,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

// reducer获取
function mapStateToProps(state) {
  return {};
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({getCityList}, dispatch);
}
export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(TabView);
