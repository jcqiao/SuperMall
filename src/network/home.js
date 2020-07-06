import {request} from './request'

export function getHomeMultidata(){
  return request({
    url: '/home/multidata'
  })
}

export function getGoodsMultidata(type,page){
  return request({
    url: 'http://152.136.185.210:8000/api/n3/home/data',
    params:{
      type,
      page
    }
  })
}
