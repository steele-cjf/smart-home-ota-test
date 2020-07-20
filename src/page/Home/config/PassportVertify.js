const vertifyCn = [{
    name: '真实姓名',
    placeholder: '请输入真实姓名',
    key: 'name',
    type: 'INPUT',
    required: true,
    errorMsg: ['请输入真实姓名']
}, {
    name: '护照号',
    required: true,
    placeholder: '请输入护照号',
    key: 'identificationNo',
    type: 'INPUT',
    errorMsg: ['请输入护照号']
}, {
    name: '性别',
    placeholder: '请选择性别',
    key: 'gender',
    type: 'RADIO',
    initial: 0,
    selectOptions: [
        { label: '男', value: 0 },
        { label: '女', value: 1 }
    ]
}, {
    name: '出生日期',
    required: true,
    placeholder: '请选择出生日期',
    key: 'birthDate',
    type: 'DATE',
    errorMsg: ['请选择出生日期']
}, {
    name: '国籍',
    required: true,
    placeholder: '请输入国籍',
    key: 'country',
    type: 'INPUT',
    errorMsg: ['请输入国籍']
}]

export default vertifyCn
