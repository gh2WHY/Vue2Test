<template>
  <div class="about">
    <el-table :data="tableData"
                ref="accessAuthList"
                @selection-change="handleSelectionChange"
                @sort-change="handleSortChange"
                row-class-name="table-row"
                element-loading-spinner="el-icon-loading"
                row-key="id">
        <el-table-column type="selection" :reserve-selection="true"
                         width="55"></el-table-column>
        <el-table-column type="index" class-name="index" width="80px">
          <template slot="header">
            <table-column-popover ref="popover" :columns="allTableColumns" :defaultColumns="defaultTableColumns"
              @change="handleChangeTableColumn" @reset="handleResetTableColumn"></table-column-popover>
          </template>
        </el-table-column>
        <template v-for="item in tableColumns">
          <el-table-column :key="item.type === 'basic'?item.prop:item.extPropCode" filterable
                          :prop="item.type === 'basic'?item.prop:item.extPropCode"
                          :sortable="(item.type === 'basic'&&handleSortable(item.prop))?'custom':false"
                          show-overflow-tooltip
                          :min-width="headerWidth(item)"
                          :label="item.type === 'basic'? item.label  : item.extPropName ">
            <template slot-scope="scope">
              <span v-if="item.type === 'basic'">
                <template >{{scope.row[item.prop]}}</template>
              </span>
              <span v-else>{{item | findExtValue(scope.row)}}</span>
            </template>
          </el-table-column>
        </template>
      </el-table>
  </div>
</template>

<script>
  import TableColumnPopover from '@/components/TableColumnPopover.vue'
  import { mapState } from 'vuex'
  import { getDefaultSelection, calcTableHeaderWidth, tableColumn } from '../store/tableColumnConfig.js'
  import { cloneDeep } from 'lodash-es'
  export default {
    components: {
      'table-column-popover': TableColumnPopover
    },
    data() {
      return {
        tableData: [],
        sortableList: ['accessModeName', 'accessUrl'], // 不可进行排序列表
        allTableColumns: tableColumn.deviceColumn, // (表格优化popover)表格可显示的所有列
        defaultTableColumns: getDefaultSelection('deviceColumn'), // (表格优化popover)表格默认显示列
        tableColumns: getDefaultSelection('deviceColumn') // (表格优化)当前表格的显示列
      }
    },
    computed: {
      /**
       * 定制列store存储
       */
      ...mapState({
        storeColumns: state => state.tableColumn.deviceColumn
      })
    },
    created () {
    /** (表格优化) 初始化获取store数据展示表格列 **/
      if (this.storeColumns.length > 0) {
        this.tableColumns = cloneDeep(this.storeColumns)
        this.defaultTableColumns = cloneDeep(this.storeColumns)
      }
      this.loadData()
    },
    methods: {
      loadData () {
        this.tableData = [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
        ]
      },
      /**
       * 多行选择
       */
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleSortChange ({ column, prop, order }) {
        let sortParams = {
          sort: prop === 'accessModeName' ? 'accessModeId' : prop,
          order: order === 'descending' ? 'desc' : 'asc'
        }
        // this.loadData(sortParams)
      },
        /**
       * (表格优化)动态计算表格表头宽度
       */
      headerWidth (item) {
        return calcTableHeaderWidth(this, item)
      },
      /**
       * (表格优化)定制列变化触发表格渲染
       */
      handleChangeTableColumn (val) {
        this.$store.commit('tableColumn/changeDeviceColumn', val)
        this.tableColumns = val
      },
    /**
     * (表格优化)定制列重置
     */
      handleResetTableColumn (val) {
        this.$store.commit('tableColumn/changeDeviceColumn', [])
        this.tableColumns = val
      },
      /**
       * (表格优化)排序事件回调
       */
     handleSortChange ({ column, prop, order }) {
      let sortParams = {
        sort: prop === 'accessModeName' ? 'accessModeId' : prop,
        order: order === 'descending' ? 'desc' : 'asc'
      }
      this.loadData(sortParams)
      },
      /**
       * (表格优化)可进行排序赛选
       */
      handleSortable (prop) {
        let index = this.sortableList.findIndex(item => item === prop)
        return index === -1
      },
    }
  }
</script>

<style scoped>
  .about {
    width: 800px;
    height: 300px;
    background: pink;
  }
</style>