<template>
  <div class="box">
    <div class="wa" v-for="(item, index) in data.data" :key="index">
      <p
        :class="[
          item.msgTyp == '1' ? 'color1' : '',
          item.msgTyp == '2' ? 'color2' : '',
          item.msgTyp == '3' ? 'color3' : '',
        ]"
      >
        {{ item.msgText }}
      </p>
    </div>
    <p>
      <van-icon name="chat-o" badge="999+" style="font-size:55px" color="red" />
    </p>
  </div>
</template>

<script>
export default {
  name: "my",
  data() {
    return {
      dd: [
        {
          id: 1,
          idx: 2,
          name: "小明",
        },
        {
          id: 2,
          idx: 2,
          name: "小明",
        },
        {
          id: 1,
          idx: 3,
          name: "小红",
        },
        {
          id: 2,
          idx: 1,
          name: "小刚",
        },
      ],
      data: {
        data: [
          {
            msgSeq: "1000000943",
            msgTim: 1621302728816,
            tskSeq: "1000000586",
            cfhTyp: null,
            msgTyp: "2",
            msgCon: "任务号:1000000586;车号:106;信息有变更",
            issNo: "admin",
            issNme: "系统管理员",
            ambNo: "106",
            ambCno: "浙ANSZM",
            ambBel: "1000",
            comNo: null,
            drrNo: "2001",
            drrNme: "司机11司机司机司机司机",
            prtFlg: "0",
            cfmFlg: "1",
            cfmTim: 1621305988458,
            cfmNo: "2001",
            cfmNme: null,
          },
          {
            msgSeq: "1000000939",
            msgTim: 1621250027243,
            tskSeq: "1000000586",
            cfhTyp: null,
            msgTyp: "3",
            msgCon: "任务号:1000000586;车号:106;信息有变更",
            issNo: "admin",
            issNme: "系统管理员",
            ambNo: "106",
            ambCno: "浙ANSZM",
            ambBel: "1000",
            comNo: null,
            drrNo: "2001",
            drrNme: "司机11司机司机司机司机",
            prtFlg: "0",
            cfmFlg: "1",
            cfmTim: 1621305992438,
            cfmNo: "2001",
            cfmNme: null,
          },
          {
            msgSeq: "1000000935",
            msgTim: 1621248230980,
            tskSeq: "1000000586",
            cfhTyp: null,
            msgTyp: "4",
            msgCon: "任务号:1000000586;车号:106;信息有变更",
            issNo: "admin",
            issNme: "系统管理员",
            ambNo: "106",
            ambCno: "浙ANSZM",
            ambBel: "1000",
            comNo: null,
            drrNo: "2001",
            drrNme: "司机11司机司机司机司机",
            prtFlg: "0",
            cfmFlg: "1",
            cfmTim: 1621322632517,
            cfmNo: "2019",
            cfmNme: "站点管理员1",
          },
          {
            msgSeq: "1000000934",
            msgTim: 1621248094527,
            tskSeq: "1000000586",
            cfhTyp: null,
            msgTyp: "2",
            msgCon: "任务号:1000000586;车号:106;信息有变更",
            issNo: "admin",
            issNme: "系统管理员",
            ambNo: "106",
            ambCno: "浙ANSZM",
            ambBel: "1000",
            comNo: null,
            drrNo: "2001",
            drrNme: "司机11司机司机司机司机",
            prtFlg: "0",
            cfmFlg: "1",
            cfmTim: 1621322661544,
            cfmNo: "2019",
            cfmNme: "站点管理员1",
          },
          {
            msgSeq: "1000000934",
            msgTim: 1621248094527,
            tskSeq: "1000000586",
            cfhTyp: null,
            msgTyp: "5",
            msgCon: "任务号:1000000586;车号:106;信息有变更",
            issNo: "admin",
            issNme: "系统管理员",
            ambNo: "106",
            ambCno: "浙ANSZM",
            ambBel: "1000",
            comNo: null,
            drrNo: "2001",
            drrNme: "司机11司机司机司机司机",
            prtFlg: "0",
            cfmFlg: "1",
            cfmTim: 1621322661544,
            cfmNo: "2019",
            cfmNme: "站点管理员1",
          },
        ],
      },
    };
  },

  created() {
    this.data.data.forEach((item) => {
      this.$set(item, "msgText", "");
      console.log(item);
      if (item.msgTyp == "1") {
        console.log(1);
        item.msgText = "变大";
      } else if (item.msgTyp == "2") {
        console.log(2);
        item.msgText = "变小";
      } else if (item.msgTyp == "3") {
        console.log(3);
        item.msgText = "变高";
      } else if (item.msgTyp == "4") {
        console.log(4);
        item.msgText = "变低";
      } else if (item.msgTyp == "5") {
        console.log(5);
        item.msgText = "变瘦";
      }
    });
    console.log(this.data);
  },
  methods: {
    onClickLeft() {},
    onClickRight() {},
  },
};
</script>

<style scoped lang="less">
.box {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  .color1 {
    color: red;
  }
  .color2 {
    color: blue;
  }
  .color3 {
    color: pink;
  }
}
</style>
