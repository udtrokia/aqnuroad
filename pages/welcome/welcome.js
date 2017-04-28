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
    console.log('tap')
    wx.switchTab({
      url: '../talk/talk'
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
  },
  onPullDownRefresh:function(){
    wx.stopPullDownRefresh();
  }
})