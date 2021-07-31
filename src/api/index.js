import axios from 'axios'

let baseURL;
if (process.env.NODE_ENV === 'development') { // 开发环境
  baseURL = window.Glob.BaseUrl
} else { // 编译环境
  if (process.env.type === 'test') { // 测试环境
    baseURL = window.Glob.BaseUrl // 在这里使用配置文件中的域名
  } else { // 正式环境
    baseURL = window.Glob.BaseUrl // 在这里使用配置文件中的域名
  }
}

let instance = axios.create({
  baseURL: baseURL,
  headers: {
    //'Content-type':'application/x-www-form-urlencoded'
  },
})

const api = {
  //登录
  login: params => {
    return instance.post('user/login', params)
  },
  // 根据条件查找指定的设备信息列表
  GetEquipmentList: params => {
    return instance.post('BaseDataGet/GetEquipmentList', params)
  },
  // 根据条件查找指定的用户信息列表
  GetUserList: params => {
    return instance.post('BaseDataGet/GetUserList', params)
  },

  //纤经模块
  // 获取数据
  GetQJInfoList: params => {
    return instance.post('ProduceManagement/GetQJInfoList', params)
  },
  // 根据传入设备ID获取对应设备数产信息返回
  GetQJSC: params => {
    return instance.post('BaseDataGet/GetQJSC', params)
  },
  // 更新扦经机台和扦经人员信息
  UpdateQJEquipment: params => {
    return instance.post('ProduceManagement/UpdateQJEquipment', params)
  },
  // 生产任务报工
  QJSubmitStart: params => {
    return instance.post('ProduceManagement/QJSubmitStart', params)
  },
  // 生产任务完工
  QJSubmitEnd: params => {
    return instance.post('ProduceManagement/QJSubmitEnd', params)
  },

  // 成品入库
  // 库位号
  getstorageinfo: params => {
    return instance.post('inventorymanagement/getstorageinfo', params)
  },
  // 流水号
  getproductstockindata: params => {
    return instance.post('inventorymanagement/getproductstockindata', params)
  },
  // 提交
  addstkproductstockin: params => {
    return instance.post('inventorymanagement/addstkproductstockin', params)
  },
  // 成品出库
  // 查询
  getproductstockoutdata: params => {
    return instance.post('inventorymanagement/getproductstockoutdata', params)
  },
  // 提交
  addstkproductstockout: params => {
    return instance.post('inventorymanagement/addstkproductstockout', params)
  },
  // 原料库
  // 整经领料出库--获取数据
  getwarpdata: params => {
    return instance.post('materialmanagement/getwarpdata', params)
  },
  // 整经领料出库--详情
  getmaterialdata: params => {
    return instance.post('materialmanagement/getmaterialdata', params)
  },
  // 织造领料出库--获取数据
  getweavdata: params => {
    return instance.post('materialmanagement/getweavdata', params)
  },



  // 成品检验报表
  getcheckstatistics: params => {
    return instance.post('qccheckfinishproduct/getcheckstatistics', params)
  },
  // 



};
export {
  api
}