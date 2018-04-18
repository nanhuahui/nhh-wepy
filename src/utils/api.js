import wepy from 'wepy'
import { API_URL } from './config'

/*
 * 统一封装
 */
function request(config) {
  if (!wepy.getStorageSync('sessId')) {
    login()
  }
  return wepy.request(config)
}

// 获取商品详情
export function getGoods(id) {
  return request({
    url: `${API_URL}/goods.php`,
    data: {id: id}
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
    data: data
  })
}

// 转换商品的视频地址
export function conversionGoodsVideo(vid) {
  let videoUrl = 'https://vv.video.qq.com/getinfo'
  return request({
    url: `${videoUrl}?vids=${vid}&platform=101001&charge=0&otype=json`
  })
}

// 登录方法
async function login() {
  console.log('登录请求')
  let loginInfo = await wepy.login()
  console.log('授权code:', loginInfo.code)
  let wxUser = await wepy.getUserInfo()
  console.log('授权用户:', wxUser)
  // 存储微信的用户信息
  wepy.setStorageSync('user_wx', wxUser.userInfo)
  if (wxUser) {
    wepy.showLoading({ title: '登录中...' })
    wepy.request({
      url: `${API_URL}/wx_app/login.php`,
      data: {
        code: loginInfo.code,
        encrypted_data: wxUser.encryptedData,
        iv: wxUser.iv,
        raw_data: wxUser.rawData,
        signature: wxUser.signature
      }
    }).then(({ data: { errcode, data, msg } }) => {
      if (errcode === 0) {
        console.log(data)
        // 存储数据
        wepy.setStorageSync('sessId', data.sess_id)
        wepy.setStorageSync('user_nhh', data.user_info)
        if (!wepy.getStorageSync('sellerId') && data.user_info.is_shop === '1') {
          // 缓存中没有卖家ID且用户已开店时，存储卖家ID
          wepy.setStorageSync('sellerId', data.user_info.user_id)
        }

        /*eslint-disable */
        var pages = getCurrentPages() // 获取加载的页面
        /*eslint-enable */
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
          wepy.reLaunch({
            url: newPath
          })
        } else {
          // 跳转首页
          wepy.reLaunch({
            url: '/pages/shopping/index/index'
          })
        }
      } else {
        console.error('登录失败', msg)
      }
      // wepy.hideLoading()
    }).catch((error) => {
      console.log('登录异常', error)
      // wepy.hideLoading()
    })
  }
}
