const houseLayoutCn = [
    {
        name: '朝向',
        key: 'direction',
        headKey: 'houseLayout',
        codeKey: 'house_direction'
    }, {
        name: '面积',
        key: 'area',
        headKey: 'houseLayout'
    }, {
        name: '楼层',
        key: ['floorCount', 'floor'],
        keyType: 'array',
        headKey: 'houseLayout'
    }, {
        name: '类型',
        key: 'houseType',
        codeKey: 'house_type'
    }
]
const houseItemCn = {
    "air_conditioner": "kongtiao",
    "balcony": "yangtai",
    "gas": "tianranqi",
    "gas_stove": "ranqizao",
    "heater": "nuanqi",
    "induction_cooker": "diancilu",
    "microwave_oven": "weibolu",
    "refrigerator": "bingxiang",
    "smoking_machine": "youyanji",
    "sofa": "shafa",
    "table_chair": "yizi",
    "tv": "dianshi",
    "wardrobe": "yigui",
    "washing_machine": "xiyiji",
    "water_heater": "reshuiqi"
}
const houseRatePlanCn = [{
    name: '水费',
    key: 'waterFeeUnitPrice',
    unit: '元/吨'
}, {
    name: '电费',
    key: 'electricityFeeUnitPrice',
    unit: '元/度'
}, {
    name: '宽带',
    key: 'networkFeeUnitPrice',
    unit: '元/月'
}, {
    name: '物业',
    key: 'managementFeeUnitPrice',
    unit: '元/平方米'
}, {
    name: '燃气',
    key: 'gasFeeUnitPrice',
    unit: '元/立方米'
}, {
    name: '暖气',
    key: 'heatingFeeUnitPrice',
    unit: '元/立方米'
}]
export {
    houseLayoutCn,
    houseItemCn,
    houseRatePlanCn
};
