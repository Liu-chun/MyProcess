<template>
  <div class="box">
    <div class="tab">
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="date" label="库位" width="55"> </el-table-column>
        <el-table-column prop="name" label="订单号" width="65"> </el-table-column>
        <el-table-column prop="address" label="产品型号"> </el-table-column>
        <el-table-column prop="address" label="缸号" width="55"> </el-table-column>
        <el-table-column prop="address" label="入库顺序"> </el-table-column>
      </el-table>
    </div>
    <div class="btn">
      <el-button type="primary" @click="$router.push('/greigeCheck')">返回</el-button>
    </div>
  </div>
</template>

<script>
import { api } from "../../api";

export default {
  name: "bcpSc",
  data() {
    return {
      // 经轴号
      cardId: "",
      cardArr: [],
      // 纤经工
      nameId: "",
      nameArr: [],
      list: [],
    };
  },
  created() {
    // this.getList();
    // this.getName();
    // this.getCard();
  },
  methods: {
    // getList() {},
    // getCard() {},
    // getName() {
    //   api.GetQJUsers().then((res) => {
    //     this.nameArr = res.data;
    //   });
    // },
    // changeCard() {
    //   this.getList();
    // },
    // changeName() {
    //   this.getList();
    // },
    // tobcp() {
    //   this.$router.push({
    //     path: "/bcpBiao",
    //   });
    // },
  },
};
</script>

<style scoped lang="less">
.box {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  .search {
    width: 100%;
    margin-top: 15px;
    padding-bottom: 5px;
    border-bottom: 5px solid #f5f5f5;
    .div {
      margin-top: 5px;
      .span {
        margin-top: 5px;
        font-size: 18px;
      }
    }
  }
  .tab {
    margin-top: 8px;
  }
  .btn {
    padding-bottom: 55px;
    .el-button {
      width: 80%;
      margin-left: 10%;
      margin-top: 8px;
    }
  }
}
</style>
