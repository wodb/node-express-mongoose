const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

const config = require('./config/config')
const router = require('./router')

// 开启服务器连接
mongoose.connect(config.database)
// 开启监听事件
mongoose.connection.on('connected',() => {
	console.log(`成功开启服务器:${config.database}`)
})

// 设置模版引擎
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'/views'))

// 设置插件 解析请求体
app.use(bodyParser.urlencoded({extended:false}));

// 设置静态文件
app.use(express.static(path.join(__dirname,'/public')))

// 路由
router(app)

app.listen(config.port,'192.168.2.179',(err) => {
	if (err) console.log(`err:${err}`)
	console.log(`server is running:${config.port}`)
})