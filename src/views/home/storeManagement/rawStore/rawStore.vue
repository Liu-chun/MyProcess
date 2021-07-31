<template>
  <div class="box">
    <div class="container">
      <div class="item" @click="toPurchaseIntoStore">
        <p>采购入库</p>
      </div>
      <div class="item" @click="toPurchaseArrival">
        <p>采购到货单</p>
      </div>
      <div class="item" @click="toPurchaseQuality">
        <p>采购质检单</p>
      </div>
      <!-- <div class="item" @click="toProductionStock">
        <p>生产领料出库</p>
      </div> -->
      <div class="item" @click="toProductionReturn">
        <p>生产退料入库</p>
      </div>
      <div class="item" @click="toWarpingToStore">
        <p>整经领料出库</p>
      </div>
      <div class="item" @click="toWeavingToStore">
        <p>织造领料出库</p>
      </div>
      <div class="item" style="opacity: 0">
        <p>生产退料入库</p>
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
    toPurchaseIntoStore() {
      this.$router.push({
        path: "purchaseIntoStore",
      });
    },
    toPurchaseArrival() {
      this.$router.push({
        path: "purchaseArrival",
      });
    },
    toPurchaseQuality() {
      this.$router.push({
        path: "purchaseQuality",
      });
    },
    toProductionStock() {
      this.$router.push({
        path: "productionStock",
      });
    },
    toProductionReturn() {
      this.$router.push({
        path: "productionReturn",
      });
    },
    toWarpingToStore() {
      this.$router.push({
        path: "warpingToStore",
      });
    },
    toWeavingToStore() {
      this.$router.push({
        path: "weavingToStore",
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
