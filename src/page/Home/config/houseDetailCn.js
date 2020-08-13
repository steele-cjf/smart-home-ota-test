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
export {
    houseLayoutCn,
    houseItemCn
};
