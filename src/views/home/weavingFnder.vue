<template>
  <div class="box">
    <div class="top">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">推送人：</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light"></div
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">推送消息内容：</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light"></div
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">是否处理：</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light"></div
        ></el-col>
      </el-row>
    </div>
    <div class="search">
      <span>任务书号：</span>
      <el-input v-model="store.cardNumber" @blur="renWu">
        <template slot="append" class="temBtn">
          <el-button type="primary" @click="getrws"> 扫码 </el-button>
        </template>
      </el-input>
    </div>
    <div class="btns">
      <el-button type="primary" @click="fenderOk">对样成功</el-button>
      <el-button type="primary" @click="fenderFail">对样失败</el-button>
      <el-button type="primary" @click="back">返回</el-button>
    </div>
    <div class="cause">
      <el-col :span="6"> <span>失败原因：</span></el-col>
      <el-col :span="18">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea"
          resize="none"
        >
        </el-input
      ></el-col>
    </div>
    <div class="cause">
      <el-col :span="6"> <span>缸号：</span></el-col>
      <el-col :span="18">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea"
          resize="none"
        >
        </el-input
      ></el-col>
    </div>
    <div class="cause">
      <el-col :span="6"> <span>该缸号至第几匹：</span></el-col>
      <el-col :span="18">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea"
          resize="none"
        >
        </el-input
      ></el-col>
    </div>
    <!--    扫码-->
    <van-popup
      v-model="orCodeValStatic"
      position="right"
      :overlay="locationLayer"
      :class="locationLayer ? 'orBgcPop' : ''"
    >
      <orCdeSingle
        :orType="orCodeType"
        :orCodeStatic="orCodeStaticVal"
        @onceOR="onceOR"
        @twoOR="twoOR"
        @multipleOR="multipleOR"
        @endOrcodeWindow="endOrcodeWindow"
        @layerEnd="layerEnd"
      ></orCdeSingle>
    </van-popup>
  </div>
</template>
<script>
import orCdeSingle from "../../components/orCode/orCodePD";
import { Notify } from "vant";
import { api } from "../../api";
export default {
  name: "weavingFnder",
  components: {
    orCdeSingle,
  },
  data() {
    return {
      // 关于扫码
      orCodeValStatic: false,
      locationLayer: true,
      orCodeType: "",
      orCodeStaticVal: -1,
      store: {},
    };
  },
  created() {
    this.store = this.$store.state.weaving;
  },
  methods: {
    //   对样成功
    fednerOk() {},
    //   对样失败
    fednerFail() {},
    //   对样成功
    back() {
      this.$router.go(-1);
    },
    // 任务书号失去焦点
    renWu() {
      if (this.store.cardNumber.length > 0) {
        // this.store.sbInput = ''
        this.store.waters = "";
        this.getList();
        // this.getLists()
      }
    },
    getrws() {
      this.orCodeType = "BC";
      this.locationLayer = true;
      this.orCodeStaticVal = 2;
      this.orCodeValStatic = true;
    },
    // 关于扫码
    onceOR(data) {
      this.store.sbInput = data;
      // this.store.cardNumber = ''
      this.store.waters = "";
      this.getList();
    },
    twoOR(data) {
      this.store.cardNumber = data;
      // this.store.sbInput = ''
      this.getList();
    },
    multipleOR(data) {
      this.store.waters = data;
      // this.store.sbInput = ''
      // this.getLists()
    },
    endOrcodeWindow() {
      this.orCodeStaticVal = 1;
      this.orCodeValStatic = false;
    },
    layerEnd() {
      this.locationLayer = false;
    },
  },
};
</script>
<style lang="less" scoped>
.van-popup--right {
  width: 100%;
  height: 100%;
  background-color: transparent;
}
.temBtn {
  width: 0 !important;
  background-color: dodgerblue;
}
.box {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  overflow: hidden;
  .top {
    margin: 10px 0;
    background-color: #f5f5f5;
  }
  .grid-content {
    font-size: 16px;
    line-height: 2em;
    // border-bottom: 1px solid #f5f5f5;
  }
  .btns {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-bottom: 5px;
    // border-bottom: 5px solid #f5f5f5;
    .el-button {
      /*width: 60px;*/
      margin: 5px 5px 0 0;
    }
  }
  .cause {
    margin-top: 20px;
    display: flex;
    span {
      font-size: 16px;
      // white-space: nowrap;
    }
  }
  .search {
    margin-top: 15px;
    padding-bottom: 5px;
    // border-bottom: 5px solid #f5f5f5;

    span {
      font-size: 18px;
    }
    .span {
      margin-top: 5px;
    }
    .ls {
      letter-spacing: 35px;
    }
    .ls3 {
      letter-spacing: 8px;
    }
    .ml3 {
      margin-left: -8px;
    }
    .ml {
      margin-left: -35px;
    }
    .el-input,
    .el-select {
      width: 250px;
    }
  }
  .tab {
    padding-bottom: 50px;
    .el-table {
      margin-top: 8px;
    }
  }
  .loading {
    margin-top: 15px;
    display: flex;
  }
}
</style>