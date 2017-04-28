// pages/anke/anke.js
var app = getApp();


Page({
  data:{
    page:1,
    puziArr:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    // console.log(app.globalData.userInfo)
    getPuzi(that)
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
  onPullDownRefresh: function() {
    // Do something when pull down.
    var that = this;
    var page = that.data.page
    console.log('onPullDownRefresh')
    that.setData({
      page : page,
      api:"refresh"
    })
    getPuzi(that);
    wx.stopPullDownRefresh()
  },
  onReachBottom: function(){
    // Do something when page reach bottom.
    console.log('onReachBottom')
    var that = this;
    var page = that.data.page;
    if(that.data.puziArr.length>=page*5){
      page = page+1
    }else{
      page = page
    }
    that.setData({
      page: page,
      api:"loadmore"
    })
    console.log(that.data.page)
    getPuzi(that);
  },
  myPuzi: function(){
    wx.navigateTo({
      url:"myPuzi/myPuzi"
    })
  },
  ankePuzi: function(e){
    var openId = e.target.dataset.openid
    var puzi = e.target.dataset.puzi
    wx.navigateTo({
      url: 'ankePuzi/ankePuzi?openId='+openId
    })
  }
})
var getPuzi = function(that){
  wx.request({
    url: 'https://udtrokia.com/export',
    data: {
      'col':'puziArr',
        'page':that.data.page,
        'api':'refresh'      
    },
    method: 'GET', 
    success: function(res){
      that.setData({
        puziArr:res.data
      })      
    }
  })
}

