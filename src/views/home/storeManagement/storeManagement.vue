<template>
  <div class="box">
    <div class="container">
      <div class="item" @click="toRawStore">
        <p>原料库</p>
      </div>
      <div class="item" @click="toWeavingStore">
        <p>经轴库</p>
      </div>
      <div class="item" @click="toBcpStore">
        <p>半成品库</p>
      </div>
      <div class="item" @click="toCpStore">
        <p>成品库</p>
      </div>
      <div class="item" @click="toOutsourceStore">
        <p>委外出入库</p>
      </div>
      <div class="item" @click="toOthersStore">
        <p>其他出入库</p>
      </div>
      <div class="item" @click="toOperation">
        <p>库内操作</p>
      </div>
      <div class="item" style="opacity: 0">
        <!-- <p>其他入库单</p> -->
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
    toRawStore() {
      this.$router.push({
        path: "rawStore",
      });
    },
    toWeavingStore() {
      this.$router.push({
        path: "weavingStore",
      });
    },
    toBcpStore() {
      this.$router.push({
        path: "bcp",
      });
    },
    toCpStore() {
      this.$router.push({
        path: "cpStore",
      });
    },
    toOutsourceStore() {
      this.$router.push({
        path: "outsourceStore",
      });
    },
    toOthersStore() {
      this.$router.push({
        path: "othersStore",
      });
    },
    toOperation() {
      this.$router.push({
        path: "operation",
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
