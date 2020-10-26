import { getToken, setToken, removeToken } from '../utils/cookies.js'

const baseUrl = '';

const request = (url, options) => {
  // var token = getToken();
  var token = getToken;
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
      header: header,
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

const getAction = (url, options={}) => {
  return request(url, {method: 'GET', data: options})
}
const postAction = (url, options) => {
  return request(url, {methods: 'POST', data: options})
}
const putAction = (url, options) => {
  return request(url, {methods: 'PUT', data: options});
}
const deleteAction = (url, options) => {
  return request(url, {method: 'DELETE', data: options});
}

module.exports = {
  getAction,
  postAction,
  putAction,
  deleteAction
}