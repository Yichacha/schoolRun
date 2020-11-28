import { postAction, getAction, putAction, deleteAction } from './requests.js'

// 登录
export const jxfwLoginApi = (options, header) => postAction('https://jxfw.gdut.edu.cn/new/login', options, header)
export const getCodeApi = (options, header, responseType) => getAction('https://jxfw.gdut.edu.cn/yzm?d=1603814815275', options, header, responseType)
export const loginApi = (options, header) => postAction('/login/wxMiniProGramLogin', options)

// 私聊
export const getPrivateRecordApi = (options) => postAction('/api/chatRecord/obtainRecordsPageByOppositeUserId', options)
export const setHasReadApi = (options) => postAction('/api/chatRecord/setHasReadByRecordId', options)
export const confirmReceiveApi = (options, header) => postAction('/api/order/save', options, header)
export const confirmOrderApi = (orderId, header) => putAction(`/api/order/confirm/${orderId}`, {}, header)
export const cancelOrderApi = (orderId, header) => deleteAction(`/api/order/delete/${orderId}`, header)
export const getOrderApi = (options, header) => getAction('/api/errand/getUserUnOrder', options, header)
export const getCommentApi = (options, header) => getAction('/api/comment/getCommentsByEmployeeId',  options, header)
export const getReceivedOrderApi = (employeeId, header) => getAction(`/api/order/getWeOrder/${employeeId}`, header)

// 消息列表
export const getMsgListApi = (options, header) => getAction('/api/chatListElement/getChatList', options, header)

// 发布
export const sendApi = (options, header) => postAction('/api/errand/save', options, header)

export const sortByPriceApi = (options) => getAction('/api/errand/searchByPrice', options)

