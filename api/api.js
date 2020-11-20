import { postAction, getAction } from './requests.js'

// 登录
export const jxfwLoginApi = (options, header) => postAction('https://jxfw.gdut.edu.cn/new/login', options, header)
export const getCodeApi = (options, header, responseType) => getAction('https://jxfw.gdut.edu.cn/yzm?d=1603814815275', options, header, responseType)
export const loginApi = (options, header) => postAction('/login/wxMiniProGramLogin', options)

// 私聊
export const getPrivateRecordApi = (options, header) => postAction('/api/chatRecord/obtainRecordsPageByOppositeUserId', options, header)
export const setHasReadApi = (options, header) => postAction('/api/chatRecord/setHasReadByRecordId', options, header)

// 消息列表
export const getMsgListApi = (options, header) => getAction('/api/chatListElement/getChatList', options, header)

// 发布
export const sendApi = (options, header) => postAction('/api/errand/save', options, header)
