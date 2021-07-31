import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Login',
    component: () => import('../components/Login')
  },
  {
    path: '/Layout',
    name: 'Layout',
    component: () => import('../views/Layout'),
    children: [
      // 我的
      {
        path: '/My',
        name: '我的',
        components: {
          content: () => import('../views/my/my'),
        }
      },
      // 提醒
      {
        path: '/prompt',
        name: '提示',
        components: {
          content: () => import('../views/prompt/prompt'),
        }
      },
      {
        path: '/promptZc',
        name: '正常提示',
        components: {
          content: () => import('../views/prompt/promptZc'),
        }
      },
      {
        path: '/promptZcPush',
        name: '我推送的消息',
        components: {
          content: () => import('../views/prompt/promptZcPush'),
        }
      },
      {
        path: '/promptYc',
        name: '任务提示',
        components: {
          content: () => import('../views/prompt/promptYc'),
        }
      },
      {
        path: '/promptYj',
        name: '预警提示',
        components: {
          content: () => import('../views/prompt/promptYj'),
        }
      },
      {
        path: '/promptYcWith',
        name: '异常处理',
        components: {
          content: () => import('../views/prompt/promptYcWith'),
        }
      },
      // 报表
      {
        path: '/report',
        name: '查询报表',
        components: {
          content: () => import('../views/report/report'),
        }
      },
      {
        path: '/reportFiber',
        name: '纤经报表',
        components: {
          content: () => import('../views/report/reportFiber'),
        }
      },
      {
        path: '/reportWeaving',
        name: '织造报表',
        components: {
          content: () => import('../views/report/reportWeaving'),
        }
      },
      // 首页
      {
        path: '/Home',
        name: '嘉衡',
        components: {
          content: () => import('../views/home/home'),
        }
      },
      {
        path: '/Fiber',
        name: '纤经',
        components: {
          content: () => import('../views/home/fiber'),
        }
      },
      {
        path: '/fiberDetail',
        name: '经轴卡详情',
        components: {
          content: () => import('../views/home/fiberDetail'),
        }
      },
      {
        path: '/fiberYc',
        name: '纤经异常',
        components: {
          content: () => import('../views/home/fiberYc'),
        }
      },
      {
        path: '/createFiber',
        name: '创建经轴卡',
        components: {
          content: () => import('../views/home/createFiber'),
        }
      },
      {
        path: '/inventoryFiber',
        name: '原料库存',
        components: {
          content: () => import('../views/home/inventoryFiber'),
        }
      },
      {
        path: '/plan',
        name: '查询订单',
        components: {
          content: () => import('../views/home/plan'),
        }
      },
      {
        path: '/planDetail',
        name: '订单明细',
        components: {
          content: () => import('../views/home/planDetail'),
        }
      },
      {
        path: '/move',
        name: '挪料登记',
        components: {
          content: () => import('../views/home/move'),
        }
      },
      {
        path: '/fiberOk',
        name: '完工报产',
        components: {
          content: () => import('../views/home/fiberOk'),
        }
      },
      {
        path: '/fiberWorkOrder',
        name: '工单调整',
        components: {
          content: () => import('../views/home/fiberWorkOrder'),
        }
      },
      {
        path: '/weaving',
        name: '织造',
        components: {
          content: () => import('../views/home/weaving'),
        }
      },
      {
        path: '/weavingDetail',
        name: '织造详情',
        components: {
          content: () => import('../views/home/weavingDetail'),
        }
      },
      {
        path: '/weavingWorkOrder',
        name: '工单调整',
        components: {
          content: () => import('../views/home/weavingWorkOrder'),
        }
      },
      {
        path: '/weavingStartsOk',
        name: '开工确认',
        components: {
          content: () => import('../views/home/weavingStartsOk'),
        }
      },
      {
        path: '/weavingReportingWork',
        name: '报工',
        components: {
          content: () => import('../views/home/weavingReportingWork'),
        }
      },
      {
        path: '/weavingYc',
        name: '织造异常',
        components: {
          content: () => import('../views/home/weavingYc'),
        }
      },
      {
        path: '/weavingShui',
        name: '流水号详情',
        components: {
          content: () => import('../views/home/weavingShui'),
        }
      },
      {
        path: '/weavingOk',
        name: '织造报工',
        components: {
          content: () => import('../views/home/weavingOk'),
        }
      },
      {
        path: '/weavingGang',
        name: '缸号查询',
        components: {
          content: () => import('../views/home/weavingGang'),
        }
      },
      {
        path: '/weavingGangLR',
        name: '缸号录入',
        components: {
          content: () => import('../views/home/weavingGangLR'),
        }
      },
      {
        path: '/weavingFenPei',
        name: '重新分配',
        components: {
          content: () => import('../views/home/weavingFenPei'),
        }
      },
      {
        path: '/weavingStore',
        name: '经轴出入库',
        components: {
          content: () => import('../views/home/storeManagement/beamStore/weavingStore.vue'),
        }
      },
      {
        path: '/weavingFnder',
        name: '异常处理',
        components: {
          content: () => import('../views/home/weavingFnder'),
        }
      },
      {
        path: '/weavingShebei',
        name: '设备绑定',
        components: {
          content: () => import('../views/home/weavingShebei'),
        }
      },
      {
        path: '/equipment',
        name: '设备管理',
        components: {
          content: () => import('../views/home/equipment'),
        }
      },
      {
        path: '/equipmentDetail',
        name: '设备详情',
        components: {
          content: () => import('../views/home/equipmentDetail'),
        }
      },
      {
        path: '/equipmentM',
        name: '设备维修',
        components: {
          content: () => import('../views/home/equipmentM'),
        }
      },
      // 首页综合查询
      {
        path: '/zhongHeIndex',
        name: '综合查询',
        components: {
          content: () => import('../views/home/zonghe/zhongHeIndex'),
        }
      },
      {
        path: '/qjBiao',
        name: '纤经统计报表',
        components: {
          content: () => import('../views/home/zonghe/qjBiao/qjBiao'),
        }
      },
      {
        path: '/qjSc',
        name: '纤经生产明细',
        components: {
          content: () => import('../views/home/zonghe/qjBiao/qjSc'),
        }
      },
      {
        path: '/qjYc',
        name: '纤经异常明细',
        components: {
          content: () => import('../views/home/zonghe/qjBiao/qjYc'),
        }
      },
      {
        path: '/zzSc',
        name: '织造生产明细',
        components: {
          content: () => import('../views/home/zonghe/zzBiao/zzSc'),
        }
      },
      {
        path: '/zzYc',
        name: '织造异常明细',
        components: {
          content: () => import('../views/home/zonghe/zzBiao/zzYc'),
        }
      },
      {
        path: '/zzBiao',
        name: '织造统计报表',
        components: {
          content: () => import('../views/home/zonghe/zzBiao/zzBiao'),
        }
      },
      // 半成品
      {
        path: '/bcp',
        name: '半成品出入库',
        components: {
          content: () => import('../views/home/storeManagement/bcpStore/bcp.vue'),
        }
      },
      {
        path: '/bcpBiao',
        name: '半成品检验统计报表',
        components: {
          content: () => import('../views/home/zonghe/bcpBiao/bcpBiao'),
        }
      },
      {
        path: '/bcpSc',
        name: '半成品检验明细',
        components: {
          content: () => import('../views/home/zonghe/bcpBiao/bcpSc'),
        }
      },
      {
        path: '/bcpYc',
        name: '半成品异常明细',
        components: {
          content: () => import('../views/home/zonghe/bcpBiao/bcpYc'),
        }
      },
      {
        path: '/bcpKf',
        name: '扣分明细',
        components: {
          content: () => import('../views/home/zonghe/bcpBiao/bcpKf'),
        }
      },
      // 后整理
      {
        path: '/hFinishing',
        name: '后整理',
        components: {
          content: () => import('../views/home/hFinishing'),
        }
      },
      // 成品
      {
        path: '/cpBiao',
        name: '成品检验统计报表',
        components: {
          content: () => import('../views/home/zonghe/cpBiao/cpBiao'),
        }
      },
      {
        path: '/cpSc',
        name: '成品检验明细',
        components: {
          content: () => import('../views/home/zonghe/cpBiao/cpSc'),
        }
      },
      {
        path: '/cpYc',
        name: '成品异常明细',
        components: {
          content: () => import('../views/home/zonghe/cpBiao/cpYc'),
        }
      },
      {
        path: '/cpHx',
        name: '回修明细',
        components: {
          content: () => import('../views/home/zonghe/cpBiao/cpHx'),
        }
      },
      // 仓库管理
      {
        path: '/storeManagement',
        name: '仓库管理',
        components: {
          content: () => import('../views/home/storeManagement/storeManagement'),
        }
      },
      {
        path: '/rawStore',
        name: '原料库',
        components: {
          content: () => import('../views/home/storeManagement/rawStore/rawStore'),
        }
      },
      {
        path: '/bcpStore',
        name: '半成品库',
        components: {
          content: () => import('../views/home/storeManagement/bcpStore/bcpStore'),
        }
      },
      {
        path: '/cpStore',
        name: '成品库',
        components: {
          content: () => import('../views/home/storeManagement/cpStore/cpStore'),
        }
      },
      {
        path: '/beamStore',
        name: '经轴库',
        components: {
          content: () => import('../views/home/storeManagement/beamStore/beamStore'),
        }
      },
      {
        path: '/operation',
        name: '库内操作',
        components: {
          content: () => import('../views/home/storeManagement/operation/operation'),
        }
      },
      {
        path: '/othersStore',
        name: '其他出入库',
        components: {
          content: () => import('../views/home/storeManagement/othersStore/othersStore'),
        }
      },
      {
        path: '/outsourceStore',
        name: '委外出入库',
        components: {
          content: () => import('../views/home/storeManagement/outsourceStore/outsourceStore'),
        }
      },

      {
        path: '/cpIntoStore',
        name: '成品入库',
        components: {
          content: () => import('../views/home/storeManagement/cpStore/cpIntoStore'),
        }
      },
      {
        path: '/cpToStore',
        name: '成品出库',
        components: {
          content: () => import('../views/home/storeManagement/cpStore/cpToStore'),
        }
      },
      {
        path: '/cpIntoStoreDetail',
        name: '成品入库详情',
        components: {
          content: () => import('../views/home/storeManagement/cpStore/cpIntoStoreDetail'),
        }
      },
      {
        path: '/cpToStoreDetail',
        name: '成品出库详情',
        components: {
          content: () => import('../views/home/storeManagement/cpStore/cpToStoreDetail'),
        }
      },
      {
        path: '/purchaseArrival',
        name: '采购到货单',
        components: {
          content: () => import('../views/home/storeManagement/rawStore/purchaseArrival'),
        }
      },
      {
        path: '/purchaseIntoStore',
        name: '采购入库单',
        components: {
          content: () => import('../views/home/storeManagement/rawStore/purchaseIntoStore.vue'),
        }
      },
      {
        path: '/purchaseQuality',
        name: '采购质检单',
        components: {
          content: () => import('../views/home/storeManagement/rawStore/purchaseQuality'),
        }
      },
      {
        path: '/qualityTable',
        name: '质检报告',
        components: {
          content: () => import('../views/home/storeManagement/rawStore/qualityTable'),
        }
      },
      {
        path: '/outsourceToStore',
        name: '委外出库单',
        components: {
          content: () => import('../views/home/storeManagement/outsourceStore/outsourceToStore'),
        }
      },
      {
        path: '/outsourceArrival',
        name: '委外到货通知单',
        components: {
          content: () => import('../views/home/storeManagement/outsourceStore/outsourceArrival'),
        }
      },
      {
        path: '/outsourceIntoStore',
        name: '委外入库单',
        components: {
          content: () => import('../views/home/storeManagement/outsourceStore/outsourceIntoStore'),
        }
      },
      {
        path: '/outsourceRejection',
        name: '委外拒收单',
        components: {
          content: () => import('../views/home/storeManagement/outsourceStore/outsourceRejection'),
        }
      },
      {
        path: '/productionIntoStore',
        name: '生产入库单',
        components: {
          content: () => import('../views/home/storeManagement/cpStore/productionIntoStore'),
        }
      },
      {
        path: '/productionStock',
        name: '生产领料单',
        components: {
          content: () => import('../views/home/storeManagement/rawStore/productionStock'),
        }
      },
      {
        path: '/productionReturn',
        name: '生产退料单',
        components: {
          content: () => import('../views/home/storeManagement/rawStore/productionReturn'),
        }
      },
      {
        path: '/saleToStore',
        name: '销售出库单',
        components: {
          content: () => import('../views/home/storeManagement/cpStore/saleToStore'),
        }
      },
      {
        path: '/saleReturn',
        name: '销售退货单',
        components: {
          content: () => import('../views/home/storeManagement/cpStore/saleReturn'),
        }
      },
      {
        path: '/checkTable',
        name: '盘点单',
        components: {
          content: () => import('../views/home/storeManagement/operation/checkTable'),
        }
      },
      {
        path: '/transferTable',
        name: '调拨单',
        components: {
          content: () => import('../views/home/storeManagement/operation/transferTable'),
        }
      },
      {
        path: '/othersToStore',
        name: '其它出库单',
        components: {
          content: () => import('../views/home/storeManagement/othersStore/othersToStore'),
        }
      },
      {
        path: '/othersIntoStore',
        name: '其他入库单',
        components: {
          content: () => import('../views/home/storeManagement/othersStore/othersIntoStore'),
        }
      },
      {
        path: '/greigeCheck',
        name: '胚布检验配送',
        components: {
          content: () => import('../views/home/greigeCheck'),
        }
      },
      {
        path: '/workingArea',
        name: '暂存区库存查看',
        components: {
          content: () => import('../views/home/workingArea'),
        }
      },
      {
        path: '/zzWorkingArea',
        name: '织造暂存区库存查看',
        components: {
          content: () => import('../views/home/zzWorkingArea'),
        }
      },
      {
        path: '/warpingToStore',
        name: '整经领料出库',
        components: {
          content: () => import('../views/home/storeManagement/rawStore/warpingToStore'),
        }
      },
      {
        path: '/weavingToStore',
        name: '织造领料出库',
        components: {
          content: () => import('../views/home/storeManagement/rawStore/weavingToStore'),
        }
      },


    ]
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router