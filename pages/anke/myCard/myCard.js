

// pages/anke/myCard/myCard.js
var app = getApp();
Page({
  data:{
    avatar:'/lib/anke.png',
    name:null,
    sex:null,
    age:null,
    hobby:null,
    desire:null,
    work:null,
    weChat:null,
    openId:null,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.request({
      url: 'https://udtrokia.com/export',
      data: {
        col :'ankeArr',
        api :"select",
        whereStr :{"openId":app.globalData.userInfo.openId}
      },
      success:function(res){
        var data = res.data[0]
        that.setData({
          name:data.name,
          sex:data.sex,
          age:data.age,
          hobby:data.hobby,
          desire:data.desire,
          work:data.work,
          openId:data.openId,
          avatar:data.avatar,
          weChat:data.weChat
        })
      },
      method: 'GET'
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
          url: 'https://udtrokia.com/upload?name=anke',
          filePath: tempFilePaths[0],
          name: 'anke',
          formData:{
            openId: app.globalData.userInfo.openId
          },
          success: function(res){
            var avatar = res.data
            console.log(res.data)
            that.setData({
              avatar:avatar
            })
            console.log(that.data.avatar)
          },
          fail:function(res){
            console.log('fail: '+res.data)
          }
        })
      }
    })
  },
  updateAnke :function(e){
    var that = this;
    console.log(e.detail.value.avatar)
    wx.request({
      url: 'https://udtrokia.com/import',
      data: {
        avatar:that.data.avatar,
        name:e.detail.value.name,
        sex:e.detail.value.sex,
        age:e.detail.value.age,
        weChat:e.detail.value.weChat,
        hobby:e.detail.value.hobby,
        desire:e.detail.value.desire,
        work:e.detail.value.work,
        openId:app.globalData.userInfo.openId,
        whereStr:{
          openId:app.globalData.userInfo.openId
          },
        col:'ankeArr',
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
      url: '../posts/posts',
      success:()=>{
        console.log('redirectTo success')
      }
    })
  }
})