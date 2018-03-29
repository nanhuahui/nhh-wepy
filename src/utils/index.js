import wepy from 'wepy'
import { API_URL } from '../config'

function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}

/*
 * 身份证号码验证
 */
function checkIdcard(idcard) {
  var Errors = [
    '1',
    '身份证号码位数不对!',
    '身份证号码出生日期超出范围或含有非法字符!',
    '身份证号码校验错误!',
    '身份证地区非法!'
  ]
  var area = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  }
  if (!idcard) {
    return Errors[0]
  }
  var strL = idcard.substr(idcard.length - 1, 1)
  var Y, JYM
  if (strL === 'x') {
    idcard = idcard.replace('x', 'X')
  }
  var S, M, ereg
  var idcardArr = []
  idcardArr = idcard.split('')
  // 地区检验
  if (area[parseInt(idcard.substr(0, 2))] === null) {
    return Errors[4]
  }
  // 身份号码位数及格式检验
  switch (idcard.length) {
    case 15:
      if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 === 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0)) {
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/ // 测试出生日期的合法性
      } else {
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/ // 测试出生日期的合法性
      }
      if (ereg.test(idcard)) {
        return Errors[0]
      } else {
        return Errors[2]
      }
    case 18:
      // 18位身份号码检测
      // 出生日期的合法性检查
      // 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
      // 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
      if (parseInt(idcard.substr(6, 4)) % 4 === 0 || (parseInt(idcard.substr(6, 4)) % 100 === 0 && parseInt(idcard.substr(6, 4)) % 4 === 0)) {
        ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/ // 闰年出生日期的合法性正则表达式
      } else {
        ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/ // 平年出生日期的合法性正则表达式
      }
      if (ereg.test(idcard)) {
        // 测试出生日期的合法性
        // 计算校验位
        S = (parseInt(idcardArr[0]) + parseInt(idcardArr[10])) * 7 + (parseInt(idcardArr[1]) + parseInt(idcardArr[11])) * 9 + (parseInt(idcardArr[2]) + parseInt(idcardArr[12])) * 10 + (parseInt(idcardArr[3]) + parseInt(idcardArr[13])) * 5 + (parseInt(idcardArr[4]) + parseInt(idcardArr[14])) * 8 + (parseInt(idcardArr[5]) + parseInt(idcardArr[15])) * 4 + (parseInt(idcardArr[6]) + parseInt(idcardArr[16])) * 2 + parseInt(idcardArr[7]) * 1 + parseInt(idcardArr[8]) * 6 + parseInt(idcardArr[9]) * 3
        Y = S % 11
        M = 'F'
        JYM = '10X98765432'
        M = JYM.substr(Y, 1) // 判断校验位
        if (M === idcardArr[17]) {
          return Errors[0] // 检测ID的校验位
        } else {
          return Errors[3]
        }
      } else {
        return Errors[2]
      }
    default:
      return Errors[1]
  }
}

/*
 * 绘制小程序码合图
 * 需要传递参数对象(图片,文字,小程序码)和ctx对象,返回时通过wx.canvasToTempFilePath存储图片
 */
