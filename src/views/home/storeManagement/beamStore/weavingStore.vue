<template>
  <div class="box">
    <div class="btns">
      <el-button type="primary" @click="mToStore" size="small"
        >满轴入库</el-button
      >
      <el-button type="primary" @click="kIntoStore" size="small"
        >空轴出库</el-button
      >
      <el-button type="primary" @click="mIntoStore" size="small"
        >满轴出库</el-button
      >
      <el-button type="primary" @click="kToStore" size="small"
        >空轴入库</el-button
      >
    </div>
    <div class="search">
      <div>
        <span class="span ls">经轴</span>
        <span class="ml">：</span>
        <el-input v-model="store.sbInput" @blur="sbBlur">
          <template slot="append" class="temBtn">
            <el-button type="primary" @click="getsb"> 扫码 </el-button>
          </template>
        </el-input>
      </div>
      <div>
        <span>任务号：</span>
        <el-input v-model="store.cardNumber" @blur="renWu">
          <template slot="append" class="temBtn">
            <el-button type="primary" @click="getrws"> 扫码 </el-button>
          </template>
        </el-input>
      </div>
    </div>
    <!-- 数据 -->
    <div class="data">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">经轴号：</div>
        </el-col>
        <el-col :span="16"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">产品型号：</div>
        </el-col>
        <el-col :span="16"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">订单号：</div>
        </el-col>
        <el-col :span="16"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">整经长度：</div>
        </el-col>
        <el-col :span="16"
          ><div class="grid-content bg-purple-light"></div
        ></el-col>
      </el-row>
    </div>
    <div class="img">
      <img src="../../../../assets/img/1.png" alt="">
    </div>
    <!--    扫码-->
    <van-popup
      v-model="orCodeValStatic"
      position="right"
      :overlay="locationLayer"
      :class="locationLayer ? 'orBgcPop' : ''"
    >
      <orCdeSingle
        :orType="orCodeType"
        :orCodeStatic="orCodeStaticVal"
        @onceOR="onceOR"
        @twoOR="twoOR"
        @multipleOR="multipleOR"
        @endOrcodeWindow="endOrcodeWindow"
        @layerEnd="layerEnd"
      ></orCdeSingle>
    </van-popup>
    <!--    暂停弹框-->
  </div>
</template>

<script>
import orCdeSingle from "../../../../components/orCode/orCodePD";
import { api } from "../../../../api";
import storage from "../../../../api/storage";
import { Notify } from "vant";

