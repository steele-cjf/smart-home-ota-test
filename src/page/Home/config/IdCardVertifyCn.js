const vertifyCn = [
  {
    name: '真实姓名',
    placeholder: '请输入真实姓名',
    key: 'name',
    type: 'INPUT',
    required: true,
    errorMsg: ['请输入真实姓名'],
  },
  {
    name: '身份证号',
    placeholder: '请输入身份证号',
    key: 'identificationNo',
    type: 'INPUT',
    required: true,
    errorMsg: ['请输入身份证号'],
  },
  {
    name: '性别',
    placeholder: '请选择性别',
    key: 'gender',
    type: 'RADIO',
    initial: 1,
    required: true,
    selectOptions: [{label: '男', value: 1}, {label: '女', value: 2}],
  },
  {
    name: '民族',
    placeholder: '请输入民族',
    key: 'nation',
    required: true,
    type: 'INPUT',
    errorMsg: ['请输入民族'],
  },
  {
    name: '出生日期',
    required: true,
    placeholder: '请选择出生日期',
    key: 'birthDate',
    type: 'DATE',
    errorMsg: ['请选择出生日期'],
  },
  {
    name: '身份证地址',
    required: true,
    placeholder: '请输入身份证地址',
    key: 'identificationAddress',
    type: 'INPUT',
    errorMsg: ['请输入身份证地址'],
  },
];

export default vertifyCn;
