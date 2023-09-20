<template>
  <!-- 画个小电池 -->
  <div class="total">
    <div class="img">
      <div class="img_item" v-for="(item,index) in dataList" :key="index" :class="item"></div>
    </div>
    <div class="data">56</div>
  </div>

</template>

<script>
export default {
  name: 'utilization',
  props: {
    data: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      dataList: []
    }
  },
  watch: {
    data: {
      handler (val) {
        this.calcColor()
      },
      immediate: true
    }
  },
  created () {
    console.log(this.getTime(60*50))
    this.calcColor()
  },
  methods: {
    calcColor () {
      let length = Math.ceil((this.data / 100) * 12)
      for (let _i = 0; _i < 12; _i++) {
        if (_i < 10) {
          if (_i > length - 1) {
            this.$set(this.dataList, _i, 'dark_green')
          } else {
            this.$set(this.dataList, _i, 'bright_green')
          }
        } else {
          if (_i > length - 1) {
            this.$set(this.dataList, _i, 'dark_red')
          } else {
            this.$set(this.dataList, _i, 'bright_red')
          }
        }
      }
    },
  getTime(time) {
    // 转换为式分秒
    let h = parseInt(time / 60 / 60 % 24)
    let m = parseInt(time / 60 % 60)
    if(h&&m) {
      return `${h}时${m}分`
    } else if(h&&!m) {
      return `${h}时`
    } else if(!h &&m) {
      return `${m}分`
    }
}
  }
}
</script>

<style lang="scss" scoped>

.total {
    width: 300px;
    height: 60px;
    display: flex;
    .img {
      width: 70%;
      height: 100%;
      vertical-align: top;
      display: inline-block;
      overflow: hidden;
      .img_item {
        display: inline-block;
        width: calc((100% - 22px)/12);
        height: 100%;
        border-radius: 4px;
        background: pink;
        &:not(:nth-child(1)) {
          margin-left: 2px;
        }
      }
      .dark_green {
          background-color:rgba(115, 191, 105, 0.18);
        }
        .bright_green {
          background-color: #5fc760;
        }
        .dark_red {
          background-color:rgba(242, 73, 92, 0.18);
        }
        .bright_red {
          background-image: radial-gradient(rgba(191, 105, 105, 0.95) 10%, rgba(243, 24, 24, 0.55));
        }
    }
    .data {
      line-height: 60px;
      font-size: 28px;
      font-weight: 700;
      width: 30%;
    }
  }
</style>