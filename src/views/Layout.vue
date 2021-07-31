<template>
  <div class="layout">
    <div class="title">
      <van-popover
        v-model="showPopover"
        trigger="click"
        :actions="actions"
        @select="onSelect"
      >
        <template #reference>
          <p class="p">目录</p>
        </template>
      </van-popover>
      <p>{{ this.$route.name }}</p>
      <p @click="logout">注销</p>
    </div>
    <div class="min">
      <router-view name="content"></router-view>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/Home">首页</van-tabbar-item>
      <van-tabbar-item icon="notes-o" to="/report">报表</van-tabbar-item>
      <van-tabbar-item icon="volume-o" to="/promptYc" :dot="dian"
        >提醒</van-tabbar-item
      >
      <van-tabbar-item icon="friends-o" to="/My">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Notify } from "vant";
import storage from "../api/storage";
import { api } from "../api";
export default {
  name: "Layout",
  data() {
    return {
      num: 0,
      dian: true,
      qj: false,
      zz: false,
      active: 0,
      showPopover: false,
      // 通过 actions 属性来定义菜单选项
      actions: [
        { text: "仓库管理" },
        { text: "纤经管理" },
        { text: "织造管理" },
        { text: "后整理管理" },
        { text: "设备管理" },
        { text: "综合查询" },
        { text: "打印出货标签" },
      ],
      setTimer: null,
      timer: null,
      path: "ws://192.168.1.34:9988",
      socket: "",
    };
  },
  created() {
    // this.qj = storage.getUser().users.isMV_ProductionQJ;
    // this.zz = storage.getUser().users.isMV_ProductionZZ;
    // this.getNum();
    // this.setTimer = setInterval(this.getNum(), 15 * 60 * 1000);

    // 扩展API是否准备好，如果没有则监听“plusready"事件
    if (window.plus) {
      this.plusReadys();
    } else {
      window.addEventListener("plusready", this.plusReadys, false);
    }
  },
  mounted() {
    // // // 初始化
    // this.init()
    // setTimeout(()=>{
    //   this.send()
    // },1000)
  },
  methods: {
    // 扩展API准备完成后要执行的操作
    plusReadys() {
      var pinf = plus.push.getClientInfo();
      var cid = pinf.clientid; //客户端标识
      // console.log("cid===" + cid);
      let that = this;
      plus.push.addEventListener(
        "click",
        function (msg) {
          // 跳转到指定也页面
          console.log("msg===" + msg.content);
          that.$router.push({
            path: "/promptYc",
          });
        },
        false
      );
    },
    // // socket.readyState
    // // CONNECTING：值为0，表示正在连接。
    // // OPEN：值为1，表示连接成功，可以通信了。
    // // CLOSING：值为2，表示连接正在关闭。
    // // CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
    // init: function () {
    //   if(typeof(WebSocket) === "undefined"){
    //     alert("您的浏览器不支持socket")
    //   }else{
    //     // 实例化socket
    //     this.socket = new WebSocket(this.path)
    //      this.socket.send(JSON.stringify(1))
    //     console.log(this.socket)
    //      //监听socket连接
    //     this.socket.onopen = this.open
    //      //监听socket错误信息
    //     this.socket.onerror = this.error
    //     // 监听socket消息
    //     this.socket.onmessage = this.getMessage
    //   }
    // },
    // open: function () {
    //   console.log("socket连接成功")
    // },
    // error: function () {
    //   console.log("连接错误")
    // },
    // getMessage: function (msg) {
    //   console.log(msg.data)
    // },
    // send: function () {
    //   console.log(this.socket.readyState)
    //   this.socket.send(JSON.stringify(1))
    //   console.log(456)
    // this.socket.send(params)
    // },
    // close: function () {
    //   console.log("socket已经关闭")
    // },

    // 提示条数

    getNum() {
      let params = {
        userID: storage.getUser().users.id,
      };
      api.GetMessageCount(params).then((res) => {
        console.log(res.data);
        if (this.num !== res.data.data.msgCount) {
          // 手机震动
          navigator.vibrate([3000, 2000, 1000]);
          let readWords = "您有新的异常，请注意处理"; //获取播报的文字（除去样式）
          // encodeURI 函数可把字符串作为 URI 进行编码。
          var url =
            "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=" +
            encodeURI(readWords);
          // 创建音频实例对象
          var n = new Audio(url);
          n.src = url;
          n.play(); //播放阅读
          //  n.cancel();  //取消阅读
          //  n.pause();  //暂停阅读
        }
        this.num = res.data.data.msgCount;
        if (this.num > 0) {
          this.dian = true;
        } else {
          this.dian = false;
        }
      });
    },
    onSelect(action) {
      switch (action.text) {
        case "仓库管理":
          this.$router.push({
            path: "/storeManagement",
          });
          break;
        case "纤经管理":
          this.$router.push({
            path: "/fiber",
          });
          break;
        case "织造管理":
          this.$router.push({
            path: "/weaving",
          });
          break;
        case "设备管理":
          this.$router.push({
            path: "/equipment",
          });
          break;
        case "综合查询":
          this.$router.push({
            path: "/zhongHeIndex",
          });
          break;
        case "后整理管理":
          this.$router.push({
            path: "/hFinishing",
          });
          break;
        default:
          Notify({ type: "danger", message: "暂未开发" });
          break;
      }
    },
    // 注销
    logout() {
      storage.removeUser();
      // 清除缓存
      window.localStorage.clear();
      this.$router.push({
        path: "/",
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.setTimer);
  },
  destroyed() {
    // // 销毁监听
    // this.socket.onclose = this.close
  },
};
</script>

<style scoped lang="less">
.layout {
  width: 100%;
  .title {
    padding: 0 10px;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    font-size: 16px;
    border-bottom: 2px solid #f5f5f5;
    // .p {
    //   // margin-left: 30px;
    // }
  }
}
</style>
