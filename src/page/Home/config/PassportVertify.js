const vertifyCn = [{
    name: '真实姓名',
    placeholder: '请输入真实姓名',
    key: 'userName',
    type: 'INPUT',
    errorMsg: ['真实姓名输入有误']
}, {
    name: '护照号',
    placeholder: '请输入护照号',
    key: 'passport',
    type: 'INPUT',
    errorMsg: ['护照号输入有误']
}, {
    name: '性别',
    placeholder: '请选择性别',
    key: 'sex',
    type: 'RADIO',
    initial: 0,
    selectOptions: [
        { label: '男', value: 0 },
        { label: '女', value: 1 }
    ]
}, {
    name: '出生日期',
    placeholder: '请选择出生日期',
    key: 'birth',
    type: 'DATE'
}, {
    name: '国籍',
    placeholder: '请输入国籍',
    key: 'country',
    type: 'INPUT'
}]

export default vertifyCn
