<template>
  <div class="box">
    <div class="btns">
      <el-button type="primary" size="small" @click="$router.push('/plan')"
        >载入计划</el-button
      >
      <el-button
        type="primary"
        size="small"
        @click="$router.push('/inventoryFiber')"
      >
        原料库存
      </el-button>
      <el-button type="primary" size="small" @click="baocuo">保存</el-button>
      <el-button type="primary" size="small" @click="del">删除</el-button>
    </div>
    <div class="search">
      <div>
        <span>经轴卡号：</span>
        <el-input v-model="cardNumber"></el-input>
      </div>
      <div>
        <span>产品型号：</span>
        <el-input v-model="cpxinghao" @blur="cpFn"></el-input>
      </div>
      <div>
        <span>品名：</span>
        <el-input v-model="myObjs.warpAxisTypeName"> </el-input>
      </div>
      <div>
        <span>轴幅：</span>
        <el-input v-model="myObjs.axleWidth"> </el-input>
      </div>
      <div>
        <span>订单号：</span>
        <el-input v-model="myObjs.orderNo"> </el-input>
      </div>
      <div>
        <span>整经排列：</span>
        <el-input v-model="myObjs.warpArray"> </el-input>
      </div>
      <div class="div">
        <span class="span">状态：</span>
        <el-select v-model="status" placeholder="请选择">
          <el-option
            v-for="item in statusArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <span>经轴类型：</span>
        <el-input v-model="myObjs.warpAxisType"> </el-input>
      </div>
      <div>
        <span>总经（根）：</span>
        <el-input v-model="myObjs.totalBy"> </el-input>
      </div>
      <div>
        <span>边经（根）：</span>
        <el-input v-model="myObjs.sideBy"> </el-input>
      </div>
      <div>
        <span>整经长度（米）：</span>
        <el-input v-model="leng"> </el-input>
      </div>
      <div>
        <span>总匹数：</span>
        <el-input v-model="zNum"> </el-input>
      </div>
      <div>
        <span>机台：</span>
        <el-select v-model="jitai" placeholder="请选择">
          <el-option
            v-for="item in jitaiArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <span>人员：</span>
        <el-select v-model="name" placeholder="请选择">
          <el-option
            v-for="item in nameArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <span>备注：</span>
        <el-input v-model="myObjs.remark"> </el-input>
      </div>
    </div>
    <div class="tab">
      <span>原料信息：</span>
      <el-table :data="kcData" size="small" border style="width: 100%">
        <el-table-column prop="materialid" label="原料编码"> </el-table-column>
        <el-table-column prop="sequence" label="序号" width="51">
        </el-table-column>
        <el-table-column prop="stockroom" label="库位"> </el-table-column>
        <el-table-column prop="instock" label="现有"> </el-table-column>
        <el-table-column prop="requiremtrquantity" label="需要">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { api } from "../../api";
import { Notify } from "vant";

export default {
  name: "createFiber",
  data() {
    return {
      cardNumber: "",
      pname: "",
      // 状态
      status: -1,
      statusArr: [
        {
          value: -1,
          label: "全部",
        },
        {
          value: 0,
          label: "已落实待生产",
        },
        // {
        //   value: 1,
        //   label: '未落实'
        // },
        {
          value: 2,
          label: "生产中",
        },
        {
          value: 100,
          label: "已完工",
        },
      ],
      jzlx: "",
      cpxinghao: "",
      zong: "",
      bian: "",
      leng: "",
      zNum: "",
      beizhu: "",
      jitai: "",
      jitaiArr: [
        {
          value: "1",
          label: "机台1",
        },
        {
          value: "2",
          label: "机台2",
        },
      ],
      name: "",
      nameArr: [
        {
          value: "1",
          label: "管理员",
        },
        {
          value: "2",
          label: "李四",
        },
      ],
      kcData: [],
      myObjs: {},
    };
  },
  created() {
    this.kcData = this.$route.query.kcData || [];
    console.log(this.kcData);
  },
  methods: {
    // 删除
    del() {
      this.cardNumber = "";
      this.cpxinghao = "";
      this.myObjs = {};
      this.leng = "";
      this.status = "";
      this.zNum = "";
      this.jitai = "";
      this.name = "";
      this.kcData = [];
    },
    // 输入产品型号失去焦点
    cpFn() {
      let params = {
        code: this.cpxinghao,
      };
      api.Information(params).then((res) => {
        if (res.data.isSuccess) {
          this.myObjs = res.data.data;
        } else {
          return Notify({ type: "danger", message: res.data.message });
        }
      });
    },
    // 保存
    baocuo() {
      // 修改被操做数组
      if (this.kcData.length > 0) {
        this.kcData.map((item) => {
          item.remark = item.materialname;
          delete item.addDate;
          delete item.addName;
          delete item.companyID;
          delete item.id;
          delete item.materialname;
          delete item.productName;
          delete item.status;
          delete item.updateDate;
          delete item.updateName;
          delete item.usersID;
          delete item.addUsersID;
        });
      }
      let params = {
        // 人员暂无
        sideBy: this.myObjs.sideBy, // 边
        totalBy: this.myObjs.totalBy, //总
        warpDeviceID: this.jitai, // 机台
        remark: this.myObjs.remark, // 备注
        warpAxisType: this.myObjs.warpAxisType, // 经轴类型
        warpAxisTypeName: this.myObjs.warpAxisTypeName, // 品名
        beamCardNo: this.cardNumber, // 经轴卡号
        stateId: this.status, // 状态
        needNumber: this.leng, // 整经长度
        productrollNum: this.zNum, // 总匹数
        axleWidth: this.myObjs.axleWidth, // zhoufu
        orderNo: this.myObjs.orderNo, // 订单号
        warpArray: this.myObjs.warpArray, // 排列
        qjDetailList: this.kcData,
      };
      api.ProductionQJAddUpdate(params).then((res) => {
        console.log(res.data);
        if (res.data.isSuccess) {
          Notify({ type: "success", message: res.data.message });
          this.$router.push({
            path: "/fiber",
          });
        } else {
          Notify({ type: "danger", message: res.data.message });
          this.$router.push({
            path: "/fiber",
          });
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.box {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;

  .btns {
    display: flex;
    justify-content: space-around;
    border-bottom: 5px solid #f5f5f5;
    margin-top: 5px;
    padding-bottom: 5px;
  }
  .search {
    margin-top: 15px;
    div {
      margin-top: 5px;
      display: flex;
      align-items: center;
      span {
        width: 145px;
        margin-top: 5px;
        font-size: 18px;
      }
      .el-input,
      .el-select {
        width: 180px;
      }
    }
  }
  .tab {
    padding-bottom: 50px;
    span {
      font-size: 17px;
      line-height: 2em;
    }
  }
}
</style>
