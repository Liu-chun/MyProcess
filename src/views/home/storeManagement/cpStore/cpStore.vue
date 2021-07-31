<template>
  <div class="box">
    <div class="container">
      <div class="item" @click="tocp">
        <p>成品入库</p>
      </div>
      <div class="item" @click="tobcp">
        <p>成品出库</p>
      </div>
      <div class="item" @click="toProductionIntoStore">
        <p>生产入库</p>
      </div>
      <div class="item" @click="toSaleToStore">
        <p>销售出库</p>
      </div>
      <div class="item" @click="toSaleReturn">
        <p>销售退货入库</p>
      </div>
      <div class="item" style="opacity: 0">
        <p>销售退货入库</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "storeManagement",
  data() {
    return {};
  },
  created() {},
  methods: {
    tocp() {
      this.$router.push({
        path: "cpIntoStore",
      });
    },
    tobcp() {
      this.$router.push({
        path: "cpToStore",
      });
    },
    toProductionIntoStore() {
      this.$router.push({
        path: "productionIntoStore",
      });
    },
    toSaleToStore() {
      this.$router.push({
        path: "saleToStore",
      });
    },
    toSaleReturn() {
      this.$router.push({
        path: "saleReturn",
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
  .container {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    padding-bottom: 50px;
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
  }
}
</style>
