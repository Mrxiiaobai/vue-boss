<template>
	<div id="loginCommon">
		<slot name="closeIcon"></slot>
		<h3 class="title">{{title}}</h3>
		<div class="formInput">
			<slot name='input'></slot>
			<slot name='input2'></slot>
		</div>
		<button type="button" class="regeister" @click="next">下一步</button>
		<div class="passLogin"><span style="font-size: 0.14rem;display: block;" @click="wxTo">{{passTitle}}</span></div>
		<slot name="wxLogin">
			
		</slot>
		<slot name="btscrect">
			
		</slot>
		<!-- <div class="wxLogin"><span style="font-size: 0.18rem;display: block;">微信登录</span><div class="imgDv"><img src="../../assets/img/wx.jpg" alt=""></div></div> -->
		<!-- <div class="btscrect">阅读<span style="color: #5dd5c8;">《用户协议及隐私政策》</span></div> -->
	</div>
</template>

<script>
	
	export default {
		name: 'loginCommon',
		data() {
			return {
				next:this.nextStep,
				wxTo:this.wxNavigate
				// 手机号码
				// mobileNumber: '',
				// 清楚按钮是否开启
				// clearShow:false
			}
		},
		props:{
			title:'',
			passTitle:'',
			nextStep:Function,
			wxNavigate:Function
		},
		methods: {
			
		},
		mounted(){
			console.log('loginCommon已加载')
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#loginCommon {
		width: 95%;
		height: calc(100% - 0.6rem);
		position: relative;
		padding: 0.6rem 2.5% 0 2.5%;
	}

	.title {
		display: block;
		font-weight: 400;
		font-size: 0.26rem;
		line-height: 0.32rem;
	}

	.formInput {
		position: relative;
		width: 100%;
		height: 0.2rem;
		/* margin-top: 0.6rem; */
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
	
	.passLogin{
		width: 100%;
		height: 0.2rem;
	}
	
	/* .wxLogin{
		position: absolute;
		text-align: center;
		width: 1rem;
		height: 1.5rem;
		bottom: 0.5rem;
		left: 50%;
		transform: translateX(-50%);
	} */
	
	.imgDv{
		position: relative;
		width: 1rem;
		height: 0.8rem;
		overflow: hidden;
	}
	.imgDv img{
		position: absolute;
		left: 0;
		top:0;
		width: 1rem;
		height: 0.7rem;
	}
	
	.btscrect{
		position: absolute;
		font-size: 0.14rem;
		bottom: 0.3rem;
		left: 50%;
		transform: translateX(-50%);
	}
	
	.icon{
		display: block;
		position: absolute;
		width: 0.2rem;
		height: 0.2rem;
		right: 0;
		top:0.2rem;
	}
</style>
