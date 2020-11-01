const app = getApp()
var tabar = require('../../templates/tabar/tabar.js');
Page({
  data: {},

  onLoad: function () {
    tabar.tabbar("tabBar", 1, this) //1表示第二个tabbar
  },

})