<template>
  <div class="box">
    <div class="search">
      <el-row>
        <el-col :span="12">
          <div class="div">
            <span class="span">仓管员：</span>
            <el-select
              v-model="store.status"
              placeholder="请选择"
              @change="changeStatus(store.status)"
              size="small"
            >
              <el-option
                v-for="item in store.statusArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="12"
          ><div class="div">
            <span class="span ls">单据日期：</span>
            <!-- <span class="ml">：</span> -->
            <el-input
              v-model="dataTime"
              placeholder="请输入单据日期"
              @blur="dataTimeblur"
              @keyup.enter.native="dataTimeblur"
              ref="storeLocation"
              size="small"
            >
            </el-input></div
        ></el-col>
      </el-row>
    </div>
    <div class="ma">
      <el-row>
        <el-col :span="8">
          <span class="span">缓存区库位码：</span>
        </el-col>
        <el-col :span="16">
          <el-input v-model="storagema" placeholder="请输入内容" size="small">
            <template slot="append">
              <el-button type="primary" size="small">扫码</el-button>
            </template>
          </el-input>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="12">
          <span class="span">扫物料条码：</span>
        </el-col>
        <el-col :span="12">
          <img
            src="../../../assets/img/u=38465792,2341625406&fm=26&gp=0.jpg"
            alt=""
          />
        </el-col>
      </el-row> -->
    </div>
    <div class="tab">
      <el-table
        border
        @selection-change="handleSelectionChange"
        ref="multipleTable"
        :data="list"
        :row-class-name="getTabIndex"
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column prop="BATCHNO" label="序号" width="70">
        </el-table-column>
        <el-table-column prop="MATERIALID" label="品名" width="80">
        </el-table-column>
        <el-table-column prop="BATCHNO" label="数量" width="70">
        </el-table-column>
        <el-table-column prop="QUANTITY" width="70" label="单位">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="60">
          <template slot-scope="scope">
            <el-button
              @click.native.stop.prevent="toDetail(scope.row, list)"
              type="text"
              size="small"
              style="width: 100%"
            >
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn">
        <el-col :span="11"
          ><el-button type="primary" size="small" @click="submit"
            >保存</el-button
          ></el-col
        >
        <el-col :span="11"
          ><el-button
            type="primary"
            size="small"
            @click="$router.push('/operation')"
            >取消</el-button
          ></el-col
        >
      </div>
    </div>
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
      // 单据日期
      dataTime: "",
      // 操作员
      operator: "",
      // 用户
      user: localStorage.getUser(),
      // 选中
      selection: [],
      // 库位码
      storagema: "",
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
    // 单据日期失去焦点
    dataTimeblur() {},
    // 操作员失去焦点
    operatorblur() {},
    changeStatus() {},
    // 去详情
    toDetail(row) {
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
      display: flex;
      align-items: center;
      margin-top: 5px;
      span {
        font-size: 16px;
      }
      .span {
        margin-top: 5px;
        // width: 65%;
        white-space: nowrap;
      }
      .ls {
        margin-left: 5px;
      }
      //   .ls {
      //     letter-spacing: 3px;
      //   }
      //   .ml {
      //     margin-left: -35px;
      //   }
      //   .el-input,
      //   .el-select {
      //     width: 250px;
      //   }
    }
  }
  .ma {
    width: 100%;
    margin-top: 15px;
    padding-bottom: 15px;
    border-bottom: 5px solid #f5f5f5;
    .el-row {
      display: flex;
      align-items: center;
      margin-top: 10px;
      img {
        width: 100px;
        height: 40px;
      }
    }
    .span {
      font-size: 16px;
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
      display: flex;
      justify-content: space-around;
      //   float: right;
      margin-top: 30px;
      //   margin-right: 30px;
      padding-bottom: 50px;
      button {
        width: 100%;
      }
    }
  }
}
</style>
