const app = getApp()
import { getToken, setToken, removeToken } from '../utils/cookies.js'

const baseUrl = '';

const request = (url, options) => {
  var token = getToken(app.globalData.token);
  var header = {};
  if(!token){
    header = {
      'Content-Type': 'application/json; charset=UTF-8'
    };
  } else{
    header = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': token
    }
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      data: options.data,
      method: options.method,
      header: Object.assign(header, options.header),
      success: res => {
        if(res.data.code){
          resolve(res.data);
        } else{
          reject(res.data);
        }
      },
      fail: err => {
        reject(err.data);
      }
    })
  })
}

const getAction = (url, options = {}, header = {}) => {
  return request(url, {method: 'GET', data: options, header: header})
}
const postAction = (url, options, header = {}) => {
  return request(url, {method: 'POST', data: options, header: header})
}
const putAction = (url, options, header = {}) => {
  return request(url, {method: 'PUT', data: options, header: header});
}
const deleteAction = (url, options, header = {}) => {
  return request(url, {method: 'DELETE', data: options, header: header});
}

module.exports = {
  getAction,
  postAction,
  putAction,
  deleteAction
}