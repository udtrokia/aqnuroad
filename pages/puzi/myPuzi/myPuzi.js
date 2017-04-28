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
        whereStr :{"openId":app.globalData.userInfo.openId}        
      },
      success:function(res){
        var data = res.data[0]
        if(data){
          that.setData({
            avatar : data.avatar,
            staff:data.staff,
            'require':data.require,
            detail:data.detail,
            weChat:data.weChat
          })
        }else{
          console.log('no data')
        }
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
        if(res.data==false){
          wx.showModal({
            title: '提示',
            content: '请注意用词',
          })
        }else{
          wx.showToast({
            title: '成功!',
            icon: 'success_no_circle',
            mask:true,
            duration: 1000
          })
          setTimeout(()=>{
            wx.navigateBack({
            })
          },1000)
        }
      },
      method: 'GET',
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
