
//初始化数据
function tabbarinit() {
  return [
       { "current":0,
         "pagePath": "/pages/index/index",
         "iconPath": "/assets/tabarImages/home.png",
         "selectedIconPath": "/assets/tabarImages/homeActive.png",
        //  "text": "首页"
       },
       {
         "current": 0,
         "pagePath": "/pages/mine/mine",
         "iconPath": "/assets/tabarImages/mine.png",
         "selectedIconPath": "/assets/tabarImages/mineActive.png",
        //  "text": "我的"
       }
     ]
 
 }
 //tabbar 主入口
 function tabbarmain(bindName = "tabdata", id, target) {
   var that = target;
   var bindData = {};
   var otabbar = tabbarinit();
   otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
   otabbar[id]['current'] = 1;
   bindData[bindName] = otabbar
   that.setData({ bindData });
 }
 
 module.exports = {
   tabbar: tabbarmain
 }