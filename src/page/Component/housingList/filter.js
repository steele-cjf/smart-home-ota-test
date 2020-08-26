import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Animated, Easing, StyleSheet} from 'react-native';
import LabelSelect from '../labelSelect';
import Theme from '../../../style/colors';
import { Button } from 'native-base';
const listFilter = {
  location: [{label: '附近1千米', value: '1km'}, {label: '附近2千米', value: '2km'}, {label: '附近3千米', value: '3km'}],
  rent: [{label: '不限', value: '0'}, {label: '≤1000元', value: '1'}, {label: '1000～2000元', value: '2'}, {label: '2000～3000元', value: '3'}, {label: '3000～4000元', value: '4'}, {label: '4000以上', value: '5'}],
  filter: [{label: '最新发布', value: 'newest'}, {label: '价格由低到高', value: 'price_up'}, {label: '价格由高到低', value: 'price_down'}]
}
const rentalType = [
  {value: '整租', code: 'full_rent', selected: false},
  {value: '合租', code: 'co_rent', selected: false}
]
const houseTypeList = [
  {value: '一室户', code: 1, selected: false},
  {value: '二室户', code: 2, selected: false},
  {value: '三室户', code: 3, selected: false},
  {value: '四室户', code: 4, selected: false},
  {value: '更大户型', code: 0, selected: false}
]


class DropdownMenu extends Component {

  constructor(props, context) {
    super(props, context);

    var selectIndex = new Array(this.props.data.length);
    for (var i = 0; i < selectIndex.length; i++) {
      selectIndex[i] = 0;
    }
    this.state = {
      activityIndex: -1,
      selectIndex: -1,
      rotationAnims: props.data.map(() => new Animated.Value(0))
    };

    this.defaultConfig = {
      bgColor: 'grey',
      tintColor: '#333333',
      activityTintColor: "red",
      arrowImg: require('../../../assets/images/dropdown_arrow.png'),
    };

  }

  renderChcek(index, title) {
    var activityIndex = this.state.activityIndex;
    if (this.state.selectIndex[activityIndex] == index) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: "center", paddingHorizontal: 15, flexDirection: 'row'}} >
          <Text
            style={[
              styles.item_text_style,
              this.props.optionTextStyle,
              {color: this.props.activityTintColor ? this.props.activityTintColor : this.defaultConfig.activityTintColor}
          ]} >
            {title.label}
          </Text>
        </View>
    );
    } else {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: "center", paddingHorizontal: 15, flexDirection: 'row'}} >
          <Text style={[
              styles.item_text_style,
              this.props.optionTextStyle,
              {color: this.props.tintColor ? this.props.tintColor : this.defaultConfig.tintColor}
          ]} >{title.label}</Text>
      </View>
    );
    }
  }

  renderItemList(arr) {
    return (
      arr.map((title, index) =>
        <TouchableOpacity key={index} activeOpacity={1} style={{flex: 1, height: 40}} onPress={this.itemOnPress.bind(this, index)} >
          {this.renderChcek(index, title)}
        </TouchableOpacity>)
    )
  }
  renderActionLabel() {
    return (
      <View style={styles.house_type_content}>
        <Text style={styles.house_title}>出租类型</Text>
        <LabelSelect 
          labelList={rentalType} />
        <Text style={styles.house_title}>户型</Text>
        <LabelSelect 
          labelList={houseTypeList} />
      </View>
    )
  }

  renderActivityPanel() {
    if (this.state.activityIndex >= 0) {

      var currentTitles = this.props.data[this.state.activityIndex];
      console.log('currentTitles', currentTitles);

      var heightStyle = {};
      if (this.props.maxHeight && this.props.maxHeight < currentTitles.length * 44) {
        heightStyle.height = this.props.maxHeight;
      }

      return (
        <View style={{position: 'absolute', left: 0, right: 0, top: 40, bottom: 0}}>
          <TouchableOpacity onPress={() => this.openOrClosePanel(this.state.activityIndex)} activeOpacity={1} style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
          <View style={{opacity: 0.4, backgroundColor: 'black', flex: 1 }} />
          </TouchableOpacity>
          <View style={[{position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: 'white'}, heightStyle]}>
            {  
              currentTitles.key !== 'houseType' ? this.renderItemList(listFilter[currentTitles.key]) : this.renderActionLabel()
            }
        </View>
      </View>
    );
    } else {
      return (null);
    }
  }

  openOrClosePanel(index) {

    this.props.bannerAction ? this.props.bannerAction() : null;

    if (this.state.activityIndex == index) {
      this.closePanel(index);
      this.setState({
        activityIndex: -1,
      });
    } else {
      if (this.state.activityIndex > -1) {
        this.closePanel(this.state.activityIndex);
      }
      this.openPanel(index);
      this.setState({
        activityIndex: index,
      });
    }
  }

  openPanel(index) {
    Animated.timing(
      this.state.rotationAnims[index],
      {
        toValue: 0.5,
        duration: 300,
        easing: Easing.linear
      }
    ).start();
  }

  closePanel(index) {
    Animated.timing(
      this.state.rotationAnims[index],
      {
        toValue: 0,
        duration: 300,
        easing: Easing.linear
      }
    ).start();
  }

  itemOnPress(index) {
    if (this.state.activityIndex > -1) {
      var selectIndex = this.state.selectIndex;
      selectIndex[this.state.activityIndex] = index;
      this.setState({
        selectIndex: selectIndex
      });
      if (this.props.handler) {
        this.props.handler(this.state.activityIndex, index);
      }
    }
    this.openOrClosePanel(this.state.activityIndex);
  }

  renderDropDownArrow(index) {
    var icon = this.props.arrowImg ? this.props.arrowImg : this.defaultConfig.arrowImg;
    return (
      <Animated.Image
        source={icon}
        style={{
          width:6,
            height:4,
            marginLeft: 8,
            tintColor: (index === this.state.activityIndex) ? (this.props.activityTintColor ? this.props.activityTintColor : this.defaultConfig.activityTintColor) : (this.props.tintColor ? this.props.tintColor : this.defaultConfig.tintColor),
            transform: [{
            rotateZ: this.state.rotationAnims[index].interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg']
            })
          }]
        }}
      />
    );
  }

  render() {

    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        <View style={{
          flexDirection: 'row',
          backgroundColor: this.props.bgColor ? this.props.bgColor : this.defaultConfig.bgColor}} >
        {
          this.props.data.map((rows, index) =>
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.openOrClosePanel.bind(this, index)}
            key={index}
            style={{flex: 1, height: 48, alignItems: "center", justifyContent: "center"}} >
            <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "center"}} >
              <Text
                style={[
                  styles.title_style,
                  this.props.titleStyle,
                  {color: (index === this.state.activityIndex) ?
                    (this.props.activityTintColor ? this.props.activityTintColor : this.defaultConfig.activityTintColor)
                    :
                    (this.props.tintColor ? this.props.tintColor : this.defaultConfig.tintColor)}
              ]} >
                {rows.value}
              </Text>
              {this.renderDropDownArrow(index)}
            </View>
          </TouchableOpacity>)
        }
        </View>
        {this.props.children}

        {this.renderActivityPanel()}
      </View>
  );
  }

}


const styles = StyleSheet.create({
  title_style: {
    fontSize: 14
  },
  item_text_style: {
    color: '#333333',
    fontSize: 14
  },
  house_type_content: {
    padding: 16,
  },
  house_title: {
    fontSize: 16,
    color: '#282828',
    marginBottom: 16,
  }
});

export default DropdownMenu;
