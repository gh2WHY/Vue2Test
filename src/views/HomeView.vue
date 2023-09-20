<template>
  <div class="home">
    <HelloWorld/>
    <el-button @click="changeLaguage('zh')">中文</el-button>
    <el-button @click="changeLaguage('en')">英文</el-button>
    <p>{{ t('msg') }}</p>



    <el-button @click="toAbout">路由跳转</el-button>

    <div
      class="static"
      v-bind:class="{ active: isActive, 'text-danger': hasError }"
    ></div>

    <h1>事件委托</h1>
    <ul @click="handleClick">
      <li v-for="item in studentList" :key="item.no" :data-no="item.no">姓名：{{ item.name }} 学号：{{ item.no }}</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      message: {
        zh: {
          msg: '你好世界'
        },
        en: {
          msg: 'hello world'
        }
      },
      curLan: 'zh',
      isActive: true,
      hasError: false,
      studentList: [
        {name: 'WHY', no: 1},
        {name: 'GH', no: 2},
        {name: 'FYZ', no: 3},
        {name: 'LRR', no: 4},
        {name: 'ZGS', no: 5},
      ]
    }
  },
  created() {
    let str = '011232314'
    const map = new Map();
    for(let key of str) {
      map.set(key, (map.get(key) || 0) + 1 )
    }
    console.log(map)
    for(let key of map) {
      console.log(key,   '----map---')
    }
  },
  methods: {
    changeLaguage(type) {
      this.curLan = type
    },
    t(key) {
      return this.message[this.curLan][key]
    },
    toAbout() {
      this.$router.push({
        path: '/about',
        query: {
          key: 1,
        }
      })
    },
    handleClick(e) {
      console.log(e.target.dataset.no);
    }
  }
}
</script>

<style lang="scss">
  .box {
    width: 200px;
    height: 50px;
    background: pink;
  }
  ul {
    padding:0;
    margin: 0;
    list-style: none;
    width: 300px;
    li {
      padding: 5px 15px;
      margin-bottom: 10px;
      background: pink;
    }
  }
</style>
