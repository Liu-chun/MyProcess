<template>
  <div class="box">
    <div class="btns">
      <el-button type="primary" @click="$router.push('/workingArea')"
        >暂存区物料查看</el-button
      >
      <el-button type="primary" @click="$router.push('/zzWorkingArea')">织造缓存区物料查看</el-button>
      <el-button type="primary">缓存区物料紧急叫料</el-button>
    </div>
    <div class="serch">
      <span>半成品暂存区库位码：</span>
      <el-input v-model="input" placeholder="请输入内容">
        <template slot="append">
          <el-button type="defalut">扫码</el-button>
        </template>
      </el-input>
    </div>
    <div class="btn">
      <el-button type="primary">出库</el-button>
    </div>
  </div>
</template>

<script>
// import { api } from "../..api";

export default {
  name: "greigeCheck",
  data() {
    return {
      // 提报人
      tNameId: "",
      tNameArr: [],
      // 接收人
      jNameId: "",
      jNameArr: [],
      list: [],
      input: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="less">
.box {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  overflow: hidden;
  .serch {
    display: flex;
    align-items: center;
    white-space: nowrap;
    span {
      font-size: 14px;
    }
  }
  .btn {
    float: right;
    margin-top: 8px;

  }
  .tab {
    margin-top: 8px;
  }
  .btns {
    display: flex;
    justify-content: space-between;
    padding-bottom: 55px;
    .el-button {
      width: 30%;
      //   margin-left: 10%;
      margin-top: 8px;
      white-space: normal;
      padding: 5px 10px;
    }
  }
}
</style>
