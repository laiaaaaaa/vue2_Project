import requests from '@/utils/request'
export const reqSpuImageLIst = (spuId) => requests({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' });


//获取销售属性的数据
///admin/product/spuSaleAttrList/{spuId}  get
export const reqSpuSaleAttrList = (spuId) => requests({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' });


//获取平台属性的数据
//GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} 
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => requests({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' });
export const reqAddSku = (skuInfo) => requests({ url: '/admin/product/saveSkuInfo', method: 'post', data: skuInfo });
export const reqSkuList = (spuId) => requests({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' });



export const reqSkuInfo = (page, limit) => requests({ url: `/admin/product/list/${page}/${limit}`, method: 'get' });
export const reqSale = (skuId) => requests({ url: `/admin/product/onSale/${skuId}`, method: 'get' });
export const reqCancel = (skuId) => requests({ url: `/admin/product/cancelSale/${skuId}`, method: 'get' });
export const reqSkuById = (skuId) => requests({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' });