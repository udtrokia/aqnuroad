// pages/control/control.js
var app = getApp();
var util = require('../../../utils/util.js')
Page({
  data:{
      "author": 'author',
      "avatar" : 'avatar',
      "time" : 'time',
      "msg" : 'msg',
      "openId":'openId'
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
    var that = this;
    // msg = e.detail.value
    console.log(e.detail.value.textarea);
    wx.request({
      url: 'https://udtrokia.com/import', //仅为示例，并非真实的接口地址
      data: {
        col:'talkArr',
        api:'insert',
        msg:e.detail.value.textarea,
        date:util.formatTime(new Date()),
        avatar:app.globalData.userInfo.avatarUrl,
        author:app.globalData.userInfo.nickName,
        openId:app.globalData.userInfo.openId
      },
      success: function(res) {
        if(res.data==false){
          wx.showModal({
            title: '提示',
            content: '请注意用词',
          })
        }else{
          that.setData({
            "flag":true
          })
          wx.showToast({
            title: '成功!',
            icon: 'success_no_circle',
            duration: 1000,
            mask: true,
          })
          setTimeout(()=>{
            wx.navigateBack({
            })
          },1000)
        }
      },
    })            
  },
  onPullDownRefresh:function(){
    wx.stopPullDownRefresh();
  }
})