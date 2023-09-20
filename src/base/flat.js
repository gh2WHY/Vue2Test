// 数组的flat方法
Array.prototype.flattern = function() {
  let res = []
  for(let item in this) {
    if(Array.isArray(item)) {
      res = res.concat(item.flattern())
    } else {
      res.push(item)
    }
  }
  return res
}

// 数组reduce方法
/**
 * callbackFn() 回调函数，包含四个参数
 *    1. accumulator 上次回调函数返回的结果
 *    2. currentVal 当前值
 *    2. index 当前值的下标
 *    4. arr 当前数组
 * initValue 一个初始值
 *    1. 如果有初始值，遍历数组时从下标0开始
 *    2. 如果没有初始值，遍历数组时下标为0的值被设置为初始值，从下标1开始遍历
 */

Array.prototype.reduce = function(cb, initValue) {
  let arr = this
  // 设置最后的结果
  let total = initValue || arr[0]
  for(let i = initValue ? 0 : 1; i < arr.length; i++) {
    total += cb(total, arr[i], i, arr)
  }
  return total
}