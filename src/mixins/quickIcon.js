import wepy from 'wepy'
import {IMG_URL} from '@/utils/config'

export default class qcMixin extends wepy.mixin {
  data = {
    showQuickIcon: 'hide',
    imgPath: IMG_URL
  }
  methods = {
    showQuickIconTap() {
      this.showQuickIcon = 'show'
      this.$apply()
    },
    closeQucik() {
      this.showQuickIcon = 'hide'
      this.$apply()
    },
    toNavigate(e) {
      wepy.navigateTo({
        url: e.currentTarget.dataset.url
      })
    },
    toSwitchTab(e) {
      // 跳转到tabBar页面，并关闭其他所有tabBar页面
      wepy.switchTab({
        url: e.currentTarget.dataset.url
      })
    },
    backPage() {
      // 返回上一页面或多级页面
      wepy.navigateBack({delta: 1})
    },
    // 分享按钮
    switchPatch() {
      this.$invoke('qrPatchLayer', 'switchPatch')
    }
  }

  onShow() {
    console.log('quickIconMixin onShow')
    // 不需要提醒时 自动隐藏快捷导航
    if (!wepy.getStorageSync('showQuickIconMsg')) {
      this.showQuickIcon = 'hide'
      this.$apply()
    }
  }

  onLoad() {
    let self = this
    console.log('quickIconMixin onLoad')
    // 首次进入小程序 快捷导航提醒
    if (wepy.getStorageSync('showQuickIconMsg')) {
      this.showQuickIcon = 'show'
      this.$apply()
      setTimeout(function() {
        self.showQuickIcon = 'hide'
        self.$apply()
        wepy.setStorageSync('showQuickIconMsg', false)
      }, 1000)
    }
  }
}
