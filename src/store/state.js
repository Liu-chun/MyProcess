export default {
  fiber: {
    // 设备
    sbInput: '',
    // 经轴卡
    cardNumber: '',
    // 状态
    status: -1,
    statusArr: [{
        value: -1,
        label: '全部'
      }, {
        value: 0,
        label: '未落实'
      },
      {
        value: 1,
        label: '已落实未领料'
      },
      {
        value: 2,
        label: '已领料待生产'
      },
      {
        value: 3,
        label: '生产中'
      },
      {
        value: 4,
        label: '已完工'
      },
      {
        value: 5,
        label: '委外未发料'
      }
    ],
  },
  weaving: {
    // 设备 JZ028
    sbInput: '',
    // 任务书号
    cardNumber: '',
    // 流水号
    waters: '',
    // 状态
    status: -1,
    statusArr: [{
        value: -1,
        label: '全部'
      }, {
        value: 0,
        label: '已落实待生产'
      },
      {
        value: 1,
        label: '暂停中'
      },
      {
        value: 3,
        label: '已对样'
      }, {
        value: 4,
        label: '生产中'
      }, {
        value: 5,
        label: '生产已完工'
      }
    ],
  }
}