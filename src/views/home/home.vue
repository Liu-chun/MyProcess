<template>
  <div class="box">
    <div class="container">
      <div class="item" @click="$router.push('/storeManagement')">
        <p>仓库管理</p>
      </div>
      <div class="item" @click="$router.push('/Fiber')">
        <p>纤经管理</p>
      </div>
      <div class="item" @click="$router.push('/weaving')">
        <p>织造管理</p>
      </div>
      <div class="item" @click="$router.push('/hFinishing')">
        <p>后整理管理</p>
      </div>
      <div class="item" @click="$router.push('/equipment')">
        <p>设备管理</p>
      </div>
      <div class="item" @click="$router.push('/zhongHeIndex')">
        <p>综合查询</p>
      </div>
      <div class="item">
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
import storage from "../../api/storage";
export default {
  name: "home",
  data() {
    return {
      // 只显示当前
      qj: false,
      zz: false,
      zz01: false,
      bcp: false,
      cp: false,
      ck: false,
      sb: false,
      zh: false,
      yc: false,
    };
  },
  created() {
    // this.qj = storage.getUser().users.isMV_ProductionQJ;
    // this.zz = storage.getUser().users.isMV_ProductionZZ;
    // this.zz01 = storage.getUser().users.isMV_ProductionZZAudit;
  },
  methods: {},
};
</script>

<style scoped lang="less">
.box {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  .container {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    .item {
      width: 35%;
      height: 80px;
      margin-top: 10px;
      background-color: #f5f5f5;
      p {
        font-size: 18px;
        text-align: center;
        line-height: 80px;
      }
    }
    .item:last-child {
      background-color: #fff;
    }
  }
}
</style>
