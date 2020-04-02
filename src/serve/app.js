var express = require('express')
var mongoose = require('mongoose')
var app = express()
var sms = require('./sms');
var bodyParser = require('body-parser'); //bodyParser中间件用来解析http请求体var 

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


urlencodedParser = bodyParser.urlencoded({
	extended: false
});

app.use(bodyParser.json()); //数据格式化
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/User', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, (err, db) => {
	if (err) throw err;
	console.log('数据库连接成功');
})

var userSchema = new Schema({
	username: String,
	mobileNumber: String,
	password: String,
	type: String
})

var offUserSchema = new Schema({
	offId: String,
	offtoId: String,
	offMsg: String,
})

// 第一个参数表示数据库名称,var User   mongodb会自动把User转化为小写复数作为表名users
var User = mongoose.model('User', userSchema)
var OffUser = mongoose.model('OffUser', offUserSchema)
// var admin = new User({
// 	username:'admin',
// })	

// User.find({username:'admin'},(err,ret)=>{
// 	if(err){
// 		throw err
// 	}else{
// 		console.log(ret[0]._id)
// 	}
// })

mongoose.Promise = global.Promise

app.all("*", function(req, res, next) {
	//设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin", "*");
	//允许的header类型
	res.header("Access-Control-Allow-Headers", "content-type");
	//跨域允许的请求方式 
	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
	if (req.method.toLowerCase() == 'options')
		res.send(200); //让options尝试请求快速结束
	else
		next();
})
var timestamp = new Date().getTime();

// 发送验证码
app.post('/login', (req, res) => {
	console.log('调login api')
	res.json({
		success: true,
		msg: '成功',
		code: 1,
		data: '已发送验证码',
		identifyCode: parseInt(Math.random() * 8999 + 1000)
	})
})
// 	User.find({
// 		mobileNumber: req.body.mobileNumber
// 	}, (err, data) => {
// 		if (err) {
// 			throw err
// 		} else {
// 			// 用户不存在,注册操作
// 			if (data == '') {
// 				// new Promise((resolve, reject) => {
// 				// 	var admin = new User({
// 				// 		username:timestamp,
// 				// 		mobileNumber:req.body.mobileNumber,
// 				// 		password:''
// 				// 	})
// 				// 	admin.save((err, ret) => {
// 				// 		if (err) {
// 				// 			throw err
// 				// 		} else {

// 				// 		}
// 				// 	}) 
// 				// 	resolve()
// 				// }).then((resolve,reject)=>{
// 				// 	// 0表示可以验证码登录
// 				res.send({
// 					success: true,
// 					data: '不存在该用户,跳转到验证码,已发送',
// 					code: 0,
// 					msg: '成功',
// 					identifyCode: '1234'
// 				})
// 				// })
// 				// res.json({
// 				// 	success: true,
// 				// 	msg: '成功',
// 				// 	data: '已发送验证码',
// 				// 	identifyCode: '1234'
// 				// })
// 			} else {
// 				// 存在该用户
// 				res.json({
// 					success: true,
// 					msg: '成功',
// 					code: 1,
// 					data: '已发送验证码',
// 					identifyCode: '1234'
// 				})
// 				// var phone = req.body.mobileNumber,
// 				// 	templateId = '541841',
// 				// 	params = ['5678'];
// 				// sms(phone, templateId, params).then(function() {
// 				// 	res.json({
// 				// 		success: true,
// 				// 		msg: '成功',
// 				// 		data: '已发送验证码',
// 				// 		identifyCode: params[0]
// 				// 	})
// 				// }).catch(function(err) {
// 				// 	res.json({
// 				// 		success: false,
// 				// 		msg: '失败',
// 				// 		data: '验证码发送失败'
// 				// 	})
// 				// })
// 				// 2表示可以选择多种登录方式
// 				// res.send({data:'存在该用户,可选择验证码或密码登录',canpass:'ok',code:1})
// 			}
// 		}
// 	})

