<template>
    <div>
        <div class="form-item">身份证号码脱敏（显示前4位和后6位）</div>
        <input class="form-item" 
            v-model="showValue" 
            @input="desenInputText" 
            placeholder="请输入身份证号码"
        />
        <div class="form-item">输入数据</div>
        <div class="form-item"> {{ value }} </div>
    </div>
</template>

<script>
export default {
    name:'desensitize-input',
    data(){
        return {
            showValue:'',
            value:''
        }
    },
    methods:{
        desenText(str) {
            let res = str;
            const len = str.length;
            let pre4 = '';
            let last6 = '';
            pre4 = str.slice(0, 4);
            last6 = str.slice(Math.max(len - 6, 4));
            const star = Math.max(0, len - 10);
            res = pre4 + '*'.repeat(star) + last6;
            return res;
        },
        //输入框动态脱敏
        desenInputText(e) {
            const ind = e.target.selectionStart - 1;
            let value = this.value;
            const showValue = this.showValue;
            const isAdd = showValue.length > value.length;
            const num = Math.abs(value.length - showValue.length);
            if (isAdd) {
                value =
                    value.slice(0, ind-num+1) +
                    showValue.slice(ind-num+1,ind+1) +
                    value.slice(ind-num+1);
            } else {
                value = value.slice(0, ind + 1) + value.slice(ind + num + 1);
            }
            this.value = value;
            this.showValue = this.desenText(value);
            this.$nextTick(() => {
                const elem = e.target;
                if (elem.setSelectionRange) {
                    // 标准浏览器
                    elem.setSelectionRange(ind + 1, ind + 1);
                } else {
                    // IE9-
                    const range = elem.createTextRange();
                    range.moveStart('character', ind + 1);
                    range.moveEnd('character', ind + 1);
                    range.select();
                }
            });
        },
    }
}
</script>

<style>
.form-item{
    margin-top: 1em;
}
</style>