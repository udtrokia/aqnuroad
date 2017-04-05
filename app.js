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
                        var reqSession = '';
                        try {
                            var value = wx.getStorageSync('session')
                            if (value) {
                                reqSession = value
                            }
                        } catch (e) {
                            console.log(e)
                        }
                        if(res.code){
                            console.log("rescode: "+res.code)
                            wx.request({
                                url: 'https://udtrokia.com/onLogin',
                                data: {
                                    code: res.code,
                                    'session' : reqSession
                                },
                                success: function(loginRes){
                                    try {
                                        wx.setStorageSync('session', loginRes.data)
                                    } catch (e) {    
                                        console.log(e);
                                    }
                                }
                            })
                            wx.getUserInfo({
                                success: function(res) {
                                    console.log(res.userInfo)
                                    var that = getApp()
                                    that.globalData.userInfo=res.userInfo;
                                },
                                complete:()=>{
                                    wx.redirectTo({
                                        url: '/pages/welcome/welcome',
                                    })
                                }
                            })
                        }
                    }                    
                })
                //重新登录    
            }
        });
    },
})





