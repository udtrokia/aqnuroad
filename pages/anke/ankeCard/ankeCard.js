// pages/anke/myCard/myCard.js
var app = getApp();
Page({
  data:{
    avatar:'/lib/anke.png',
    name:null,
    sex:null,
    age:null,
    weChat:null,
    hobby:null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    var that = this;
    wx.request({
      url: 'https://udtrokia.com/export',
      data: {
        col :'ankeArr',
        api :"select",
        whereStr :{"openId":options.openId}        
      },
      success:function(res){
        if(res.data){
          var data = res.data[0]
          that.setData({
            name:data.name,
            sex:data.sex,
            age:data.age,
            hobby:data.hobby,
            avatar:data.avatar,
            desire:data.desire,
            work:data.work,
            weChat:data.weChat
          })
        }
      },
      fail:function(res){
        console.log('failfailfaiififififi')
      },
      method: 'GET'
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
  }
})
