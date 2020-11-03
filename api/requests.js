const app = getApp()
import { getToken, setToken, removeToken } from '../utils/cookies.js'

const baseUrl = 'http://www.vtmer2018.top:8099';

const request = (url, options) => {
  const token = getToken(app.globalData.token);
  let header = {};
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
      url: url[0] == "/" ? baseUrl + url : url,
      data: options.data,
      method: options.method,
      header: Object.assign(header, options.header),
      responseType: options.responseType || "text",
      success: res => {
        if(res.data){
          resolve(res);
        } else{
          reject(res);
        }
      },
      fail: err => {
        reject(err.data);
      }
    })
  })
}

const getAction = (url, options = {}, header = {}, responseType = '') => {
  return request(
    url,
    {
      method: 'GET',
      data: options,
      header: header,
      responseType: responseType
    }
  )
}
const postAction = (url, options, header = {}, responseType = '') => {
  return request(
    url,
    {
      method: 'POST',
      data: options,
      header: header,
      responseType: responseType
    }
  )
}
const putAction = (url, options, header = {}, responseType = '') => {
  return request(
    url,
    {
      method: 'PUT',
      data: options,
      header: header,
      responseType: responseType
    }
  )
}
const deleteAction = (url, options, header = {}, responseType = '') => {
  return request(
    url,
    {
      method: 'DELETE',
      data: options,
      header: header,
      responseType: responseType
    }
  )
}

module.exports = {
  getAction,
  postAction,
  putAction,
  deleteAction
}