const setToken = (key, data) => {
  try {
    wx.setStorageSync(key, data)
  } catch (e) {
    console.log(e)
  }
}
const getToken = (key) => {
  try {
    var value = wx.getStorageSync(key)
    if (value) {
      return value
    }
  } catch (e) {
    console.log(e)
  }
}
const removeToken = (key) => {
  try {
    wx.removeStorageSync(key)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  setToken,
  getToken,
  removeToken
}