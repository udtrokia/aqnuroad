//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js')

Page({
  data: {
    page:1,
    api:null,
    talkArr : []
  },
  //事件处理函数
  onLoad: function () {
    var app = getApp();
    var that = this;
    console.log('onload');
    getPosts(that);

  },
  onPullDownRefresh: function() {
    // Do something when pull down.
    var that = this;
    var page = that.data.page
    console.log('onPullDownRefresh')
    that.setData({
      page : page,
      api:"refresh"
    })
    getPosts(that);
    wx.stopPullDownRefresh()
  },
  onReachBottom: function(){
    // Do something when page reach bottom.
    console.log('onReachBottom')
    var that = this;
    var page = that.data.page;
    if(that.data.talkArr.length>=page*5){
      page = page+1
    }else{
      page = page
    }
    that.setData({
      page: page,
      api:"loadmore"
    })
    console.log(that.data.page)
    getPosts(that);
  },
  toControl:function(){
    console.log('toControl')
    if(app.globalData.userInfo.nickName!=null){
      wx.navigateTo({
        url:"control/control"
      })
    }else{
      util.login();
    }
  },
  onShareAppMessage: function () {
    return {
      title: '安客铺子',
      path: '/page/talk/talk',
    }
  } 
})

var getPosts = function(that){
    wx.request({
      url: 'https://udtrokia.com/export', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json'
      },
      data:{
        'col':'talkArr',
        'page':that.data.page,
        "api" : "refresh"
      },
      success: function(res) {
        console.log(res.data)
        that.setData({talkArr:res.data})
      }
    })
  } 