<template>
	<div id="index">
		<Tabbar></Tabbar>
	</div>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {
				// 手机号码
				mobileNumber: '',
				// 清楚按钮是否开启
				clearShow: false
			}
		},
		methods: {
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
			nextStep() {
				if (this.mobileNumber == '' || this.mobileNumber.length !==11) {
					return
				}
				
				// getUsers('post', {
				// 	mobileNumber: this.mobileNumber,
				// }).then((res) => {
				// 	if(res.success === true){
				// 		this.$router.push({
				// 			path:'/identifyCode',
				// 			name:'identifyCode',
				// 			params:{
				// 				identifyCode:res.identifyCode
				// 			}
				// 		})
				// 	}
				// })
			},
			wxNavigate(){
				this.$router.push({
					path:'/passLogin'
				})
			}
		},
		mounted() {
			// if(this.$cookieStore.getCookie('loginStatus')){
			// 	console.log('已登录')
			// }
			let _this = this
			// setTimeout(()=>{
			// 	_this.$store.dispatch('asetUserInfo',1)
			// },0)
			// this.$cookieStore.delCookie('loginStatus');
			// this.$cookieStore.setCookie('loginStatus',true,5)
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#index {
		width: 95%;
		height: 100%;
		padding: 0 2.5% 0 2.5%;
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
</style>
