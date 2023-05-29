import requests from '../../utils/request'
export const reqTrademarkList = (page, limit) => requests({ url: `/admin/product/baseTrademark/${page}/${limit}` })
export const reqAddOrUpdateTradeMark = (tradeMark) => {
    if (tradeMark.id) {
        return requests({ url: '/admin/product/baseTrademark/update', method: 'put', data: tradeMark })
    } else {
        return requests({ url: '/admin/product/baseTrademark/save', method: 'post', data: tradeMark })
    }
}
export const reqDeleteTradeMark = (id) => requests({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' });