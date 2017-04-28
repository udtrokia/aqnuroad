//index.js
//获取应用实例
var app = getApp();

Page({
  data: {
    page:1,
    refresh:true,
    postArr : []
  },
  //事件处理函数
  onLoad: function () {
    var that = this;
    wx.setNavigationBarTitle({
      page : 1,
      title: 'Leslie'
    })
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
      resfresh:false
    })
    getPosts(that);
    wx.stopPullDownRefresh()
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
    console.log('onReachBottom')
    var that = this;
    var page = that.data.page;
    if(that.data.postArr.length>=page*5){
      page = page+1
    }else{
      page = page
    }
    that.setData({
      page: page,
      refresh:false
    })
    console.log(that.data.page)
    getPosts(that);
  },
  toControl:function(){
    console.log('toControl')
    wx.navigateTo({
      url:"/pages/control/control"
    })
  }
})

var getPosts = function(that){
    wx.request({
      url: 'https://udtrokia.com/export', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json'
      },
      data:{
        'page':that.data.page,
        'refresh':that.data.refresh
      },
      success: function(res) {
        console.log(res.data)
          that.setData({postArr:res.data})
      }
    })
  } 

