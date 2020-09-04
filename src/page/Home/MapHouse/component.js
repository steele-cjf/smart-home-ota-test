/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { MapView } from "react-native-amap3d";
import BottomSheet from 'reanimated-bottom-sheet'
import Geolocation from '@react-native-community/geolocation';
import { useFocusEffect } from '@react-navigation/native';
import HouseListComponent from '../../Component/housingList/list';
import DropdownMenu from '../../Component/housingList/filter';
import HeaderCommon from '../../Component/HeaderCommon';

let h = Dimensions.get('window').height
const snapPoints = [0.6 * h, 0.5 * h, 0.4 * h, 0.3 * h, 0.2 * h, 0.1 * h, 0]
function MapHouse(props) {
  const data = [{ type: 'text', value: '位置', key: 'location' }, { type: 'text', value: '方式/户型', key: 'houseType' }, { type: 'text', value: '租金', key: 'rent' }];
  const filterParamsList = [
    [{ distance: '1' }, { distance: '2' }, { distance: '3' }],
    [],
    [{ priceHigh: null, priceLow: null }, { priceHigh: 1000, priceLow: 0 }, { priceHigh: 2000, priceLow: 1000 }, { priceHigh: 3000, priceLow: 2000 }, { priceHigh: 4000, priceLow: 3000 }, { priceHigh: null, priceLow: 4000 }],
    [{ orderBy: 'newest' }, { orderBy: 'price_up' }, { orderBy: 'price_down' }]
  ]

  const [snapIndex] = useState(snapPoints.length - 1)
  const [selectItem, setSelectItem] = useState()
  const [markers, setMarker] = useState([])
  const [params, setParams] = useState({})
  const [center, setCenter] = useState({
    latitude: 39.904989,
    longitude: 116.40
  })
  const [houseList, setHouseList] = useState({})
  const mapRef = useRef()
  const bottomSheetRef = React.useRef(null)

  useFocusEffect(useCallback(() => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: true
    });
    if (Platform.OS == 'ios') {
      Geolocation.requestAuthorization()
    }
    Geolocation.getCurrentPosition(
      position => {
        console.log('position: ' + JSON.stringify(position))
        if (position.coords) {
          setCenter(position.coords);
        }
      },
      error => showToast('Error', JSON.stringify(error))
    )
  }, [props.route])
  )
  const selectMarker = (item) => {
    setSelectItem(item)
    if (item) {
      props.getHousingList({
        formattedAddress: item.formattedAddress
      }, res => {
        setHouseList(res.data.list)
      })
      bottomSheetRef.current.snapTo(3)
    } else {
      bottomSheetRef.current.snapTo(snapIndex)
    }
  }
  const searchMarker = (data) => {
    // let { latitude, longitude, latitudeDelta, longitudeDelta } = loc.region
    // let bottom = latitude - latitudeDelta / 2
    // let left = longitude - longitudeDelta / 2
    // let right = longitude + longitudeDelta / 2
    // let top = latitude + latitudeDelta / 2
    // let data = { bottom, left, top, right, bottom }
    console.log('mapData', data);
    props.getSearchSummaries(data, res => {
      console.log('resData', res);
      if (!res.code && res.data) {
        setMarker(res.data)
      }
    })
  }
  const mapClick = () => {
    selectMarker(null)
  }

  const getFilter = (sec, row) => {
    if (sec === 1) {
      return
    }
    if (sec === 0) {
      const arr = [center.longitude, center.latitude];
      const lip = Object.assign(params, { center: arr.join(',') })
      setParams(lip)
    }
    const data = filterParamsList[sec][row]
    const newData = Object.assign(params, data)
    setParams(newData)
    searchMarker(newData)
  }
  const getSection = (arr1, arr2) => {
    const houseParams = {
      houseType: arr1,
      roomCount: arr2
    }
    const newData = Object.assign(params, houseParams)
    console.log('newData2', newData);
    setParams(newData)
    searchMarker(newData)
  }

  // 渲染marker 
  const renderMarker = () => {
    var Dom = []
    Dom = markers.map((item) => {
      let { latitude, longitude } = item
      let checkSelect = selectItem && selectItem.formattedAddress === item.formattedAddress
      return (
        <MapView.Marker
          key={item.formattedAddress}
          title={item.formattedAddress}
          icon={() => {
            return (<Text style={[styles.markerBox, checkSelect && styles.selectMarker]}>{item.formattedAddress}</Text>)
          }}
          onPress={() => selectMarker(item)}
          coordinate={{
            latitude, longitude
          }}
        />
      )
    })
    return Dom
  }
  const renderHeader = () => {
    return (<Text style={styles.header}>——</Text>)
  }
  const renderContent = () => {
    if (!selectItem) return (<View style={styles.content} />)
    return (
      <View style={styles.content}>
        <View style={styles.contentBox}>
          <Text style={styles.contentTitle}>{selectItem.formattedAddress}</Text>
          <Text style={styles.contentDes}>{'在租' + selectItem.houseCount + '套'}</Text>
        </View>
        <HouseListComponent list={houseList} getList={(obj) => { getList(obj) }} />
      </View>)
  }
  return (
    <View style={{ flex: 1 }}>
      <HeaderCommon
        options={{
          backTitle: '返回',
          title: '地图找房'
        }}
      />
      <DropdownMenu
        bgColor={'white'}
        tintColor={'#282828'}
        activityTintColor={'#5C8BFF'}
        handler={(selection, row) => getFilter(selection, row)}
        multipleSection={(arr1, arr2) => getSection(arr1, arr2)}
        data={data}
      >
        <MapView style={{ flex: 1 }}
          zoomLevel={10}
          // maxZoomLevel={10}
          // minZoomLevel={2}
          locationEnabled
          rotateEnabled={false}
          onClick={() => mapClick()}
          showsLocationButton
          onStatusChangeComplete={(region) => {
            searchMarker()
          }}
          center={center}
          ref={mapRef}>
          {renderMarker()}
        </MapView>
      </DropdownMenu>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        initialSnap={snapIndex}
        enabledGestureInteraction={true}
        enabledContentTapInteraction={false} // 巨坑：false，children组件的事件才会生效
        enabledContentGestureInteraction={false}
        enabledHeaderGestureInteraction={true}
        style={styles.BottomSheet}
        renderHeader={() => renderHeader()}
        renderContent={() => renderContent()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  BottomSheet: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'red',
    width: '100%'
  },
  content: {
    height: '100%',
    textAlign: 'center',
    backgroundColor: '#fff'
  },
  header: {
    backgroundColor: '#fff',
    textAlign: 'center'
  },
  markerBox: {
    color: '#fff',
    backgroundColor: '#527BDF',
    padding: 5,
    borderRadius: 5,
    fontSize: $screen.scaleSize(12)
  },
  selectMarker: {
    backgroundColor: '#FD8D22'
  },
  contentBox: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 10
  },
  contentTitle: {
    color: '#282828',
    fontSize: $screen.scaleSize(20),
  },
  contentDes: {
    color: '#7C7C7C',
    fontSize: $screen.scaleSize(12),
    position: 'absolute',
    right: 17,
    top: 8
  }
})
export default MapHouse;
