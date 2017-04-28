//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
<<<<<<< HEAD
    console.log('tap')
    wx.switchTab({
      url: '../talk/talk'
=======
<<<<<<< HEAD
    console.log('tap')
    wx.switchTab({
      url: '../talk/talk'
=======
    wx.redirectTo({
      url: '../posts/posts'
>>>>>>> origin/master
>>>>>>> 93f714558b490e12104d060c3ed2b2dd2f0f55ef
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
      //更新数据
    that.setData({
      userInfo:app.globalData.userInfo
    })
<<<<<<< HEAD
  },
  onPullDownRefresh:function(){
    wx.stopPullDownRefresh();
=======
<<<<<<< HEAD
  },
  onPullDownRefresh:function(){
    wx.stopPullDownRefresh();
=======
>>>>>>> origin/master
>>>>>>> 93f714558b490e12104d060c3ed2b2dd2f0f55ef
  }
})
