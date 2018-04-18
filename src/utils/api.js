import wepy from 'wepy'
import { API_URL } from './config'

export function getGoods(id) {
  return wepy.request({
    url: `${API_URL}/goods.php`,
    data: {id: id}
  })
}

// export function fetchPv(pv) {
//   return request({
//     url: '/article/pv',
//     method: 'get',
//     params: { pv }
//   })
// }

// export function createArticle(data) {
//   return request({
//     url: '/article/create',
//     method: 'post',
//     data
//   })
// }

// export function updateArticle(data) {
//   return request({
//     url: '/article/update',
//     method: 'post',
//     data
//   })
// }