export default {
  name: "weavingStore",
  components: {
    orCdeSingle,
  },
  data() {
    return {
      // 带有流水号禁用上面按钮
      isD: false,
      dialogVisible: false,
      qita: "",
      // 关于扫码
      orCodeValStatic: false,
      locationLayer: true,
      orCodeType: "",
      orCodeStaticVal: -1,
      // 数据
      list: [],
      lists: [],
      // 暂时未知
      currentRow: "",
    };
  },
  // serialNum 流水号 带流水号的id 变成 ids
  created() {
    this.store = this.$store.state.weaving;
    // window.addEventListener('resize', this.resizeChart)
  },
  mounted() {
    if (this.store.waters.length > 0) {
      this.getLists();
    } else {
      this.getList();
    }
  },
  methods: {
    // 满轴入库
    mToStore() {},
    // 空轴出库
    kIntoStore() {},
    // 满轴出库
    mIntoStore() {},
    // 空轴入库
    kToStore() {},
    // 获取列表 (设备，状态)
    getList() {
      this.isD = false;
      let params = {
        hadUser: true,
        hadNumber: true,
        deviceID: this.store.sbInput,
        status: this.store.status,
        orderID: this.store.cardNumber,
      };
      api.GetProductionList(params).then((res) => {
        console.log(res.data);
        if (!res.data.isSuccess) {
          return Notify({ type: "danger", message: res.data.message });
        } else {
          this.list = res.data.data;
          this.lists = [];
        }
      });
    },
    // 获取列表 (任务书，流水)
    getLists() {
      // this.isD = true
      let params = {
        orderID: this.store.cardNumber, // 210124016 this.store.cardNumber
        orderNO: this.store.waters,
      };
      api.GetProductionList3(params).then((res) => {
        this.lists = res.data.data.productionZZSerials;
        this.lists.map((item) => {
          item.warpaxistypename = res.data.data.productionZZ.productName;
          item.orderNo = res.data.data.productionZZ.orderNo;
          item.btotalwarpnum = res.data.data.productionZZ.btotalwarpnum;
          item.sidewarpnum = res.data.data.productionZZ.sidewarpnum;
          item.planedquantity = res.data.data.productionZZ.planedquantity;
          item.productrollnum = res.data.data.productionZZ.productrollnum;
          item.stateId = res.data.data.productionZZ.stateId;
          item.ids = res.data.data.productionZZ.id;
        });
        this.list = [];
        console.log(this.lists);
      });
    },
    // 设备失去焦点
    sbBlur() {
      // this.store.cardNumber = ''
      this.store.waters = "";
      this.getList();
    },
    // 任务书号失去焦点
    renWu() {
      if (this.store.cardNumber.length > 0) {
        // this.store.sbInput = ''
        this.store.waters = "";
        this.getList();
        // this.getLists()
      }
    },
    // 扫码获取设备
    getsb() {
      this.orCodeType = "YC";
      this.locationLayer = true;
      this.orCodeStaticVal = 2;
      this.orCodeValStatic = true;
    },
    // 扫码获取任务书
    getrws() {
      this.orCodeType = "BC";
      this.locationLayer = true;
      this.orCodeStaticVal = 2;
      this.orCodeValStatic = true;
    },
    // 扫码获取流水号
    // getlsh() {
    //   this.orCodeType = "DC";
    //   this.orCodeStaticVal = 2;
    //   this.orCodeValStatic = true;
    // },
    // 多选变单选

    // 关于扫码
    onceOR(data) {
      this.store.sbInput = data;
      // this.store.cardNumber = ''
      this.store.waters = "";
      this.getList();
    },
    twoOR(data) {
      this.store.cardNumber = data;
      // this.store.sbInput = ''
      this.getList();
    },
    multipleOR(data) {
      this.store.waters = data;
      // this.store.sbInput = ''
      // this.getLists()
    },
    endOrcodeWindow() {
      this.orCodeStaticVal = 1;
      this.orCodeValStatic = false;
    },
    layerEnd() {
      this.locationLayer = false;
    },
  },
};
</script>

<style scoped lang="less">
.van-popup--right {
  width: 100%;
  height: 100%;
  background-color: transparent;
}
.temBtn {
  width: 0 !important;
  background-color: dodgerblue;
}

.box {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  padding-bottom: 50px;
  .data {
    background-color: #f5f5f5;
    font-size: 16px;
    line-height: 2em;
  }
  .img{
    // width: 100%;
    margin-block: 20px;
    img{
      width: 100%;
    }
  }
  // ul {
  //   li {
  //     font-size: 16px;
  //     //   line-height: 2em;
  //     border-bottom: 1px solid #f5f5f5;
  //     padding: 5px 0;
  //   }
  // }
  .btns {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 5px;
    border-bottom: 5px solid #f5f5f5;
    .el-button {
      /*width: 60px;*/
      margin: 5px 5px 0 0;
    }
  }
  .search {
    margin-top: 15px;
    padding-bottom: 5px;
    border-bottom: 5px solid #f5f5f5;
    div {
      margin-top: 5px;
      span {
        font-size: 18px;
      }
      .span {
        margin-top: 5px;
      }
      .ls {
        letter-spacing: 9px;
      }
      .ls3 {
        letter-spacing: 8px;
      }
      .ml3 {
        margin-left: -8px;
      }
      // .ml {
      //   // margin-left: -35px;
      // }
      .el-input,
      .el-select {
        width: 250px;
      }
    }
  }
  .tab {
    padding-bottom: 50px;
    .el-table {
      margin-top: 8px;
    }
  }
  .loading {
    margin-top: 15px;
    display: flex;
  }
}
</style>
