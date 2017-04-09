function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

<<<<<<< HEAD

function checkSession(){
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
                        console.log("reqSession:"+reqSession)
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
                                console.log("loginres"+loginRes.data)
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
        }
            //重新登录    
    })
}


module.exports = {
  formatTime: formatTime,
  checkSession : checkSession
}
=======
module.exports = {
  formatTime: formatTime
}
>>>>>>> origin/master
