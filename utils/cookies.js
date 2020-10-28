const setToken = (key, data) => {
  wx.setStorageSync({
    key: key,
    data: data
  })
}
const getToken = (key) => {
  wx.getStorageSync({
    key: key,
    success (res) {
      console.log(res.data)
    }
  })
}
const removeToken = (key) => {
  wx.removeStorageSync({
    key: key,
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