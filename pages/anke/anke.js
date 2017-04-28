
// pages/anke/anke.js
var app = getApp();


Page({
  data:{
    page:1,
    ankeArr:[]
  },
  onLoad:function(options){
    
    var that = this;
    getAnke(that)
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
    var page = that.data.page;
    console.log('onPullDownRefresh');
    that.setData({
      page : page,
      api:"refresh"
    })
    getAnke(that);
    wx.stopPullDownRefresh()
  },
  onReachBottom: function(){
    // Do something when page reach bottom.
    console.log('onReachBottom')
    var that = this;
    var page = that.data.page;
    if(that.data.ankeArr.length>=page*5){
      page = page+1
    }else{
      page = page
    }
    that.setData({
      page: page,
      api:"loadmore"
    })
    console.log(that.data.page)
    getAnke(that);
  },
  myCard: function(){
    wx.navigateTo({
      url:"myCard/myCard"
    })
  },
  ankeCard: function(e){
    var openId = e.target.dataset.openid;
    var anke = e.target.dataset.anke;
    wx.navigateTo({
      url: 'ankeCard/ankeCard?openId='+openId+'&anke='+anke
    })
  }
})

var getAnke = function(that){
  wx.request({
    url: 'https://udtrokia.com/export',
    data: {
      'col':'ankeArr',
        'page':that.data.page,
        'api':'refresh'      
    },
    method: 'GET', 
    success: function(res){
      that.setData({
        ankeArr:res.data
      })      
    }
  })
}

