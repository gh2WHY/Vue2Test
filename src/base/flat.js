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