// pages/anke/myCard/myCard.js

var app = getApp();
Page({
  data:{
    avatar:'/lib/puzi.png',
    staff:null,
    detail:null, 
    'require': null,   
    weChat:null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.request({
      url: 'https://udtrokia.com/export',
      data: {
        col :'puziArr',
        api :"select",
        whereStr :{"id":app.globalData.userInfo.openId}        
      },
      success:function(res){
        var data = res.data[0]
        console.log(data.avatar)
        that.setData({
          avatar : data.avatar,
          staff:data.staff,
          'require':data.require,
          detail:data.detail,
          weChat:data.weChat
        })
      },
      method: 'GET'
    })
  },

  updatePuzi :function(e){
    var that = this;
    wx.request({
      url: 'https://udtrokia.com/import',
      data: {
        staff:e.detail.value.staff,
        detail:e.detail.value.detail,
        'require':e.detail.value.require,
        weChat:e.detail.value.weChat,
        avatar:that.data.avatar,
        openId:app.globalData.userInfo.openId,
        whereStr:{
          openId:app.globalData.userInfo.openId
          },
        col:'puziArr',
        api:'update'
      },
      success:function(res){
          wx.showToast({
            title: 'success!',
            icon: 'success',
            duration: 2000
          })
      },
      method: 'GET',
    })
    wx.navigateBack({
      success:()=>{},
      fail:()=>{console.log('failed')}
    })
  },
  chooseImage : function(e){
    var that = this;
    console.log(app.globalData.userInfo.openId)
      wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'], 
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://udtrokia.com/upload?name=puzi',
          filePath: tempFilePaths[0],
          name: 'puzi',
          formData:{
            openId: app.globalData.userInfo.openId
          },
          success: function(res){
            var avatar = res.data
            console.log(res.data)
            that.setData({
              avatar:res.data
            })
          },
          fail:function(res){
            console.log('fail: '+res.data)
          }
        })
      }
    })
  }
})
