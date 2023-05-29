import requests from '@/utils/request'
export const reqCategory1List = () => requests({ url: '/admin/product/getCategory1', method: 'get' })
export const reqCategory2List = (category1Id) => requests({ url: `/admin/product/getCategory2/${category1Id}`, method: 'get' })
export const reqCategory3List = (category2Id) => requests({ url: `/admin/product/getCategory3/${category2Id}`, method: 'get' })
export const reqAttrList = (category1Id, category2Id, category3Id) => requests({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })
export const reqAddOrUpdateAttr = (data) => requests({ url: '/admin/product/saveAttrInfo', method: 'post', data })