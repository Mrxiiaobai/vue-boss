<template>
	<div id="chat">
		<IndexCommon headerColor="#fff" indexColor="#fcfcfc">
			<div slot="header" style="width: 100%;height: 0.6rem;line-height: 0.6rem;position: relative;">
				<div class="arrowLeft">
					<van-icon name="arrow-left" size="25" @click="goBack"/>
				</div>
				<div class="searchDv">
					<span style="font-size: 0.18rem;">张东</span>
					<span>历阅传媒-招聘者</span>
				</div>
			</div>
			<div slot="middle" style="display: flex;flex-direction: row;width: 100%;height: 0.4rem;line-height: 0.4rem;">
				<div class="iconMiddle">
					<van-icon name="phone-o" size="25" color="orange" /><span>换电话</span></div>
				<div class="iconMiddle">
					<van-icon name="chat-o" size="25" color="lime" /><span>换微信</span></div>
				<div class="iconMiddle">
					<van-icon name="description" size="25" color="green" /><span>发简历</span></div>
				<div class="iconMiddle">
					<van-icon name="close" size="25" color="hotpink" /><span>不感兴趣</span></div>
			</div>
			<div slot="content" style="width: 100%;height: 100%;overflow: scroll;">
				<scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller" style="overflow-y: scroll;">
					<div  class="chatDom" style="display: none;">
						<img src="" alt="" class="chatImg">
						<p class="chatText">1</p>
					</div>
					<div  v-bind:class="value.direction == 'right' ?'chatDomMe':'chatDom'" v-for="(value,index) in tableData">
						<img src="" alt="" v-bind:class="value.direction == 'right' ?'chatImgMe':'chatImg'">
						<p v-bind:class="value.direction == 'right' ? 'chatTextMe':'chatText'">{{value.essay}}</p>
					</div>
				</scroller>
			</div>
		</IndexCommon>
		<div class="footer">
			<!-- <div>常用语</div> -->
			<span>常用语</span>
			<input type="text" placeholder="新消息" v-model="newMessage">
			<span @click="sendTo">发送</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'chat',
		data() {
			return {
				// 手机号码
				mobileNumber: '',
				// 清楚按钮是否开启
				clearShow: false,
				leftChatDom:{'left':'0.1rem','float':'left'},
				rightChatDom:{'right':'0.1rem','float':'right'},
				noData: true,
				newMessage: '',
				MeId:'',
				id:this.$route.query.id,
				tableData: []
			}
		},
		sockets: {
			//这里是监听connect事件
			connect: function(data) {
				// 获取每台客服端生成的id
				this.websocketid = this.$socket.id;
			},
			// 监听断开连接，函数
			disconnect() {
				console.log('断开服务器连接');
			},
			// 服务端指定有msg监听的客服端，可接对应发来的收消息，data服务端传的消息
			message(data) {
				console.log(data)
				this.tableData.push({userId:data.toId,essay:data.msg,direction:data.direction})
				// localStorage.setItem('tableData',JSON.stringify(this.tableData))
			},
			sendToClient(data){
				console.log(data)
			}
		},
		methods: {
			
			sendTo() {
				if (this.newMessage == '') {
					this.$toast('内容不能为空')
					return
				}
				this.tableData.push({userId:this.$store.state.role.currentId,essay:this.newMessage,direction:'right'})
				// localStorage.setItem('tableData',JSON.stringify(this.tableData))
				this.$socket.emit('sentTo',{MeId:this.$store.state.role.currentId,toId:this.id,sub:this.newMessage})
				this.newMessage =''
			},
			changeInput() {
				if (this.mobileNumber !== "") {
					this.clearShow = true
				} else {
					this.clearShow = false
				}
			},
			clearClick() {
				this.mobileNumber = ''
				this.clearShow = false
			},

			// 下拉刷新
			refresh() {
				setTimeout(function() {
					this.$refs.my_scroller.finishPullToRefresh(); //刷新完毕关闭刷新的转圈圈
				}.bind(this), 1000)
			},

			/**
			 * 上拉获取
			 */
			infinite(done) {
				if (this.noData) {
					setTimeout(() => {
						this.$refs.my_scroller.finishInfinite(2);
					})
					return;
				}
			},
		},
		mounted() {
			let _this = this
			
			// 建立连接
			_this.$socket.emit('setConnect',{MeId:_this.$store.state.role.currentId})
		},
		created(){
			let _this = this
			// if(!localStorage.getItem('tableData')){
			// 	let tableData = []
			// 	localStorage.setItem('tableData',JSON.stringify(tableData))
			// }else{
			// 	_this.tableData = JSON.parse(localStorage.getItem('tableData'))
			// }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#chat {
		width: 100%;
		height: 100%;
	}

	.middle span {
		display: inline-block;
		margin-right: 0.2rem;
	}

	.title {
		font-weight: 400;
		font-size: 0.26rem;
		line-height: 0.32rem;
		margin-top: 0.6rem;
		/* color:; */
		position: relative;
	}

	.formInput {
		position: relative;
		width: 100%;
		height: 0.2rem;
	}

	.mobileInput {
		outline: none;
		border: none;
		width: 79%;
		height: 0.4rem;
		font-size: 0.18rem;
		border-bottom: 1px solid #ccc;
		position: absolute;
		top: 0.1rem;
		padding-left: 20%;
	}

	.regeister {
		width: 100%;
		height: 0.4rem;
		border-radius: 1px;
		font-size: 0.18rem;
		background: #5dd5c8;
		min-width: 104px;
		color: #fff;
		border: 0;
	}

	.passLogin {
		width: 100%;
		height: 0.2rem;
	}

	.wxLogin {
		position: absolute;
		text-align: center;
		width: 1rem;
		height: 1.5rem;
		bottom: 0.5rem;
		left: 50%;
		transform: translateX(-50%);
	}

	.imgDv {
		position: relative;
		width: 1rem;
		height: 0.8rem;
		overflow: hidden;
	}

	.imgDv img {
		position: absolute;
		left: 0;
		top: 0;
		width: 1rem;
		height: 0.7rem;
	}

	.btscrect {
		position: absolute;
		font-size: 0.14rem;
		bottom: 0.3rem;
		left: 50%;
		transform: translateX(-50%);
	}

	.icon {
		display: block;
		position: absolute;
		width: 0.2rem;
		height: 0.2rem;
		right: 0;
		top: 0.2rem;
	}

	.searchSpan {
		display: inline-block;
		width: 3rem;
		height: inherit;
		color: white;
		font-size: 0.2rem;
	}

	.searchDv {
		position: absolute;
		display: block;
		text-align: center;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 80%;
		height: 0.6rem;
		font-size: 0.12rem;
	}

	.searchDv span {
		position: absolute;
		display: block;
		width: 1rem;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.searchDv span:first-of-type {
		font-weight: 600;
		top: 0.2rem;
	}

	.searchDv span:nth-of-type(2) {
		top: 0.4rem;
	}

	.contentFlex {
		position: relative;
		height: 0.8rem;
		width: 95%;
		padding: 0 2.5% 0 2.5%;
		display: flex;
		flex-direction: row;
	}

	.contentLeft {
		position: relative;
		flex: 1.8;
		font-size: 0.16rem;
	}

	.contentLeft span {
		position: absolute;
		width: 0.2rem;
		height: 0.2rem;
		border-radius: 50%;
		background: red;
		color: #fff;
		text-align: center;
		line-height: inherit;
		right: 0.05rem;
		top: 0.1rem;
	}

	.contentLeft img {
		display: block;
		width: 0.5rem;
		height: 0.5rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		border: 1px solid #ccc;
	}

	.contentRight {
		position: relative;
		flex: 8.2;
		margin-left: 0.1rem;
	}

	.arrowLeft {
		width: 50px;
		display: inline-block;
	}

	.iconMiddle {
		flex: 1;
		text-align: center;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.iconMiddle span {
		position: absolute;
		display: inline-block;
		width: 100%;
		height: 0.2rem;
		line-height: 0.2rem;
		bottom: 0;
		font-size: 0.13rem;
	}

	.footer {
		width: 100%;
		height: 0.48rem;
		background: #fff;
		position: relative;
	}

	.footer input {
		width: 70%;
		height: 0.48rem;
		line-height: inherit;
		position: absolute;
		font-size: 0.18rem;
		top: 0;
		left: 20%;
		outline: none;
		border: none;
	}

	.footer span {
		display: block;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		text-align: center;
		height: 0.3rem;
		line-height: 0.3rem;
		color: #fff;
		width: 0.5rem;
		border-radius: 5px;
		font-size: 0.14rem;
	}

	.footer span:first-of-type {
		left: 0.1rem;
		background: #5dd5c8;
	}

	.footer span:nth-of-type(2) {
		right: 0.1rem;
		background: #5dd5c8;
	}

	.chatDom {
		position: relative;
		width: 80%;
		min-height: 0.4rem;
		height: auto;
		padding-left: 0.1rem;
		font-size: 0.18rem;
		float: left;
		left: 0.1rem;
		margin-bottom: 0.2rem;
		/* background: #fff; */
	}

	.chatDomMe {
		position: relative;
		width: 80%;
		min-height: 0.4rem;
		height: auto;
		padding-right: 0.1rem;
		font-size: 0.18rem;
		float: right;
		right: 0.1rem;
		margin-bottom: 0.2rem;
	}

	.chatImg {
		position: absolute;
		display: inline-block;
		width: 0.4rem;
		height: 0.4rem;
		left: 0;
		border: 1px solid #ccc;
		border-radius: 50%;
		background: #fff;
	}

	.chatImgMe {
		position: absolute;
		display: inline-block;
		width: 0.4rem;
		height: 0.4rem;
		right: 0;
		border: 1px solid #ccc;
		border-radius: 50%;
		background: #fff;
	}

	.chatTextMe {
		display: inline-block;
		/* position: absolute; */
		float: right;
		height: auto;
		padding: 0.1rem;
		margin: 0;
		margin-right: 0.5rem;
		width: auto;
		font-size: 0.18rem;
		word-break: break-word;
		background: #fff;
	}

	.chatText {
		display: inline-block;
		/* position: absolute; */
		height: auto;
		padding: 0.1rem 0.1rem;
		margin: 0;
		margin-left: 0.4rem;
		width: auto;
		font-size: 0.18rem;
		word-break: break-word;
		background: #fff;
	}
</style>
