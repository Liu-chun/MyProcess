<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import storage from "./api/storage";
export default {
  data() {
    return {};
  },
  created() {
    this.backHome();
  },
  watch: {
    $route: {
      handler: function (to, from) {
        if (
          (to.path != "/cpToStoreDetail" &&
            to.path != "/cpToStore" &&
            from.path != "/cpToStoreDetail" &&
            from.path != "/cpToStore") ||
          from.path == "/"
        ) {
          storage.removeList();
        }
        if (
          (to.path != "/cpIntoStoreDetail" &&
            to.path != "/cpIntoStore" &&
            from.path != "/cpIntoStoreDetail" &&
            from.path != "/cpIntoStore") ||
          from.path == "/"
        ) {
          storage.removeLists();
        }
      },
    },
  },
  methods: {
    backHome() {
      /*** 手机返回键监听 ***/
      mui.init({
        // 监听Android手机的back、menu按键
        keyEventBind: {
          backbutton: true, //Boolean(默认true)关闭back按键监听
        },
      });
      var first = null;
      // 给手机的back按键重新绑定监听(1s内，连续点击两次返回键，则退出应用)
      mui.back = () => {
        // 首次按返回键
        if (!first) {
          first = new Date().getTime(); //记录第一次按返回键的时间
          if (this.$route.name == "home") {
            //判断当前是否为首页(无后退页)
            mui.toast("再按一次退出应用");
          }
          history.go(-1); // 返回到上一页
          setTimeout(() => {
            // 1s后清除
            first = null;
          }, 1000);
        } else {
          if (new Date().getTime() - first < 500) {
            // 连续按两次返回键且时间小于0.5s
            plus.runtime.quit(); //退出app
          }
        }
      };
    },
  },
};
</script>
<style lang="less">
html,
body,
#app {
  height: 100%;
  font-family: Hiragino Sans GB, Arial, Helvetica, "宋体", sans-serif;
}
</style>
