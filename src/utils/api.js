import wepy from 'wepy'
import {API_URL} from './config'

/* 统一封装 */
function request(config) {
  if (!wepy.getStorageSync('sessId') && !wepy.getStorageSync('isLogin')) {
    return doWxLogin()
  } else {
    return wepy.request(config)
  }
}

// 获取分类菜单
export function getCategory() {
  return request({
    url: `${API_URL}/get_category.php`
  })
}

// 获取首页数据
export function getStoreIndex(data) {
  return request({
    url: `${API_URL}/store_index.php`,
    data
  })
}

// 获取个性推荐
export function getRecommend(data) {
  return request({
    method: 'POST',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: `${API_URL}/store_index.php?step=get_category_goods`,
    data
  })
}

// 获取消费商专区
export function getDistribution(id) {
  return request({
    url: `${API_URL}/distribution.php?act=banner`
  })
}

// 获取商品详情
export function getGoods(id) {
  return request({
    url: `${API_URL}/goods.php`,
    data: {
      id: id
    }
  })
}

// 商品添加至收藏
export function addCollection(id) {
  return request({
    url: `${API_URL}/user.php`,
    data: {
      id: id,
      act: 'collect'
    }
  })
}

// 商品加入购物车
export function addCart(data) {
  return request({
    method: 'POST',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: `${API_URL}/flow.php?step=add_to_cart`,
    data
  })
}

// 转换商品的视频地址
export function conversionGoodsVideo(vid) {
  let videoUrl = 'https://vv.video.qq.com/getinfo'
  return request({url: `${videoUrl}?vids=${vid}&platform=101001&charge=0&otype=json`})
}

/* 设置店铺名称和店主头像至缓存 */
export function setSellerInfo() {
  if (wepy.getStorageSync('sellerId')) {
    getStoreIndex({
      uid: wepy.getStorageSync('sellerId')
    }).then(({data: { errcode, data, msg }}) => {
      // console.info(errcode, msg, data)
      if (errcode === 0) {
        // 正常返回
        let info = data.storeinfo
        let detail = data.store_detail
        let storeJson = {}
        // 存储店铺头像,店铺名称,店铺二维码
        storeJson.name = (detail.store_name && detail.store_name !== 'undefined') ? detail.store_name : ''
        storeJson.qrcode = (detail.qrcode_img && detail.qrcode_img !== 'undefined') ? detail.qrcode_img : ''
        storeJson.avatar = info ? info.avatar : ''
        wepy.setStorageSync('store_nhh', storeJson)
      } else {
        // 接口返回错误
        console.error(errcode, msg, data)
      }
    }).catch((error) => {
      console.log('获得店铺名称和店主头像异常', error)
    })
  }
}

/* 设置底部菜单的购物车数量 */
export async function setCartNum() {
  if (!wepy.getStorageSync('sessId')) {
    return
  }
  // 优先抹掉数量,通过响应判断是否需要请求接口去获取真正的购物车数量
  await wepy.removeTabBarBadge({index: 1}).then(({errMsg}) => {
    if (errMsg === 'removeTabBarBadge:ok') {
      request({url: `${API_URL}/flow.php`}).then(({data: { errcode, data, msg }}) => {
        if (errcode === 0) {
          // 正常返回
          let cartNum = data.total.real_goods_count
          wepy.setTabBarBadge({index: 1, text: `${cartNum}`})
          // cartNum为零时隐藏tabBar小圆点
          if (!cartNum) {
            wepy.hideTabBarRedDot({index: 1})
          }
        } else {
          // 接口返回错误
          console.error(errcode, msg, data)
        }
      }).catch((error) => {
        console.log('获得购物车商品数量异常', error)
      })
    }
  }).catch((error) => {
    console.log(error)
  })
}

/**
 * 微信登录流程
 */
async function doWxLogin() {
  console.log('登录请求')
  wepy.setStorageSync('isLogin', true)
  let loginInfo = await wepy.login()
  console.log('授权code:', loginInfo.code)
  let wxUser = await wepy.getUserInfo()
  console.log('授权用户:', wxUser)
  // 存储微信的用户信息
  wepy.setStorageSync('user_wx', wxUser.userInfo)
  if (wxUser) {
    wepy.showLoading({title: '登录中...'})
    return wepy.request({
      url: `${API_URL}/wx_app/login.php`,
      data: {
        code: loginInfo.code,
        encrypted_data: wxUser.encryptedData,
        iv: wxUser.iv,
        raw_data: wxUser.rawData,
        signature: wxUser.signature
      }
    }).then(({data: { errcode, data, msg }}) => {
      if (errcode === 0) {
        // console.log(data)
        // 存储数据
        wepy.setStorageSync('sessId', data.sess_id)
        wepy.setStorageSync('user_nhh', data.user_info)
        if (!wepy.getStorageSync('sellerId') && data.user_info.is_shop === '1') {
          // 缓存中没有卖家ID且用户已开店时，存储卖家ID
          wepy.setStorageSync('sellerId', data.user_info.user_id)
        }

        /* eslint-disable */
        var pages = getCurrentPages() // 获取加载的页面
        /* eslint-enable */
        var currentPage = pages[pages.length - 1] // 获取当前页面的对象
        if (currentPage) {
          var url = currentPage.route // 当前页面url
          var options = currentPage.options // 如果要获取url中所带的参数可以查看options
          // 组装地址和参数列表
          var newPath = `/${url}`
          if (Object.keys(options).length > 0) {
            newPath += '?'
            let i = 0
            for (let p in options) {
              newPath += (i > 0 ? '&' : '') + p + '=' + options[p]
              i++
            }
          }
          wepy.reLaunch({url: newPath})
        } else {
          // 跳转首页
          wepy.reLaunch({url: '/pages/shopping/index/index'})
        }
        // 登录成功后:1、获取店铺信息;2、设置底部菜单购物车数量
        setSellerInfo()
        setCartNum()
        // 清除登录标记
        wepy.removeStorageSync('isLogin')
      } else {
        console.error('登录失败', msg)
      }
      wepy.hideLoading()
    }).catch((error) => {
      console.log('登录异常', error)
      wepy.hideLoading()
    })
  }
}
