// pages/anke/myCard/myCard.js
var app = getApp();
Page({
  data:{
    avatar:'/lib/anke.png',
    'resquire':null,
    staff:null,
    detail:null,
    weChat:null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options)
    var that = this;
    wx.request({
      url: 'https://udtrokia.com/export',
      data: {
        col :'puziArr',
        api :"select",
        whereStr :{"openId":options.openId}        
      },
      success:function(res){
        var data = res.data[0]
        that.setData({
          avatar:data.avatar,
          staff:data.staff,
          detail:data.detail,
          'require':data.require,
          weChat:data.weChat
        })
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
