import {request} from "@/network/request";

export function getHomeMultidata(){
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type,page){
  return request({
    url: '/home/data',
    //params是跟在？后的
    params:{
      type,
      page
    }
  })
}