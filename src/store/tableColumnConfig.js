
const tableColumn =  {
  deviceColumn: [
    { 
      label: '日期',
      prop: 'date',
      type: 'basic',
      default: true
    },
    { 
      label: '姓名',
      prop: 'name',
      type: 'basic',
      default: true
    },
    { 
      label: '地址',
      prop: 'address',
      type: 'basic',
      default: false
    }
   ],
  }
/**
 * 获取表格列的默认显示列
 * @param object
 * @returns {*}
 */
const getDefaultSelection = (object) => {
  return tableColumn[object].filter(item => {
    return item.default
  })
}
/**
 * 动态计算表格基础列宽度
 * @param vm
 * @param column
 * @returns {string}
 */
const calcTableHeaderWidth = (vm, column) => {
  let headerStr = column.type === 'basic' ? column.label : column.extPropName
  let headerStrWid = column.type === 'basic' ? headerStr.length * 12 + 45 : headerStr.length * 12 + 20
  if (column.prop === 'createdTime' || column.prop === 'lastModifiedTime') {
    headerStrWid = headerStr.length * 12 + 110
  }
  return headerStrWid + ''
}
export {
  tableColumn,
  getDefaultSelection,
  calcTableHeaderWidth
}
