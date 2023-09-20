<template>
  <div class="main">
    <div class="legend">
      <div class="legend-color-piece" v-for="(item,index) in legendList" :style="{background: item.color}"
           :key="'legend_'+index"><span>{{ item.name }}</span></div>
      <span class="unit">单价：元</span>
      <div class="right">
        <button icon="el-icon-setting" @click="toConfig" :disabled="selectDuration.length === 0">配置</button>
        <button icon="el-icon-refresh-left" @click="toReset" :disabled="selectDuration.length === 0">充值</button>
        <button icon="el-icon-delete" @click="toDelete" :disabled="currentDurationList.length === 0">删除</button>
        <button icon="el-icon-brush" @click="toClean">清空</button>
      </div>
    </div>
    <div class="title-rule">
      <div v-for="hour in 24" class="title-num" :key="'hour_num_' + hour" > {{(hour < 0 ? '0'+hour:hour) + ':00'}}</div>
      <div v-for="hour in 24" :key="'hour_line_' + hour" class="title-line">
        |
      </div>
    </div>
    <div v-for="(month, index) in months" :key="'row_'+index" class="row-container">
      <div class="row-month" :key="month + '_month_' + index"   >{{ month + '月'}}</div>
      <div :index="index+1" class="row-time" :class="{line:(index+1)%3===0}"  @mousedown.prevent="monthClick($event)">
        <div v-for="(hour,idx) in 24"
             :id="index + '_duration_'+hour"
             @mouseup.prevent="durationUp($event, formData(index + 1), formData(hour))"
             @mousemove.prevent="durationMove($event, formData(index + 1), formData(hour))"
             @mousedown.prevent="durationDown($event, formData(index + 1), formData(hour))"
             class="duration" :class="{line:idx===23||idx===7 ||idx===15}"
             :style="{backgroundColor: getColorStyle((index+1<10)?'0'+(index+1):(index+1)+'',hour<10?'0'+hour:hour+''),border:getCurrentColor((index+1<10)?'0'+(index+1):(index+1)+'',hour<10?'0'+hour:hour+'')}"
             :key="index + '_duration_' + hour">
             <!-- {{ hour }} -->
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
// @ is an alias to /sr

