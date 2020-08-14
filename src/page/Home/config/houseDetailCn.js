import HouseDetail from "../Component/houseDetail";

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
    "air_conditioner": "database",
    "balcony": "dingding",
    "gas": "twitter",
    "gas_stove": "aliyun",
    "heater": "rocket1",
    "induction_cooker": "sound",
    "microwave_oven": "shake",
    "refrigerator": "API",
    "smoking_machine": "android1",
    "sofa": "indent-right",
    "table_chair": "disconnect",
    "tv": "tablet1",
    "wardrobe": "printer",
    "washing_machine": "Safety",
    "water_heater": "woman"
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
    key: ' gasFeeUnitPrice',
    unit: '元/立方米'
}, {
    name: '暖气',
    key: ' heatingFeeUnitPrice',
    unit: '元/立方米'
}]
export {
    houseLayoutCn,
    houseItemCn,
    houseRatePlanCn
};
