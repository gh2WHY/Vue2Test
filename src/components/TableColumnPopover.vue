<template>
  <el-popover popper-class="iip-equipment-table-column-popover" trigger="click" @show="handleShow">
    <el-table :data="columns" ref="table" max-height="300" @select="handleSelection" @select-all="handleSelection">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column>
        <template slot="header">
          <i class="el-icon-s-grid" style="padding-left: 10px; cursor: pointer;"
             title="重置" @click="handleReset"></i>
        </template>
        <template slot-scope="scope">
          <span v-if="scope.row.type === 'basic'">{{scope.row.label}}</span>
          <span v-else>{{scope.row.extPropName}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-button slot="reference" type="text" icon="el-icon-s-grid"></el-button>
    <el-button style="padding-right:10px" slot="reference" type="text" class="iip-fa iip-fa-filter-2-line"></el-button>
  </el-popover>
</template>
<script>
import { cloneDeep } from 'lodash-es'
export default {
  props: {
    columns: { // 表格所有列
      type: Array,
      default: () => {
        return []
      }
    },
    defaultColumns: { // 默认选中列
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      selectedList: []
    }
  },
  mounted () {
    let vm = this
    if (vm.defaultColumns && vm.defaultColumns.length > 0) {
      vm.selectedList = cloneDeep(vm.defaultColumns)
    }
  },
  methods: {
    handleShow () {
      this.$nextTick(() => {
        this.setSelected(this.selectedList)
      })
    },
    /**
     * 重置
     */
    handleReset () {
      this.$refs.table.clearSelection()
      let defaultArr = []
      this.columns.forEach(item => {
        if (item.default) {
          defaultArr.push(item)
        }
      })
      this.selectedList = cloneDeep(defaultArr)
      this.setSelected(this.selectedList)
      this.$emit('reset', this.selectedList)
    },
    /**
     * 复选框点击
     */
    handleSelection (selection, row) {
      this.selectedList = selection
      this.$emit('change', this.selectedList)
    },
    /**
     * 设置复选框选中状态
     */
    setSelected (selection) {
      this.columns.forEach(item => {
        let index = selection.findIndex(s => {
          return (s.prop && s.prop === item.prop) || (s.extPropCode && s.extPropCode === item.extPropCode)
        })
        if (index !== -1) {
          this.$refs.table.toggleRowSelection(item, true)
        }
      })
    }
  }
}
</script>
<style lang="scss">
  // @import '@/theme/theme-default.scss';
  /* 表格配置表头下拉框 */
  // @include b(table-column-popover) {
  //   padding: 0px;
  // }

</style>