export default {
  name: 'ruleTable',
  data () {
    return {
      months: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
      durationList: [],
      isDown: false,
      currentMonth: '',
      currentHour: '',
      selectDuration: [], // 页面上选中的全部格子
      configDialogVisible: false,
      configDisabled: true,
      currentDurationList: [] // 当前选中的单元格
    }
  },
  computed: {
    legendList () {
      return [{
        name: '尖',
        type: 'sharp',
        color: '#ee867f'
      }, {
        name: '峰',
        type: 'peak',
        color: '#f7c780'
      }, {
        name: '平',
        type: 'flat',
        color: '#d9e4f3'
      }, {
        name: '谷',
        type: 'valley',
        color: '#a6d9b5'
      }]
    }
  },
  mounted () {
    document.addEventListener('mouseup', (e) => {
      this.isDown = false
    })
  },
  watch: {
    selectDuration: {
      handler (val) {
        if (val.length > 0) {
          this.configDisabled = false
        } else {
          this.configDisabled = true
        }
      },
      deep: true
    },
    data: {
      handler (val) {
        if (val.length > 0) {
          // this.durationList = cloneDeep(val)
          this.selectDuration = []
        }
      },
      deep: true
    },
    isDown (val) {
      if (!val) {
        this.currentDurationList.forEach(item => {
          this.addSelectDuration(item.monthId, item.hourId)
        })
      }
    }
  },
  methods: {
    toClean () {
      this.durationList = []
      this.selectDuration = []
      this.currentDurationList = []
    },
    toDelete () {
      this.currentDurationList.forEach(item => {
        this.deleteSelectDuration(item.monthId, item.hourId)
      })
      this.currentDurationList = []
    },
    toReset () {
      this.selectDuration = []
      this.currentDurationList = []
    },
    toConfig () {
      this.configDialogVisible = true
    },
    monthClick (e) {
      this.isDown = true
    },
    getDurationPrise (month, hour) {
      let price = ''
      let monthIndex = this.durationList.findIndex(data => data.monthId === month)
      if (monthIndex !== -1) {
        this.durationList[monthIndex].dcPowerPriceTypeList.forEach(data => {
          if (data.hourId.split(',').indexOf(hour) !== -1) {
            price = data.prowerPrice
            if (price.toString().indexOf('.') !== -1) {
              price = Number(price).toFixed(2)
            }
          }
        })
      }
      return price
    },
    getSelectedStyle (month, hour) {
      let filter = this.selectDuration.filter(item => {
        return item.monthId === month && item.hourId.split(',').indexOf(hour) !== -1
      })
      return (filter && filter.length > 0) ? '#ffffff' : null
    },
    getCurrentColor (month, hour) {
      let filter = this.currentDurationList.filter(item => {
        return item.monthId === month && item.hourId === hour
      })
      return (filter && filter.length > 0) ? '1px solid #7BB7FF' : null
    },
    // 设置后的北京颜色
    getColorStyle (month, hour) {
      let selectColor = this.getSelectedStyle(month, hour)
      // let monthIndex = this.durationList.findIndex(item => item.monthId === month)
      // if (monthIndex !== -1) {
      //   let type = ''
      //   this.durationList[monthIndex].dcPowerPriceTypeList.forEach(data => {
      //     let arry = data.hourId.split(',')
      //     if (arry.indexOf(hour) !== -1) {
      //       type = data.prowerTimeType
      //     }
      //   })
      //   let filter = this.legendList.filter(item => item.type === type)
      //   if (filter && filter.length > 0) {
      //     return selectColor !== null ? selectColor : filter[0].color
      //   } else {
      //     return selectColor !== null ? selectColor : '#d9e4f3'
      //   }
      // }
      return selectColor !== null ? selectColor : '#d9e4f3'
    },
    durationUp (e, month, hour) {
      let index = this.selectDuration.findIndex(item => item.monthId === month)
      if (index !== -1) {
        let hourStr = this.selectDuration[index].hourId
        let hourArr = hourStr.split(',')
        let hourIndex = hourArr.indexOf(hour)
        if (hourIndex === -1) {
          this.addSelectDuration(month, hour)
          this.currentDurationList.push({
            monthId: month,
            hourId: hour
          })
        } else {
          this.deleteSelectDuration(month, hour)
        }
      }
    },
    durationMove (e, month, hour) {
      let minMonth = this.currentMonth >= month ? month : this.currentMonth
      let maxMonth = this.currentMonth < month ? month : this.currentMonth
      let minhour = this.currentHour >= hour ? hour : this.currentHour
      let maxhour = this.currentHour < hour ? hour : this.currentHour
      if (this.isDown) {
        for (let i = Number(minMonth); i <= Number(maxMonth); i++) {
          for (let j = Number(minhour); j <= Number(maxhour); j++) {
            let x = i < 10 ? '0' + i : i + ''
            let y = j < 10 ? '0' + j : j + ''
            this.currentDurationList.push({
              monthId: x,
              hourId: y
            })
          }
        }
      }
    },
    durationDown (e, month, hour) {
      this.currentDurationList = []
      this.currentMonth = month
      this.currentHour = hour
    },
    addSelectDuration (month, hour) {
      let index = this.selectDuration.findIndex(item => item.monthId === month)
      if (index === -1) {
        this.selectDuration.push({
          monthId: month,
          hourId: hour
        })
      } else {
        let hourStr = this.selectDuration[index].hourId
        let hourArr = hourStr.split(',')
        let exists = hourArr.indexOf(hour) !== -1
        this.$set(this.selectDuration[index], 'hourId', exists ? hourStr : (hourStr + ',' + hour))
      }
    },
    deleteSelectDuration (month, hour) {
      let index = this.selectDuration.findIndex(item => item.monthId === month)
      if (index !== -1) {
        let hourStr = this.selectDuration[index].hourId
        let hourArr = hourStr.split(',')
        let hourIndex = hourArr.indexOf(hour)
        if (hourIndex !== -1) {
          hourArr.splice(hourIndex, 1)
          this.$set(this.selectDuration[index], 'hourId', hourArr.join(','))
        }
      }
    },
    uniqueArr (arr1, arr2) {
      arr1.push(...arr2)
      let arr3 = Array.from(new Set(arr1))
      return arr3
    },
    hanlderSubmitConfig (val) {
      this.selectDuration.forEach(item => {
        let dataObj = {
          prowerTimeType: val.prowerTimeType,
          hourId: item.hourId,
          prowerPrice: val.prowerPrice
        }
        let monthIndex = this.durationList.findIndex(v => v.monthId === item.monthId)
        if (monthIndex === -1) { // 月份数据不存在
          this.durationList.push({
            monthId: item.monthId,
            dcPowerPriceTypeList: [dataObj]
          })
        } else {
          // 删除已有重叠类型时间
          item.hourId.split(',').forEach(h => {
            this.durationList[monthIndex].dcPowerPriceTypeList.forEach(d => {
              let arry = d.hourId.split(',')
              let idx = arry.indexOf(h)
              if (idx !== -1) {
                arry.splice(idx, 1)
              }
              d.hourId = arry.join(',')
            })
          })
          let typeIndex = this.durationList[monthIndex].dcPowerPriceTypeList.findIndex(data => data.prowerTimeType === val.prowerTimeType)
          if (typeIndex === -1) { // 该类型数据不存在
            this.durationList[monthIndex].dcPowerPriceTypeList.push(dataObj)
          } else {
            // 该类型数据已存在
            let hourId = this.durationList[monthIndex].dcPowerPriceTypeList[typeIndex].hourId
            let hours = this.uniqueArr(hourId.split(','), item.hourId.split(','))
            this.durationList[monthIndex].dcPowerPriceTypeList[typeIndex] = Object.assign(dataObj, {
              hourId: hours.join(',')
            })
          }
        }
      })
      this.selectDuration = []
    },
    getValue () {
      return this.durationList
    },
    formData(val) {
      return val < 10 ? '0' + val : val
    },
  }




}
</script>
<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
    .legend {
      height: 30px;
      padding-left: 60px;
      .legend-color-piece {
        width: 40px;
        height: 20px;
        float: left;
        margin: 0 10px;
        text-align: center;
        span {
          color: white;
        }
      }
      .unit {
        margin-left: 20px;
        color: #999;
      }
      .right {
        float: right;
        margin-right: 50px;
      }
    }
    .title-rule {
      padding: 10px 50px 10px 70px;
      .title-num {
        float: left;
        font-weight: bold;
        height: 20px!important;
        color: #7F7E7E;
        background-color: #F7F7F7;
        line-height: 20px !important;
        width: 4.16%!important;
        font-size: 12px;
        border-color: #EEE;
        border-style: none;
        text-align: right;
      }
      .title-line {
        font-weight: bold;
        width: 4.16%!important;
        color: #DDD;
        background-color: #F7F7F7;
        line-height: 14px !important;
        float: left;
        font-size: 12px;
        border-style: none;
        text-align: right;
      }
    }
    .row-container {
      cursor: pointer;
      .row-config {
        display: none;
      }
      &:hover {
        display: block;
      }
    }
    .row-month {
      width: 60px;
      float: left;
      text-align: right;
      padding-right: 10px;
      line-height: 30px;
      font-weight: 700;
      color: #7F7E7E;
    }
    .row-time {
      width: calc(100% - 70px);
      border-bottom: 1px solid #ddd;
      float: right;
      display: flex;
      &.line {
        border-bottom: 3px solid #ddd;
      }
      .duration {
        width: 4.16%!important;
        height: 30px;
        border-left: 1px solid #ddd;
        &.line {
          border-left: 3px solid #ddd;
        }
        span {
          display: block;
        }
        .text {
          color: #fff;
          text-align: center;
          line-height: 30px;
          font-size: 12px;
        }
      }
    }
    .row-config {
      width: 50px;
      float: left;
    }
  }
</style>
