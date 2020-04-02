<template>
	<div id="passLogin">
		<div slot="closeIcon" class="vanIcon">
			<van-icon name="arrow-left" size="25" class="closeIcon" @click="back"/>
		</div>
		<h3 class="title">密码登录</h3>
		<div class="formInput">
			<div>
				<label style="font-size: 0.18rem;position: absolute;top:0.17rem;z-index: 2;">+86</label><input type="text" v-model="mobileNumber"
				 class="mobileInput" @input="changeInput"><span v-show="clearShow">
					<van-icon name="clear" class="icon" size="20" @click="clearClick" /></span>
			</div>
			<div>
				<input type="text" v-model="mobileNumber"
				 class="mobilePassword" @input="changeInput" placeholder="请输入密码"><span v-show="clearShow">
					<van-icon name="clear" class="icon" size="20" @click="clearClick" /></span>
			</div>
		</div>
		<button type="button" class="regeister" @click="nextStep">登录</button>
		<div class="passLogin"><span style="font-size: 0.14rem;display: block;position: absolute;left: 0;">短信登录</span><span style="font-size: 0.14rem;display: block;position: absolute;right: 0;color: #5DD5C8;">忘记密码?</span></div>
		<div class="wxLogin"><span style="font-size: 0.18rem;display: block;">微信登录</span>
			<div class="imgDv"><img src="../../assets/img/wx.jpg" alt=""></div>
		</div>
		<div class="btscrect">阅读<span style="color: #5dd5c8;">《用户协议及隐私政策》</span></div>
	</div>
</template>

<script>
	import {
		getUsers
	} from '@/network/search.js'
	import store from '@/store/index.js'
	// import $axios from 'axios'
	export default {
		name: 'passLogin',
		data() {
			return {
				// 手机号码
				mobileNumber: '',
				mobilePassword: '',
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
				if (this.mobileNumber == '' || this.mobileNumber.length !== 11) {
					return
				}
				this.$router.push({
					path: '/identifyCode'
				})
				// getUsers('post', {
				// 	mobileNumber: this.mobileNumber,
				// }).then((res) => {
				// 	console.log(res)
				// })
			},
			back(){
				this.$router.back(-1)
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
	#passLogin {
		width: 95%;
		height: 100%;
		padding: 0 2.5% 0 2.5%;
	}
	.vanIcon{
		position: absolute;
		width: 0.3rem;
		height: 0.3rem;
		top:0.1rem
	}
	
	.closeIcon{
		display: block;
		/* position: absolute;
		width: 0.2rem;
		height: 0.2rem;
		right: 0;
		top: 0.2rem; */
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
		height: 0.7rem;
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

	.mobilePassword {
		outline: none;
		border: none;
		width: 100%;
		height: 0.4rem;
		font-size: 0.18rem;
		border-bottom: 1px solid #ccc;
		position: absolute;
		top: 0.8rem;
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
		position: relative;
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
