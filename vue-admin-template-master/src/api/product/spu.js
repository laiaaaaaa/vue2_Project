import requests from '@/utils/request'
export const reqSpuList = (page, limit, category3Id) => requests({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })
export const reqSpu = (spuId) => requests({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' });
export const reqTradeMarkList = () => requests({ url: `/admin/product/baseTrademark/getTrademarkList`, method: 'get' });
export const reqSpuImageList = (spuId) => requests({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' });
export const reqBaseSaleAttrList = () => requests({ url: '/admin/product/baseSaleAttrList', method: 'get' });
export const reqAddOrUpdateSpu = (spuInfo) => {
    //携带的参数带有id----修改spu
    if (spuInfo.id) {
        return requests({ url: '/admin/product/updateSpuInfo', method: 'post', data: spuInfo });
    } else {
        //携带的参数不带id---添加SPU
        return requests({ url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo });
    }
}
export const reqDeleteSpu = (spuId) => requests({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' });