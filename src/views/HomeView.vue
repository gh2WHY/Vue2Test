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
    }
  }
}
</script>

<style>
  .box {
    width: 200px;
    height: 50px;
    background: pink;
  }

</style>