// 是否存在该用户
app.post('/index', (req, res) => {
	// 调index api
	User.find({
		mobileNumber: req.body.mobileNumber
	}, (err, ret) => {
		if (err) {
			throw err
		} else {
			if (ret == '') {
				new Promise((resolve, reject) => {
					var admin = new User({
						username: timestamp,
						mobileNumber: req.body.mobileNumber,
						password: '',
						type: 0
					})
					admin.save((err, ret) => {
						if (err) {
							throw err
						} else {
							console.log(ret)
							resolve(ret._id)
						}
					})
				}).then((resolve, reject) => {
					console.log(resolve)
					res.send({
						success: true,
						data: '不存在该用户',
						code: 1,
						msg: '成功',
						currentId: resolve,
						type: 0
					})
				})
			} else {
				res.send({
					success: true,
					data: '存在该用户',
					code: 1,
					msg: '成功',
					currentId: ret[0]._id,
					type: ret[0].type
				})
			}
		}
	})

})

// 更新type
app.post('/save', (req, res) => {
	// 调save api
	User.findByIdAndUpdate(
		req.body.currentId, {
			// 要更新的参数,
			// type:1为牛人，2为boss
			type: req.body.type
		}, {
			new: true
		}, (err, ret) => {
			if (err) {
				throw err
			} else {
				console.log(ret)
				res.send({
					success: true,
					data: '更新成功',
					code: 1,
					msg: '成功',
					currentId: ret._id
				})
			}
		})
})
// app.post('/sms',function(req,res,next){
//     //1.提供模版ID
//     var phone = req.body.phone,templateId = req.body.templateId,params = req.body.params.split('_');
//     sms(phone,templateId,params).then(function(){
//         res.json({success : true,msg : '成功'})
//     }).catch(function(err){
//         res.json({success : false,msg : '失败'})
//     })
// })

// 在线用户及id {a:'sdaadwar'}
let connIds = {}
// 在线用户 ['a']
let idArr = []
io.on('connection', socket => {
	// 监听客户端打开页面发起连接
	socket.on("setConnect", data => {
		// 获取连接的用户
		let MeId = data.MeId
		// 放在在线用户数组中
		idArr.push(MeId)
		// 放在在线用户对象中
		connIds[MeId] = socket.id
		
		OffUser.find({
			offtoId:MeId
		}, (err, ret) => {
			if (err) {
				throw err
			} else {
				for (let j = 0; j < ret.length; j++) {
					io.sockets.connected[socket.id].emit('message', {
						'MeId': ret[j].offId,
						'toId': ret[j].offtoId,
						'msg': ret[j].offMsg,
						'direction': 'left'
					});
				}
			}
		})

		console.log(connIds)

	});
	// 监听用户点击发送过来的消息
	socket.on("sentTo", data => {
		// 获取发往对方的id a
		let toId = data.toId

		// 对方用户已连接
		if (io.sockets.connected[connIds[toId]]) {
			console.log('对方用户已连接')
			io.sockets.connected[connIds[toId]].emit('message', {
				'MeId': data.MeId,
				'toId': toId,
				'msg': data.sub,
				'direction': 'left'
			});

			// 对方用户未连接	
		} else {
			console.log('对方用户未连接')
			// 存进离线id数组中
			// 并把该发送的信息及id存进数据库
			var offUser = new OffUser({
				offId: data.MeId,
				offtoId: toId,
				offMsg: data.sub,
			})
			offUser.save((err, ret) => {
				if (err) {
					throw err
				} else {
					console.log(ret)
				}
			})
		}
	});

	socket.on('disconnect', function() {
		// connIds.splice(connIds.indexOf(socket.id),1)
		idArr.forEach(item => {
			if (connIds[item] == socket.id) {
				delete connIds[item]
				idArr = idArr.slice(item, 1)
			}
		})
		console.log(connIds)
		// connIds[]
		console.log(socket.id, "连接断开");
	});
});

// 监听连接断开事件
// io.on("disconnect", () => {
// 	console.log("连接已断开...");
// });


server.listen(3000, () => {
	console.log('服务器3000端口已开启')
})
