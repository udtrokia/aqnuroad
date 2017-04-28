

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
        if(data){
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
        }else{
          console.log('no data')
        }
      },
      fail:(res)=>{
        console.log('fail')
        console.log(res.data)
      },
      method: 'GET'
    })
  },
  chooseImage : function(e){
    var that = this;
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
            that.setData({
              avatar:avatar
            })
          },
          fail:function(res){
          }
        })
      }
    })
  },
  updateAnke :function(e){
    var that = this;
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
      method: 'GET',
      success:function(res){
        console.log(res)
        if(res.data==false){
          wx.showModal({
            title: '提示',
            content: '请注意用词',
          })
        }else{
          wx.showToast({
            title: '成功!',
            icon: 'success',
            duration: 1000,
            mask: true,
          })
          setTimeout(()=>{
            wx.navigateBack({
            })
          },1000)
        }
      }
    })
  }
})