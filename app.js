//app.js
var util = require('utils/util.js')

App({
    onLaunch: util.checkSession(),
    globalData:{
       userInfo:{}
    },
})





