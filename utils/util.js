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


function checkSession(){
    wx.checkSession({
        success: function(res){
        //session 未过期，并且在本生命周期一直有效'
            console.log('unexpired')
            var app = getApp();
            app.globalData.userInfo = wx.getStorageSync('userInfo');
            console.log(app.globalData.userInfo);
        },
        fail: function(){
        //登录态过期
            console.log('session expired')
            login();
        }
            //重新登录    
    })
}

function login(){
    wx.login({
        success:function(loginRes){
            var reqSession = '';
            var encryptedData = '';
            var iv ='';

            try {
                var value = wx.getStorageSync('session')
                if (value) {
                    console.log("getSession storage")
                    reqSession = value
                }
            } catch (e) {
                console.log('not session storge: '+e)
            }
            wx.getUserInfo({
                success: function(userRes) {
                    var app = getApp()

                    if(loginRes.code){
                        console.log("rescode: "+loginRes.code)
                        console.log("reqSession:"+reqSession)
                        wx.request({
                            url: 'https://udtrokia.com/onLogin',
                            data: {
                                'code': loginRes.code,
                                'session' : reqSession,
                                'encryptedData':userRes.encryptedData,
                                'iv':userRes.iv
                            },
                            success: function(reqRes){
                                try {
                                    wx.setStorageSync('session', reqRes.data.session)
                                    wx.setStorageSync('userInfo', reqRes.data.userInfo)
                                    app.globalData.userInfo = reqRes.data.userInfo
                                } catch (e) {    
                                    console.log(e);
                                }
                            },
                            complete:()=>{
                                var app=getApp();
                                wx.showToast({
                                    title: 'hello '+app.globalData.userInfo.nickName,
                                    icon: 'success_no_circle',
                                    mask: true,
                                    duration: 2000
                                })
                            }
                        })
                    }
                },
            })
        }                    
    })    
}


module.exports = {
  formatTime: formatTime,
  checkSession : checkSession
}