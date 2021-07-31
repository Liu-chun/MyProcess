<template>
  <div class="box">
    <div class="container">
      <div class="item" @click="tocp">
        <p>成品入库</p>
      </div>
      <div class="item" @click="tobcp">
        <p>成品出库</p>
      </div>
      <div class="item" @click="toPurchaseArrival">
        <p>采购到货单</p>
      </div>
      <div class="item" @click="toPurchaseQuality">
        <p>采购质检单</p>
      </div>
      <div class="item" @click="toOutsourceToStore">
        <p>委外出库单</p>
      </div>
      <div class="item" @click="toOutsourceArrival">
        <p>委外到货单</p>
      </div>
      <div class="item" @click="toOutsourceIntoStore">
        <p>委外入库单</p>
      </div>
      <div class="item" @click="toOutsourceRejection">
        <p>委外拒收单</p>
      </div>
      <div class="item" @click="toProductionIntoStore">
        <p>生产入库单</p>
      </div>
      <div class="item" @click="toProductionStock">
        <p>生产领料单</p>
      </div>
      <div class="item" @click="toProductionReturn">
        <p>生产退料单</p>
      </div>
      <div class="item" @click="toSaleToStore">
        <p>销售出库单</p>
      </div>
      <div class="item" @click="toSaleReturn">
        <p>销售退货单</p>
      </div>
      <div class="item" @click="toCheckTable">
        <p>盘点单</p>
      </div>
      <div class="item" @click="toTransferTable">
        <p>调拨单</p>
      </div>
      <div class="item" @click="toOthersToStore">
        <p>其他出库单</p>
      </div>
      <div class="item" @click="toOthersIntoStore">
        <p>其他入库单</p>
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
    toOutsourceToStore() {
      this.$router.push({
        path: "outsourceToStore",
      });
    },
    toOutsourceArrival() {
      this.$router.push({
        path: "outsourceArrival",
      });
    },
    toOutsourceIntoStore() {
      this.$router.push({
        path: "outsourceIntoStore",
      });
    },
    toOutsourceRejection() {
      this.$router.push({
        path: "outsourceRejection",
      });
    },
    toProductionIntoStore() {
      this.$router.push({
        path: "productionIntoStore",
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
    toCheckTable() {
      this.$router.push({
        path: "checkTable",
      });
    },
    toTransferTable() {
      this.$router.push({
        path: "transferTable",
      });
    },
    toOthersToStore() {
      this.$router.push({
        path: "othersToStore",
      });
    },
    toOthersIntoStore() {
      this.$router.push({
        path: "othersIntoStore",
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
    padding-bottom:50px ;
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
