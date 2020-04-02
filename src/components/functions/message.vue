<template>
	<div id="message">
		<IndexCommon>
			<div slot="header" style="width: 100%;height: 0.6rem;line-height: 0.6rem;position: relative;">
				<div class="searchDv">
					<div class="searchSpan"><span style="width: 0.5rem;display: inline-block;">聊天</span><span style="width: 1rem;display: inline-block;">互动</span></div>
				</div>
			</div>
			<div slot="middle" style="width: 100%;height: 0.4rem;line-height: 0.4rem;border-bottom: 1px solid #ccc;"><span>全部</span><span>招呼</span><span>沟通中</span></div>
			<div slot="content" style="width: 100%;height: 100%;overflow: scroll;">
				<scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller" style="overflow-y: scroll;">
					<div v-for="(value,index) in data" class="contentFlex" @click="goChat(value.id)">
						<div class="contentLeft">
							<img src="" alt=""><span>1</span>
						</div>
						<div class="contentRight">
							<p style="font-size: 0.16rem;font-weight: 600;margin:0.15rem 0 0.1rem 0;position: relative;"><span style="margin-right: 0.1rem;">{{value.username}}</span><span
								 style="position:absolute;font-weight: 400;font-size:0.12rem;color:#ccc;top: 0;">历阅传媒-招聘者</span><span style="position: absolute;font-size: 0.12rem;font-weight: 400;color: #ccc;right: 0;">12:00</span></p>
							<p style="font-size: 0.16rem;margin:0.1rem 0 0.1rem 0;color: #aaa;">[<span>送达</span>]您好，看了您的招聘信息...</p>
						</div>
					</div>
				</scroller>
			</div>
		</IndexCommon>
		<Tabbar></Tabbar>
	</div>
</template>

<script>
	export default {
		name: 'message',
		data() {
			return {
				// 手机号码
				mobileNumber: '',
				noData: true,
				// 清楚按钮是否开启
				clearShow: false,
				data: [],
				companyData: [{
						id: "5e74ae786af9db3b9cc87493",
						username: '陈先生'
					}, {
						id: "5e74ae786af9db3b9cc87493",
						username: '陈先生1'
					},
					{
						id: "5e74ae786af9db3b9cc87493",
						username: '陈先生2'
					}, {
						id: "5e74ae786af9db3b9cc87493",
						username: '陈先生3'
					}
				],
				userData: [{
						id: "5e749d86dcfcb52ed4d60c34",
						username: '用户1'
					}, {
						id: '5e749d86dcfcb52ed4d60c34',
						username: '用户2'
					},
					{
						id: '5e749d86dcfcb52ed4d60c34',
						username: '用户3'
					}, {
						id: '5e749d86dcfcb52ed4d60c34',
						username: '用户4'
					}
				]
			}
		},
		methods: {
			// 下拉刷新
			refresh() {
				// this.noData=false;
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
			goChat(id) {
				this.$router.push({
					path: '/chat',
					query: {
						id: id
					}
				})
			}
		},
		mounted() {
			let _this = this
			if (_this.$store.state.role.userType == 1) {
				_this.data = _this.companyData
			}
			if(_this.$store.state.role.userType == 2){
				_this.data = _this.userData
			}
			// _this.$socket.emit('setConnect',{MeId:_this.$store.state.role.currentId})
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#message {
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
		display: inline-block;
		width: 75%;
		height: 0.6rem;
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
</style>
