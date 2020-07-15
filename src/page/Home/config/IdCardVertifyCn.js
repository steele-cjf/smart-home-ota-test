const vertifyCn = [{
    name: '真实姓名',
    placeholder: '请输入真实姓名',
    key: 'userName',
    type: 'INPUT',
    errorMsg: ['真实姓名输入有误']
}, {
    name: '身份证号',
    placeholder: '请输入身份证号',
    key: 'ID card',
    type: 'INPUT',
    errorMsg: ['身份证号输入有误']
}, {
    name: '性别',
    placeholder: '请选择性别',
    key: 'sex',
    type: 'RADIO',
    initial: 1,
    selectOptions: [
        { label: '男', value: 1 },
        { label: '女', value: 2 }
    ]
}, {
    name: '民族',
    placeholder: '请输入民族',
    key: 'nation',
    type: 'INPUT'
}, {
    name: '出生日期',
    placeholder: '请选择出生日期',
    key: 'birth',
    type: 'DATE'
}, {
    name: '身份证地址',
    placeholder: '请输入身份证地址',
    key: 'address',
    type: 'INPUT'
}]

export default vertifyCn
