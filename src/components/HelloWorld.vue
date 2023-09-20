<template>
    <div class="home">
        <img class="head-img" src="@/assets/logo.png" />
        <el-button @click="changeData">修改数据</el-button>
        <div v-for="(member,index) in members" :key="index" v-if="!member.isWomen">
            {{ member.name }} ---- {{ member.age }}
        </div>
    </div>
</template>

<script>
export default {
    name: "homePage",
    components: {},
    data() {
        return {
            members: [
                {name: '张三',age: 18, isWomen: false},
                {name: '李四',age: 28, isWomen: true},
                {name: '王五',age: 38, isWomen: false},
            ]
        }
    },
    methods: {
        changeData() {
            // 使用pop, push, shift,unshift等方法
            // this.members.push({name: '王麻子',age: 90});
            // this.members.splice(0,0, {name: '王麻子',age: 90});

            // this.members[0].name = '吴翃宇'
            this.$set(this.members[0], 'name', '吴翃宇')
        }
    },
};
</script>

<style lang="scss" scoped>
.home {
    text-align: center;
}
.head-img {
    border-radius: 50% 50%;
    margin-top: 1rem;
}
.per-link {
    margin-top: 1rem;
    font-size: larger;
    .link-address {
        text-decoration: underline;
        color: blue;
        cursor: pointer;
    }
}
</style>