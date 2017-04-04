//app.js
App({
    globalData:{
       userInfo:{}
    },
    onLaunch: function() {
        wx.checkSession({
            success: function(res){
            //session 未过期，并且在本生命周期一直有效'
            console.log('unexpired')
                wx.getUserInfo({
                    success: function(res) {
                        var that = getApp()
                        that.globalData.userInfo=res.userInfo;
                        console.log(that.globalData.userInfo)
                    }
                })
            },
            fail: function(){
            //登录态过期
            console.log('session expired')
                wx.login({
                    success:function(res){
                        if(res.code){
                            console.log(res.code)
                            wx.request({
                                url: 'https://udtrokia.com/onLogin',
                                data: {
                                code: res.code
                                },
                                success: function(res){
                                    console.log('login success')
                                    console.log(res)
                                }
                            })
                            wx.getUserInfo({
                                success: function(res) {
                                    console.log(res.userInfo)
                                    var that = getApp()
                                    that.globalData.userInfo=res.userInfo;
                                }
                            })
                            wx.redirectTo({
                                url: '/pages/welcome/welcome',
                            })
                        }
                    }                    
                })
                //重新登录    
            }
        });
    }
})