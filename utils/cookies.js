const setToken = () => {
  wx.setStorage({
    key: 'ACCESS_TOKEN',
    data: ''
  })
}
const getToken = () => {
  wx.getStorage({
    key: 'ACCESS_TOKEN',
    success (res) {
      console.log(res.data)
    }
  })
}
const removeToken = () => {
  wx.removeStorage({
    key: 'ACCESS_TOKEN',
    success (res) {
      console.log(res)
    }
  })
}

module.exports = {
  setToken,
  getToken,
  removeToken
}