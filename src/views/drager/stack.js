
export class Stack {
  constructor(){
    this.items = []
  }
  push (item) { // 压栈
    this.items.push(item)
  }
  pop() { // 出栈
    this.items.pop()
  }
  peek() { // 返回栈顶元素
    return this.items[this.items.length - 1]
  }
  isEmpty() { // 是否为空
    return this.items.length === 0
  }
  getlength () { // 获取长度
    return this.items.length
  }
}

export function getTime(time) {
  // 转换为式分秒
  let h = parseInt(time / 60 / 60)
  let m = parseInt(time / 60 % 60)
  if(h&&m) {
    return `${h}时${m}分`
  } else if(h&&!m) {
    return `${h}时`
  } else if(!h &&m) {
    return `${m}分`
  } else {
    return ''
  }
}

export function Person() {

}

Person.prototype = {
  name: 'why',
  hobby: ['躺尸']
}
