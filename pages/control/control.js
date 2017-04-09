// pages/control/control.js
var app = getApp();
var util = require('../../utils/util.js')
Page({
  data:{
      "flag":"false",
      "author": 'author',
      "icon" : 'icon',
      "time" : 'time',
      "msg" : 'msg',
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: 'control'
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  formSubmit: function(e) {
    // msg = e.detail.value
    console.log(e.detail.value.textarea);
    wx.request({
      url: 'https://udtrokia.com/import', //仅为示例，并非真实的接口地址
      data: {
        msg:e.detail.value.textarea,
        date:util.formatTime(new Date()),
        icon:app.globalData.userInfo.avatarUrl,
        author:app.globalData.userInfo.nickName
      },
      success: function(res) {
        var that = this;
        console.log(that)
        that.setData({
          "flag":true
        })
      },
    })            
    wx.navigateBack({
      url: '../posts/posts',
      success:()=>{
        console.log('redirectTo success')
        wx.showToast({
          title: 'success!',
          icon: 'success',
          duration: 2000
        })
      },
      fail:()=>{console.log('failed')}
    })
  },
  onPullDownRefresh:function(){
    wx.stopPullDownRefresh();
  }
})