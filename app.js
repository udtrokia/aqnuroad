//app.js
var util = require('utils/util.js')
var app = getApp();
App({
    onLaunch: util.checkSession(),
    globalData:{
       userInfo:null
    },
})





