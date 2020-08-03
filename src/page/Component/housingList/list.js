/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {StyleSheet, View, Text} from 'react-native';
import {getHousingList} from '../../../store/home/index';
import HouseItem from './item';
import {AppRoute} from '../../../navigator/AppRoutes';
import {FlatList} from 'react-native-gesture-handler';
import {IS_IOS} from '../../../config';

function HouseListComponent(props) {
  const nav = props.nav;
  const listElement = React.createRef();
  const [houses, setHouses] = useState([
    {
      id: 1,
      title: '深圳市市南区沿山社区网谷科技大厦501',
      roomCount: 2,
      hallCount: 1,
      toiletCount: 1,
      rentPrice: 1000,
    },
    {
      id: 2,
      title: '深圳市市南区沿山社区网谷科技大厦501',
      roomCount: 2,
      hallCount: 1,
      toiletCount: 1,
      rentPrice: 1500,
    },
  ]);
  // const [params, setParams] = useState({});
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchHouseList();
  }, [fetchHouseList]);

  const scrollToListTop = () => {
    const listElementCur = listElement.current;
    if (houseListData.length) {
      listElementCur && listElementCur.scrollToIndex({index: 0, viewOffset: 0});
    }
  };

  const houseListData = () => {
    return houses.slice() || [];
  };
  const isNoMoreData = () => {
    return !!pagination && pagination.pageNum === pagination.pages;
  };
  const updateLoadingState = loading => {
    setIsLoading(loading);
  };
  const updateResultData = resultData => {
    const data = resultData.list;
    const page = {
      pageNum: resultData.pageNum,
      pageSize: resultData.pageSize,
      pages: resultData.pages,
      total: resultData.total,
    };
    setPagination(page);
    if (resultData.pageNum > 1) {
      let list = houseListData;
      list.push(...data);
      setHouses(list);
    } else {
      setHouses(data);
    }
  };

  const fetchHouseList = useCallback((page = 1) => {
    updateLoadingState(true);
    props.getHousingList({pageNum: page}, res => {
      console.log('houseList', res.data);
      // $getImage(res.data.list[0].imgUrl, res => {
      //   console.log('img', res);
      // });
      updateResultData(res.data);
    });
  });

  const getHouseIdKey = (house, index) => {
    return `index:${index}:sep:${house.id}`;
  };
  const getHouseItemLayout = (_, index) => {
    const height = 250;
    return {
      index,
      length: height,
      offset: height * index,
    };
  };
  const handleLoadMoreArticle = () => {
    if (!isNoMoreData && !isLoading && pagination) {
      fetchHouseList(pagination.pageNum + 1);
    }
  };
  const handleToDetailPage = item => {
    console.log('item', item);
    nav.navigate({
      name: AppRoute.HOUSEDETAIL,
      key: String(item.id),
      params: {item},
    });
  };

  // 渲染列表为空时的状态：无数据
  const renderListEmptyView = () => {
    if (isLoading) {
      return null;
    }

    return (
      <View style={styles.centerContainer}>
        <Text style={styles.normalTitle}>当前数据为空</Text>
      </View>
    );
  };
  // 渲染列表脚部的三种状态：空、加载中、无更多、上拉加载
  const renderListFooterView = () => {
    if (!houseListData.length) {
      return null;
    }

    if (isLoading) {
      return (
        <View style={[styles.centerContainer, styles.loadMoreViewContainer]}>
          <Text style={styles.smallTitle}>努力加载中....</Text>
        </View>
      );
    }

    if (isNoMoreData) {
      return (
        <View style={[styles.centerContainer, styles.loadMoreViewContainer]}>
          <Text style={styles.smallTitle}>已经到底了</Text>
        </View>
      );
    }

    return (
      <View style={[styles.centerContainer, styles.loadMoreViewContainer]}>
        <Text style={[styles.smallTitle, {marginLeft: 20}]}>
          努力加载中....
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={houseListData()}
      ref={listElement}
      // 首屏渲染多少个数据
      initialNumToRender={5}
      // 手动维护每一行的高度以优化性能
      getItemLayout={getHouseItemLayout}
      // 列表为空时渲染
      ListEmptyComponent={renderListEmptyView()}
      // 加载更多时渲染
      ListFooterComponent={renderListFooterView()}
      // 当前列表 loading 状态
      refreshing={isLoading}
      // 刷新
      // onRefresh={fetchHouseList}
      // 加载更多安全距离（相对于屏幕高度的比例）
      onEndReachedThreshold={IS_IOS ? 0.05 : 0.2}
      // 加载更多
      onEndReached={handleLoadMoreArticle}
      // 唯一 ID
      keyExtractor={item => item.id}
      renderItem={({item, index}) => {
        return (
          <HouseItem
            houseInfo={item}
            onPress={handleToDetailPage}
            key={getHouseIdKey(item, index)}
          />
        );
      }}
    />
  );
}
const styles = StyleSheet.create({
  istViewContainer: {
    position: 'relative',
    flex: 1,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  loadMoreViewContainer: {
    padding: 20,
  },
  normalTitle: {
    fontSize: 14,
    color: '#ddd',
  },
  smallTitle: {
    fontSize: 12,
    color: '#ddd',
  },
});

// reducer获取
function mapStateToProps(state) {
  return {};
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getHousingList}, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(HouseListComponent);
