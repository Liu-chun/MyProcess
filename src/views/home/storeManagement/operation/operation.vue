<template>
  <div class="box">
    <div class="container">
      <div class="item" @click="toCheckTable">
        <p>盘点单</p>
      </div>
      <div class="item" @click="toTransferTable">
        <p>调拨单</p>
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
