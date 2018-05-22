import wepy from 'wepy'

export default class shareMixin extends wepy.mixin {
  data = {
    showQuickIcon: 'hide'
  }
  methods = {
    onShareAppMessage(options) {
      let d = options.source.data
      let storeName = wepy.getStorageSync('store_nhh') ? wepy.getStorageSync('store_nhh').name : ''
      console.log('SHARE INFO:', d.shareTitle, d.sharePath)
      return {
        title: `${storeName ? storeName + '_' : ''}${d.shareTitle}`,
        path: d.sharePath,
        // imageUrl: '自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图',
        success: function (res) {
          // 转发成功
          console.log('success', res)
          if (res.shareTickets) {
            // 获取转发详细信息
            let as = wepy.getShareInfo({
              shareTicket: res.shareTickets[0],
              success(res) {
                console.log(666, res)
                // res.errMsg // 错误信息
                // res.encryptedData //  解密后为一个 JSON 结构（openGId    群对当前小程序的唯一 ID）
                // res.iv // 加密算法的初始向量
              },
              fail() {},
              complete() {}
            })
            console.log(as)
          }
        },
        fail: function (res) {
          // 转发失败
          console.log('fail', res)
        }
      }
    }
  }

  onShow() {
    console.log('mixin onShow')
  }

  onLoad() {
    console.log('mixin onLoad')
  }
}
