import wepy from 'wepy'
import { STATIC_IMG_PATH } from './config'

let device = wepy.getSystemInfoSync()
let w = device.windowWidth
let h = device.windowHeight

module.exports = {
  /*
   * 首页二维码合成图
   */
  composeImageForIndex: [
    {
      src: `${STATIC_IMG_PATH}/share/shopIndexBg.jpg?i=${Math.random()}`,
      w: w,
      h: h,
      x: 0,
      y: 0,
      c: false
    }, {
      src: '',
      w: w / 10,
      h: w / 10,
      x: w / 2 - 68,
      y: h * 0.74 + 2,
      c: true
    }
  ],
  /*
   * 首页二维码合成文字
   */
  composeTextForIndex: [{
    text: '',
    x: w * 0.44,
    y: h * 0.8 - 4,
    style: '#333333',
    align: 'left',
    size: 14
  }],
  /*
   * 商品详情二维码合成图
   */
  composeImageForGoods: [
    {
      src: '',
      w: w,
      h: h / 2,
      x: 0,
      y: 0,
      c: false
    }, {
      src: `${STATIC_IMG_PATH}/share/hot.png`,
      w: 100,
      h: 100,
      x: 0,
      y: 0,
      c: false
    }, {
      src: `${STATIC_IMG_PATH}/share/qrBackground.png`,
      w: w / 3,
      h: w / 3,
      x: w - w / 3 - 10,
      y: h - w / 3,
      c: false
    }, {
      src: '',
      w: w / 8,
      h: w / 8,
      x: 20,
      y: h * 0.6,
      c: true
    }
  ],
  /*
   * 商品详情二维码合成文字
   */
  composeTextForGoods: [{
    x: w / 5,
    y: h * 0.66,
    size: 20,
    style: '#000000',
    align: 'left',
    text: '' // 商品主标题
  }, {
    x: 20,
    y: h * 0.74,
    size: 20,
    style: '#E34E4E',
    align: 'left',
    text: '' // 商品价格
  }, {
    x: w / 3,
    y: h * 0.74,
    size: 16,
    style: '#666666',
    align: 'left',
    text: '' // 市场价
  }, {
    x: 20,
    y: h * 0.8,
    size: 16,
    style: '#999999',
    align: 'left',
    text: '', // 商品副标题
    width: w * 0.4
  }, {
    x: 20,
    y: h - 8,
    size: 26,
    style: '#999999',
    align: 'left',
    text: '>>>>>>>>>>'
  }],
  /*
   * 海报预览图
   */
  placardPreImg(i) {
    return {
      url: `${STATIC_IMG_PATH}/placard/${i}.jpg`,
      title: ''
    }
  },
  /*
   * 海报预览图和头像去合成
   */
  placardDrawImg(i) {
    return [{
      src: `${STATIC_IMG_PATH}/placard/${i}.jpg`,
      w: w,
      h: h,
      x: 0,
      y: 0,
      c: false
    }, {
      src: '',
      w: w / 7,
      h: w / 7,
      x: 10,
      y: h * 0.9 - 10,
      c: false
    }]
  },
  /*
   * 海报预览图合成的文字
   */
  placardDrawText: [{
    text: '',
    x: w / 7 + 20,
    y: h - 14,
    style: '#FFFFFF',
    align: 'left',
    size: 14
  }, {
    text: '长按小程序码进店',
    x: w - 16,
    y: h - 14,
    style: '#FFFFFF',
    align: 'right',
    size: 12
  }],
  // 逛逛精选合成图片
  composeImageForStroll: [
    {
      src: '',  // 商品图
      w: 60,
      h: 60,
      x: 30,
      y: h + 200,
      c: false
    }, {
      src: '',   // 头像
      w: 50,
      h: 50,
      x: 15,
      y: h + 115,
      c: true
    }
  ],
  // 逛逛精选合成文字
  composeTextForStroll: [
    {
      x: 20,
      y: 40,
      size: 11,
      style: '#333333',
      align: 'justify',
      text: '', // 描述
      // width: w - 140
      width: w - 140
    }, {
      x: 95,
      y: h + 190,
      size: 12,
      style: '#333333',
      align: 'left',
      text: '', // 商品标题
      width: w - 190
    }, {
      x: 95,
      y: h + 130,
      size: 12,
      style: '#666666',
      align: 'left',
      text: '' // 商品价格
    }, {
      x: 110,
      y: h + 130,
      size: 10,
      style: '#999999',
      align: 'left',
      text: '', // 市场价格
      width: 160
    }, {
      x: 70,
      y: h + 80,
      size: 20,
      style: '#e22d2d',
      align: 'left',
      text: '识别图中小程序码查看图文详情' // 识别二维码查看图文详情
    }
  ]
}
