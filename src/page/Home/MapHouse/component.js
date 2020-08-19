/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'native-base'
import { MapView } from "react-native-amap3d";
import Entypo from 'react-native-vector-icons/Entypo'
import provinces from './mock'
import BottomSheet from 'reanimated-bottom-sheet'

let h = Dimensions.get('window').height
const snapPoints = [0.6 * h, 0.5 * h, 0.4 * h, 0.3 * h, 0.2 * h, 0.1 * h, 0]
function MapHouse(props) {
  const [snapIndex] = useState(3)
  const [selectItem, setSelectItem] = useState()
  const mapRef = useRef()
  const bottomSheetRef = React.useRef(null)
  useEffect(() => {
    console.log(888, mapRef.current.getWest)
  }, [mapRef])
  const selectMarker = (item) => {
    setSelectItem(item)
    bottomSheetRef.current.snapTo(snapIndex)
  }
  const searchMarker = (loc) => {
    let { latitude, longitude, latitudeDelta, longitudeDelta } = loc.region
    let bottom = latitude - latitudeDelta / 2
    let left = longitude - longitudeDelta / 2
    let right = longitude + longitudeDelta / 2
    let top = latitude + latitudeDelta / 2
    let data = { bottom, left, top, right, bottom }
    console.log(88, data)
    props.getSearchSummaries(data, res => {
      console.log(res, 333333)
    })
  }
  const renderMarker = () => {
    var markers = []
    markers = provinces.map((item) => {
      let lat = item.center.split(',')[1]
      let lng = item.center.split(',')[0]
      return (
        <MapView.Marker
          key={item.name}
          icon={() => {
            return (<Entypo name='location-pin' style={{ color: 'blue', fontSize: 20 }}></Entypo>)
          }}
          onPress={() => selectMarker(item)}
          title={item.name}
          coordinate={{
            latitude: lat,
            longitude: lng
          }}
        />
      )
    })
    return markers
  }
  const renderHeader = () => {
    return (<Text style={styles.header}>——</Text>)
  }
  const renderContent = () => {
    return (
      <View style={styles.content}>
        <Text>当前选中：{(selectItem && selectItem.name) || '--'}</Text>
      </View>)
  }
  return (
    <View style={{ flex: 1 }}>
      <Button onPress={() => {
        console.log(mapRef)
      }}><Text>dfsadfsa</Text></Button>
      <MapView style={{ flex: 1 }}
        zoomLevel={6}
        onStatusChangeComplete={(region) => {
          searchMarker(region)
        }}
        ref={mapRef}>
        {renderMarker()}
      </MapView >
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
  }
})
export default MapHouse;
