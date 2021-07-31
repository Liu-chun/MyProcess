<template>
  <div class="box">
    <div class="container">
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
