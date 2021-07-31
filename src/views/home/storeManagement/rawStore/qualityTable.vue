<template>
  <div class="box">
    <div class="search">
      <el-row>
        <el-col :span="12">
          <div class="div">
            <span class="span">检验方案：</span>
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
            <span class="span ls">检验数量：</span>
            <!-- <span class="ml">：</span> -->
            <el-input
              v-model="checkNum"
              placeholder="请输入检验数量"
              @blur="checkNumblur"
              @keyup.enter.native="checkNumblur"
              size="small"
            >
            </el-input></div
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="div">
            <span class="span">检验结果：</span>
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
        <el-col :span="12"> </el-col>
      </el-row>
      <el-row>
        <el-col :span="12"
          ><div class="div">
            <span class="span">合格数：</span>
            <!-- <span class="ml">：</span> -->
            <el-input
              v-model="qualifiedNum"
              placeholder="请输入合格数"
              @blur="qualifiedNumblur"
              @keyup.enter.native="qualifiedNumblur"
              size="small"
            >
            </el-input></div
        ></el-col>
        <el-col :span="12"
          ><div class="div">
            <span class="span ls">不合格数：</span>
            <!-- <span class="ml">：</span> -->
            <el-input
              v-model="unqualifiedNum"
              placeholder="请输入不合格数"
              @blur="unqualifiedNumblur"
              @keyup.enter.native="unqualifiedNumblur"
              size="small"
            >
            </el-input></div
        ></el-col>
      </el-row>
      <div class="cause">
        <el-col :span="6"> <span>不合格原因：</span></el-col>
        <el-col :span="18">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入不合格原因"
            v-model="reason"
            resize="none"
          >
          </el-input
        ></el-col>
      </div>
      <div class="cause">
        <el-col :span="6"> <span>整改方案：</span></el-col>
        <el-col :span="18">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="plan"
            resize="none"
          >
          </el-input
        ></el-col>
      </div>
      <!-- <div class="zj">
        <el-button type="primary" size="small" @click="add"
          >添加质检报告</el-button
        >
      </div> -->

      <!-- <div class="div">
        <span class="span ls">流水号</span>
        <span class="ml">：</span>
        <el-input
          v-model="store.waters"
          placeholder="请扫描流水号"
          @blur="lshBlur"
          @keyup.enter.native="lshBlur"
          ref="int"
        >
        </el-input>
      </div>
      <div class="div">
        <span class="span ls">仓库</span>
        <span class="ml">：</span>
        <el-select
          v-model="store.status"
          placeholder="请选择"
          @change="changeStatus(scope.row)"
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
        :data="lists"
        :row-class-name="getTabIndex"
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column prop="id" label="序号" width="55"> </el-table-column>
        <el-table-column prop="name" label="质检项目" width="80">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row[scope.column.property]"
              placeholder="请选择"
              @change="changeStatus(scope.row[scope.column.property])"
              size="small"
            >
              <el-option
                v-for="item in jg"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="目标值" width="70">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row[scope.column.property]"
              placeholder="请选择"
              @change="changeStatus(scope.row)"
              size="small"
            >
              <el-option
                v-for="item in zt"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="zt" width="80" label="检验结果">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row[scope.column.property]"
              placeholder="请选择"
              @change="changeStatus(scope.row)"
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
          </template>
        </el-table-column>
        <el-table-column prop="jg" width="80" label="检验方法">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row[scope.column.property]"
              placeholder="请选择"
              @change="changeStatus(scope.row)"
              size="small"
            >
              <el-option
                v-for="item in jg"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <!-- <el-table-column fixed="right" label="检验结果" width="60">
          <template slot-scope="scope">
            <el-button
              @click.native.stop.prevent="deleteRow(scope.$index, list)"
              type="text"
              size="small"
              style="width: 100%"
            >
              详情
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="btn">
        <el-col :span="11"
          ><el-button type="primary" size="small" @click="submit"
            >提交</el-button
          ></el-col
        >
        <el-col :span="11"
          ><el-button type="primary" size="small" @click="cancel"
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
      jg: [],
      zt: [],
      lists: [
        {
          id: 1,
          name: "小明",
          sex: "女",
          age: "单位",
          jg: [
            {
              value: 1,
              name: "已检验",
            },
            {
              value: 2,
              name: "未检验",
            },
          ],
          zt: [
            {
              value: 1,
              name: "合格",
            },
            {
              value: 2,
              name: "不合格",
            },
          ],
        },
        {
          id: 2,
          name: "小红",
          sex: "女",
          age: 18,
          jg: [
            {
              value: 1,
              name: "已检验",
            },
            {
              value: 2,
              name: "未检验",
            },
          ],
          zt: [
            {
              value: 1,
              name: "合格",
            },
            {
              value: 2,
              name: "不合格",
            },
          ],
        },
      ],
      // 检验数量
      checkNum: "",
      // 合格数量
      qualifiedNum: "",
      // 合格数量
      unqualifiedNum: "",
      // 不合格原因
      reason: "",
      // 整改方案
      plan: "",
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
      textarea: "",
    };
  },
  created() {
    this.store = this.$store.state.weaving;
    console.log(this.store);
    let data = storage.getLists();
    if (data.length > 0) {
      this.list = data;
    }
    this.lists.map((item, idex) => {
      console.log(item.jg);
      this.jg = item.jg;
      this.zt = item.zt;
    });
    console.log(this.jg);
  },
  components: {
    orCdeSingle,
  },
  methods: {
    changeStatus(val) {
      console.log(val);
    },
    // 检验数量失去焦点
    checkNumblur() {},
    // 合格数失去焦点
    qualifiedNumblur() {},
    // 不合格数失去焦点
    unqualifiedNumblur() {},
    // 添加质检报告
    cancel() {
      this.$router.push({
        path: "/purchaseQuality",
      });
    },
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
        // width: 67%;
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
    // width: 100%;
    // margin-top: 15px;
    // padding-bottom: 15px;
    // border-bottom: 5px solid #f5f5f5;
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
  .cause {
    margin-top: 20px;
    display: flex;
    span {
      font-size: 16px;
      white-space: nowrap;
    }
  }
  .zj {
    margin-top: 10px;
    margin-left: 10px;
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
<style lang="less">
.tab {
  .el-input__inner {
    padding: 0 0 0 5px;
  }
}
</style>