async function drawingMiniQr(imageArr, text, qr, ctx) {
  return new Promise((resolve, reject) => {
    wepy.request({
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      url: `${API_URL}/wx_app/get_qrcode.php?act=get_qrcode`,
      data: {
        page: qr.link,
        scene: qr.param // 长按图片识别小程序码1048
      }
    }).then(({data: {errcode, data, msg}}) => {
      if (errcode === 0) {
        let qrImgPath = data
        if (imageArr && imageArr.length > 0) {
          // 生成一个Promise对象的数组
          const promises = imageArr.map(function(w) {
            return new Promise(function(resolve, reject) {
              // 转换图片地址http开头的为https,否则提示下载图片不在域名范围内
              w.src = w.src.split('http://').join('https://')
              wepy.downloadFile({
                url: w.src
              }).then(({errMsg, statusCode, tempFilePath}) => {
                w.src = tempFilePath
                resolve(w)
              }).catch((error) => {
                console.log('downloadFile exception', error)
                resolve(w)
              })
            })
          })

          // 转换基本图片
          Promise.all(promises).then(function(posts) {
            // success
            imageArr = posts
          }, function(fail) {
            // fail
            reject(new Error('convert image fail' + fail))
            console.error('convert image fail', fail)
          }).catch(function(reason) {
            // exception
            reject(new Error('convert image error' + reason))
            console.error('convert image error', reason)
          })
        }
        // 转换小程序码图片
        wepy.getImageInfo({
          src: qrImgPath
        }).then(({width, height, path}) => {
          qrImgPath = path
          setTimeout(() => {
            // 绘制canvas
            console.log('开始绘制')
            ctx.rect(0, 0, 640, 900)
            ctx.setFillStyle('#ffffff')
            ctx.fill()

            // 绘制图片
            renderImg(imageArr, ctx)

            // 绘制文字
            renderText(text, ctx)

            // 绘制小程序码
            ctx.drawImage(qrImgPath, qr.x, qr.y, qr.size, qr.size)

            // 调用绘制方法
            ctx.draw()
            resolve()
          }, 200)
        }).catch((error) => {
          console.log('getImageInfo exception', error)
        })
      } else {
        reject(new Error('获取小程序码失败'))
        console.error('获取小程序码失败', msg)
      }
    })
  })
}

/*
 * 渲染图片方法
 */
function renderImg(imageArr, ctx) {
  // ctx作为参数传递至新的绘制方法时,要保存下canvas对象
  ctx.save()
  let arr = imageArr
  for (let i in arr) {
    let im = arr[i]
    if (im.c) {
      // 绘制大圆
      ctx.save()
      ctx.beginPath()
      ctx.arc(im.x + im.w / 2, im.y + im.w / 2, im.w / 2, 0, 2 * Math.PI)
      ctx.fill()
      ctx.clip()
      ctx.restore()

      // 绘制圆中圆
      ctx.save()
      ctx.beginPath()
      ctx.arc(im.x + im.w / 2, im.y + im.w / 2, im.w / 2 - 2.8, 0, 2 * Math.PI)
      ctx.setFillStyle('#AAAAAA')
      ctx.fill()
      ctx.clip()
      // 绘制图片
      ctx.drawImage(im.src, im.x, im.y, im.w, im.h)
      ctx.restore()
    } else {
      ctx.drawImage(im.src, im.x, im.y, im.w, im.h)
    }
  }
}
/**
 * 渲染文字
 */
function renderText(textArr, ctx) {
  // ctx作为参数传递至新的绘制方法时,要保存下canvas对象
  ctx.save()
  for (let i in textArr) {
    let t = textArr[i]
    let x = t.x
    let y = t.y
    let s = t.size
    // 文字存在背景色时, 需要在对象中新增bg: {w: 340, h: 60, r: 10, c: '#464120'}
    if (t.bg) {
      ctx.setFillStyle(t.bg.c)
      ctx.fillRect(t.x - 14, t.y - 26, t.bg.w, t.bg.h)
    }

    // 字体和样式
    ctx.setFillStyle(t.style)
    ctx.setTextAlign(t.align)
    ctx.setFontSize(t.size)
    if (t.width) {
      // 匹配是否要分词
      // let maxLineCount = Math.floor(t.width / s)
      var reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
      let tempW = 0
      let tempArr = []
      let tempText = ''
      // 将文字分组
      for (let i = 0; i < t.text.length; i++) {
        tempText += t.text[i]
        if (tempW >= t.width || i === t.text.length - 1) {
          tempArr.push(tempText)
          tempW = 0
          tempText = ''
        } else {
          tempW += reg.test(t.text[i]) ? s : s / 2
        }
      }
      // 渲染分组后的文字
      for (let i in tempArr) {
        ctx.fillText(tempArr[i], x, y + i * (s + 6))
      }
    } else {
      // 直接渲染
      ctx.fillText(t.text, t.x, t.y)
    }
  }
}

module.exports = {
  formatTime: formatTime,
  formatLocation: formatLocation,
  checkIdcard: checkIdcard,
  drawingMiniQr: drawingMiniQr
}
