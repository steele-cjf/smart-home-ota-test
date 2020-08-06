const { exp } = require("react-native-reanimated");

const tenant_form = [
    {
        name: '真实姓名',
        key: 'name',
        desc: '输入真实姓名',
        required: true,
        type: 'INPUT'
    }, {
        name: '证件类型',
        key: 'type',
        desc: '请选择证件',
        required: true,
        type: 'SELECT'
    },
    {
        name: '身份证号',
        key: 'id',
        desc: '输入身份证号',
        required: true,
        type: 'INPUT'
    }, {
        name: '护照号',
        key: 'id2',
        desc: '输入护照号',
        required: true,
        type: 'INPUT'
    },
    {
        name: '手机号',
        key: 'mobile',
        desc: '输入手机号',
        required: true,
        type: 'INPUT'
    }
];

export default tenant_form