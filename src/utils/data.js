import wepy from 'wepy'
import { STATIC_IMG_PATH } from '../config'

let device = wepy.getSystemInfoSync()
let w = device.windowWidth
let h = device.windowHeight

module.exports = {
  /*
   * 首页二维码合成图
   */
  composeImageForIndex: [
    {
      src: `${STATIC_IMG_PATH}/share/shopIndexBg.jpg`,
      width: w,
      height: h,
      x: 0,
      y: 0,
      isCircular: false
    }, {
      src: '',
      width: w / 10,
      height: w / 10,
      x: w / 2 - 68,
      y: h * 0.74 + 2,
      isCircular: true
    }
  ],
  /*
   * 首页二维码合成文字
   */
  composeTextForIndex: [
    {
      ruler: [w * 0.44, h * 0.8 - 4, 14],
      style: '#333333',
      align: 'left',
      text: ''
    }
  ],
  /*
   * 商品详情二维码合成图
   */
  composeImageForGoods: [
    {
      src: '',
      width: w,
      height: h / 2,
      x: 0,
      y: 0,
      isCircular: false
    }, {
      src: `${STATIC_IMG_PATH}/share/hot.png`,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      isCircular: false
    }, {
      src: `${STATIC_IMG_PATH}/share/qrBackground.png`,
      width: w / 3,
      height: w / 3,
      x: w - w / 3 - 10,
      y: h - w / 3,
      isCircular: false
    }, {
      src: '',
      width: w / 8,
      height: w / 8,
      x: 20,
      y: h * 0.6,
      isCircular: true
    }
  ],
  /*
   * 商品详情二维码合成文字
   */
  composeTextForGoods: [
    {
      ruler: [w / 5, h * 0.66, 20],
      style: '#000000',
      align: 'left',
      text: '' // 商品主标题
    }, {
      ruler: [20, h * 0.74, 20],
      style: '#E34E4E',
      align: 'left',
      text: '' // 商品价格
    }, {
      ruler: [w / 3, h * 0.74, 16],
      style: '#666666',
      align: 'left',
      text: '' // 市场价
    }, {
      ruler: [20, h * 0.8, 16],
      style: '#999999',
      align: 'left',
      text: '', // 商品副标题
      width: w * 0.4
    }, {
      ruler: [20, h - 8, 26],
      style: '#999999',
      align: 'left',
      text: '>>>>>>>>>>'
    }
  ],
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
      width: w,
      height: h,
      x: 0,
      y: 0,
      isCircular: false
    }, {
      src: '',
      width: w / 7,
      height: w / 7,
      x: 10,
      y: h * 0.9 - 10,
      isCircular: false
    }]
  },
  /*
   * 海报预览图合成的文字
   */
  placardDrawText: [{
    ruler: [w / 7 + 20, h - 14, 14],
    style: '#FFFFFF',
    align: 'left',
    text: ''
  }, {
    ruler: [w - 16, h - 14, 12],
    style: '#FFFFFF',
    align: 'right',
    text: '长按小程序码进店'
  }],
  // 逛逛精选合成图片
  composeImageForStroll: [
    {
      src: '',  // 商品图
      width: 60,
      height: 60,
      x: 30,
      // y: 760,
      y: h + 200, // -200
      isCircular: false
    }, {
      src: '',   // 头像
      width: 50,
      height: 50,
      x: 15,
      // y: 880,
      y: h + 115, // -115
      isCircular: true
    }
  ],
  // 逛逛精选合成文字
  composeTextForStroll: [
    {
      ruler: [20, 40, 11],
      style: '#333333',
      align: 'justify',
      text: '', // 描述
      width: w - 140
    }, {
      ruler: [95, h + 190, 12], // -190
      style: '#333333',
      align: 'left',
      text: '', // 商品标题
      width: w - 190
    }, {
      ruler: [95, h + 130, 12], // -130
      style: '#666666',
      align: 'left',
      text: '' // 商品价格
    }, {
      ruler: [110, h + 130, 10], // -130
      style: '#999999',
      align: 'left',
      text: '', // 市场价格
      width: 160
    }, {
      ruler: [70, h + 80, 20], // -80
      style: '#e22d2d',
      align: 'left',
      text: '识别图中小程序码查看图文详情' // 识别二维码查看图文详情
    }
  ]
}
