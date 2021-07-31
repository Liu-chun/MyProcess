<template>
  <div class="scan">
    <div class="closeBtnBox clearfix">
      <div class="titleCharacters">
        <span>正在扫码</span>
      </div>
      <i class="iconfont icon-fanhui left" @click="endWindowOR()"></i>
      <span class="right" @click="endWindowOR()">关闭</span>
    </div>
    <div id="bcid">
      <div style="height: 100%; width: 100%"></div>
    </div>
  </div>
</template>

<script>
import { Toast, Notify } from "vant";

let scan = null;

export default {
  name: "orcodeDEMO",
  props: ["orCodeStatic", "orType"],
  data() {
    return {};
  },
  created() {},
  computed: {
    navSkipMsg() {
      return this.$store.state.navSkipMsg;
    },
  },
  watch: {
    orCodeStatic(newVal, oldVal) {
      if (newVal !== 1) {
        this.startRecognize();
        if (window.history && window.history.pushState) {
          history.pushState(null, null, document.URL);
          window.addEventListener("popstate", this.goBack, false);
        }
      }
    },
  },
  methods: {
    endWindowOR() {
      this.closeScan();
      this.$emit("endOrcodeWindow");
    },
    //
    onmarked(type, result) {
      console.log("扫码类型前奏");
      switch (type) {
        case plus.barcode.QR:
          type = "QR";
          break;
        case plus.barcode.EAN13:
          type = "EAN13";
          break;
        case plus.barcode.EAN8:
          type = "EAN8";
          break;
        default:
          type = "其它" + type;
          break;
      }
      Notify({ type: "success", message: "扫描成功" });
      this.$emit("layerEnd");
      if (this.orType === "YC") {
        console.log("单次");
        this.$emit("onceOR", result);
      }
      if (this.orType === "BC") {
        console.log("单次");
        this.$emit("twoOR", result);
      }
      if (this.orType === "DC") {
        console.log("多次");
        this.$emit("multipleOR", result);
      }
      setTimeout(() => {
        console.log("扫码关闭弹窗定时器");
        this.$emit("endOrcodeWindow");
      }, 1000);
      this.closeScan();
    },
    //创建扫描控件
    startRecognize() {
      console.log("进入 - 创建扫描控件");
      let that = this;
      if (!window.plus) {
        console.log("不支持扫描");
        Notify({ type: "danger", message: "不支持扫描" });
        this.$emit("layerEnd");
        setTimeout(() => {
          this.$emit("endOrcodeWindow");
        }, 500);
        return;
      }
      scan = new plus.barcode.Barcode("bcid");
      this.startScan();
      scan.onmarked = this.onmarked;
    },
    //开始扫描
    startScan() {
      console.log("开始扫描");
      if (!window.plus) return;
      scan.start();
      console.log("开始扫描scan.start()");
    },
    //关闭扫描
    cancelScan() {
      console.log("关闭扫描");
      if (!window.plus) return;
      scan.cancel();
    },
    //关闭条码识别控件
    closeScan() {
      console.log("关闭条码识别控件");
      if (!window.plus) return;
      scan.close();
    },
    // 监听手机物理返回按键
    goBack() {
      console.log("监听手机物理返回按键 - 盘点扫码");
      this.closeScan();
      this.$emit("endOrcodeWindow");
    },
  },
  mounted() {
    this.startRecognize();
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },
};
</script>

<style scoped lang="less">
.scan {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  .closeBtnBox {
    height: 5%;
    background-color: rgb(240, 77, 48);
    .titleCharacters {
      display: inline-block;
      margin-left: 30%;
      margin-top: 0.05rem;
      span {
        color: rgb(89, 219, 202);
      }
    }
    i {
      font-size: 0.35rem;
      color: #fff;
      margin-top: 0.02rem;
    }
    span {
      font-size: 0.17rem;
      color: #fff;
      margin: 0.05rem 0.1rem;
    }
  }
  #bcid {
    width: 100%;
    height: 95%;
    position: absolute;
    left: 0;
    right: 0;
    top: 5%;
    bottom: 1.5rem;
    text-align: center;
    color: #fff;
  }
}
</style>
