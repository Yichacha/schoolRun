const setToken = (key, data) => {
  wx.setStorage({
    key: key,
    data: data
  })
}
const getToken = (key) => {
  wx.getStorage({
    key: key,
    success (res) {
      console.log(res.data)
    }
  })
}
const removeToken = (key) => {
  wx.removeStorage({
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