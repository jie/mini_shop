import shortid from './shortid'

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const getGoodsImageName = function(path, base_path) {
  let paths = path.split('.')
  let extname = paths[paths.length - 1]
  let filename = shortid(10)
  return `${base_path}/${filename}.${extname}`
}

module.exports = {
  formatTime: formatTime,
  getGoodsImageName: getGoodsImageName
}
