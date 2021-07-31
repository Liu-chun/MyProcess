<template>
  <div class="box">
    <!-- <div class="btns"> -->
      <!--      <el-button type="primary" @click="$router.push('/createFiber')">创建</el-button>-->

      <!-- <el-button type="primary" @click="workOrder">工单调整</el-button> -->
      <!-- <el-button type="primary" @click="kaigong">开工</el-button> -->
      <!--      <el-button type="primary" @click="$router.push('/move')">挪料</el-button>-->
      <!-- <el-button type="primary" @click="tofiberOk">报工</el-button> -->
      <!-- <el-button type="primary" @click="tofiberYc">报异常</el-button> -->
    <!-- </div> -->
    <div class="search">
      <div class="div">
        <span class="span ls">库位</span>
        <span class="ml">：</span>
        <el-input
          v-model="storeLocation.kw"
          placeholder="请扫描库位"
          @blur="storeblur"
          @keyup.enter.native="storeblur"
          ref="storeLocation"
        >
          <template slot="append" class="temBtn">
            <el-button type="primary" @click="getStore"> 确定 </el-button>
          </template>
        </el-input>
      </div>
      <div class="div">
        <span class="span ls">流水号</span>
        <span class="ml">：</span>
        <el-input
          v-model="store.waters"
          placeholder="请扫描流水号"
          @blur="lshBlur"
          @keyup.enter.native="lshBlur"
          ref="int"
        >
          <template slot="append" class="temBtn">
            <el-button type="primary" @click="getlsh"> 确定 </el-button>
          </template>
        </el-input>
      </div>
      <!-- <div class="div">
        <span class="span ls">仓库</span>
        <span class="ml">：</span>
        <el-select
          v-model="store.status"
          placeholder="请选择"
          @change="changeStatus(store.status)"
        >
          <el-option
            v-for="item in store.statusArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div> -->
    </div>
    <div class="tab">
      <el-table
        border
        @row-click="handleRow"
        @selection-change="handleSelectionChange"
        ref="multipleTable"
        :data="list"
        :row-class-name="getTabIndex"
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column type="selection" width="40"> </el-table-column>
        <el-table-column prop="BATCHNO" label="流水号"> </el-table-column>
        <el-table-column prop="MATERIALID" label="产品型号"> </el-table-column>
        <el-table-column prop="QUANTITY" width="60" label="净米">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="60">
          <template slot-scope="scope">
            <el-button
              @click.native.stop.prevent="deleteRow(scope.$index, list)"
              type="text"
              size="small"
              style="width: 100%"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn" v-if="list.length > 0">
        <el-button type="primary" size="small" @click="submit">提交</el-button>
      </div>
    </div>

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
        @multipleOR="multipleOR"
        @endOrcodeWindow="endOrcodeWindow"
        @layerEnd="layerEnd"
      ></orCdeSingle>
    </van-popup>
  </div>
</template>

