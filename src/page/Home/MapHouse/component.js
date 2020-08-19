/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'native-base'
import { MapView } from "react-native-amap3d";
import BottomSheet from 'reanimated-bottom-sheet'
import Geolocation from '@react-native-community/geolocation';
import { useFocusEffect } from '@react-navigation/native';
import HouseListComponent from '../../Component/housingList/list';

let h = Dimensions.get('window').height
const snapPoints = [0.6 * h, 0.5 * h, 0.4 * h, 0.3 * h, 0.2 * h, 0.1 * h, 0]
function MapHouse(props) {
  const [snapIndex] = useState(snapPoints.length - 1)
  const [selectItem, setSelectItem] = useState()
  const [markers, setMarker] = useState([])
  const [center, setCenter] = useState({

  })
  const mapRef = useRef()
  const bottomSheetRef = React.useRef(null)

  useFocusEffect(useCallback(() => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: true
    });
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
      props.getMarkerList({
        formattedAddress: item.formattedAddress}, res => {
        console.log(3333, res.data.list)
      })
      bottomSheetRef.current.snapTo(3)
    } else {
      bottomSheetRef.current.snapTo(snapIndex)
    }
  }
  const searchMarker = (loc) => {
    let { latitude, longitude, latitudeDelta, longitudeDelta } = loc.region
    let bottom = latitude - latitudeDelta / 2
    let left = longitude - longitudeDelta / 2
    let right = longitude + longitudeDelta / 2
    let top = latitude + latitudeDelta / 2
    let data = { bottom, left, top, right, bottom }
    props.getSearchSummaries(data, res => {
      if (!res.code && res.data) {
        setMarker(res.data)
      }
    })
  }
  const mapClick = () => {
    selectMarker(null)
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
        <HouseListComponent />
      </View>)
  }
  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }}
        zoomLevel={10}
        maxZoomLevel={18}
        minZoomLevel={2}
        locationEnabled
        rotateEnabled={false}
        onClick={() => mapClick()}
        showsLocationButton
        onStatusChangeComplete={(region) => {
          searchMarker(region)
        }}
        center={center}
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
  },
  markerBox: {
    color: '#fff',
    backgroundColor: '#527BDF',
    padding: 5,
    borderRadius: 5,
    fontSize: 12
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
    fontSize: 20,
  },
  contentDes: {
    color: '#7C7C7C',
    fontSize: 12,
    position: 'absolute',
    right: 17,
    top: 8
  }
})
export default MapHouse;