<script>
import orCdeSingle from "../../../../components/orCode/orCodePD";
import { api } from "../../../../api";
import storage from "../../../../api/storage";
import localStorage from "../../../../api/localStorage";
import { Notify } from "vant";
export default {
  name: "cpIntoStore",
  data() {
    return {
      // 关于扫码
      orCodeValStatic: false,
      locationLayer: true,
      orCodeType: "",
      orCodeStaticVal: -1,
      // 数据
      list: [],
      // 暂时未知
      currentRow: "",
      // 单选框对应当前行数据
      operation: {},
      selectedIndex: this.$route.query.row,
      // 搜索条件在 vuex
      store: {},
      // 库位
      storeLocation: {
        WarehouseId: null,
        StorageId: null,
        kw: null,
      },
      // 用户
      user: localStorage.getUser(),
      // 选中
      selection: [],
    };
  },
  created() {
    this.store = this.$store.state.weaving;
    console.log(this.store);
    let data = storage.getLists();
    if (data.length > 0) {
      this.list = data;
    }
  },
  components: {
    orCdeSingle,
  },
  methods: {
    // 获取列表

    // 移除
    deleteRow(index, rows) {
      if (!this.operation.hasOwnProperty("BATCHNO")) {
        return Notify({ type: "danger", message: "请选择要操作的数据" });
      }
      console.log(index, rows);

      if (index >= 0) {
        rows.splice(index, 1);
      }
    },

    // 库位失去焦点
    storeblur() {
      let params = {
        Page: 1,
        PageSize: 20,
        Entity: this.storeLocation.kw,
      };
      api.getstorageinfo(this.$qs.stringify(params)).then((res) => {
        console.log(res);
        let data = res.data.Entities;
        if (res.data.Success === false) {
          return Notify({ type: "danger", message: res.data.Message });
        } else {
          this.storeLocation = {
            WarehouseId: data[0].WAREHOUSEID,
            StorageId: data[0].STORAGEID,
          };
          this.store.waters = "";
        }
      });
    },
    // 流水号失去焦点
    lshBlur() {
      this.$refs.int.blur();
      let params = {
        Page: 1,
        PageSize: 20,
        Entity: this.store.waters,
      };
      if (this.store.waters !== "") {
        api.getproductstockindata(this.$qs.stringify(params)).then((res) => {
          console.log(res.data);
          let data = res.data.Entities;
          if (res.data.Success === false) {
            return Notify({ type: "danger", message: res.data.Message });
          } else {
            console.log(this.storeLocation.WAREHOUSEID);
            this.list.push({
              BATCHNO: data[0].BATCHNO,
              CIMI: data[0].CIMI,
              MAOMI: data[0].MAOMI,
              MATERIALID: data[0].MATERIALID,
              QUANTITY: data[0].QUANTITY,
              RESERVEDNO1: data[0].RESERVEDNO1,
              SUBBATCHNO: data[0].SUBBATCHNO,
              WAREHOUSEID: this.storeLocation.WarehouseId,
              STORAGEID: this.storeLocation.StorageId,
            });
            storage.saveLists(this.list);
          }
        });
      }
      this.store.waters = "";
    },
    // 经轴卡号失去焦点
    // 去详情
    handleRow(row) {
      this.$router.push({
        path: "/cpIntoStoreDetail",
        query: {
          pObjs: row,
        },
      });
    },
    // 全选
    handleSelectionChange(val) {
      this.selection = val;
    },
    // 工单调整
    
    // 提交
    submit() {
      if (!this.selection.length > 0) {
        return Notify({ type: "danger", message: "请选择要操作的数据" });
      }
      let StkProductStockInDetails = [];
      console.log(this.selection);
      this.selection.map((item, index) => {
        if (item.WAREHOUSEID === null) {
          item.WAREHOUSEID = "002";
        }
        StkProductStockInDetails.push({
          Row_Id: index + 1,
          RESERVEDNO1: item.RESERVEDNO1,
          WarehouseId: item.WAREHOUSEID,
          StorageId: item.STORAGEID,
          BatchNo: item.BATCHNO,
          MaterialId: item.MATERIALID,
          SUBBATCHNO: item.SUBBATCHNO,
          Quantity: item.QUANTITY,
        });
      });
      let params = {
        PersonId: this.user.PersonId,
        CreatorId: this.user.PersonId,
        StkProductStockInDetails: [...StkProductStockInDetails],
      };
      console.log(params);
      api.addstkproductstockin(this.$qs.stringify(params)).then((res) => {
        console.log(res);
        if (res.data.Success === false) {
          return Notify({ type: "danger", message: res.data.Message });
        } else {
          this.list = [];
          storage.removeLists();
          return Notify({ type: "success", message: res.data.Message });
        }
      });
    },
    // 异常
    

    // 扫码获取设备
    getlsh() {
      this.orCodeType = "DC";
      this.orCodeStaticVal = 2;
      this.orCodeValStatic = true;
    },
    //
    getStore() {
      this.orCodeType = "YC";
      this.orCodeStaticVal = 2;
      this.orCodeValStatic = true;
    },
    // 扫码获取经轴卡

    // 扫码
    onceOR(data) {
      console.log(data);
      // this.store.sbInput = data;
      this.storeLocation.kw = data;
      this.store.waters = "";
      // this.$store.commit("fiberUpdataSbInput", data);
      this.lshBlur();
    },
    // 扫码成功执行函数
    multipleOR(data) {
      this.store.waters = data;
      // this.$store.commit("fiberUpdataCardNum", data);
      this.lshBlur();
    },
    // 扫码条件
    endOrcodeWindow() {
      this.orCodeStaticVal = 1;
      this.orCodeValStatic = false;
    },
    layerEnd() {
      this.locationLayer = false;
    },
    // 设置index
    getTabIndex({ row, rowIndex }) {
      row.index = rowIndex;
    },
    // 点击行 row 当前行数据
  },
};
</script>

<style scoped lang="less">
.van-popup--right {
  width: 100%;
  height: 100%;
  background-color: transparent;
}
.box {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  .btns {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 5px;
    border-bottom: 5px solid #f5f5f5;
    .el-button {
      width: 110px;
      margin: 5px 5px 0 0;
    }
  }
  .search {
    width: 100%;
    margin-top: 15px;
    padding-bottom: 15px;
    border-bottom: 5px solid #f5f5f5;
    .div {
      margin-top: 5px;
      span {
        font-size: 18px;
      }
      .span {
        margin-top: 5px;
      }
      //   .ls {
      //     letter-spacing: 3px;
      //   }
      //   .ml {
      //     margin-left: -35px;
      //   }
      .el-input,
      .el-select {
        width: 250px;
      }
    }
  }
  .tab {
    // padding-bottom: 50px;
    .el-table {
      margin-top: 8px;
      .el-button--text {
        color: #ff6700;
      }
    }
    .btn {
      float: right;
      margin-top: 30px;
      margin-right: 30px;
      padding-bottom: 50px;
    }
  }
}
</style>
