<template>
	<LoginCommon title="输入短信验证码" passTitle="语音接听验证码" v-bind:nextStep="nextStep" v-bind:wxNavigate="wxNavigate">
		<div slot="closeIcon" class="vanIcon">
			<van-icon name="cross" size="25" class="closeIcon" @click="back"/>
		</div>
		<div slot="input">
			<input type="text" class="inputCode" v-model="code1" @input="inputCode('code1')" ref="input1">
			<input type="text" class="inputCode" v-model="code2" @input="inputCode('code2')" ref="input2">
			<input type="text" class="inputCode" v-model="code3" @input="inputCode('code3')" ref="input3">
			<input type="text" class="inputCode" v-model="code4" @input="inputCode('code4')" ref="input4" :disabled="inputDisabled">
		</div>
		<div slot="wxLogin" class="wxLogin">重新发送<span v-show="dtime">({{Dtime}})</span></div>
	</LoginCommon>
</template>

<script>
	import {
		saveUsers
	} from '@/network/search.js'
	import store from '@/store/index.js'
	// import $axios from 'axios'
	export default {
		name: 'identifyCode',
		data() {
			return {
				code1:'',
				code2:'',
				code3:'',
				code4:'',
				Dtime:60,
				inputDisabled:false,
				timeId:'',
				dtime:true,
				user:''
			}
		},
		methods: {
			nextStep() {
				let _this = this
				let coder = String(_this.code1)+String(_this.code2)+String(_this.code3)+String(_this.code4)
				if(coder == _this.$route.query.identifyCode){
					saveUsers('post',{
						mobileNumber:_this.$route.query.mobileNumber
					}).then((res)=>{
						console.log(res)
						if(res.type !== ''){
							new Promise((resolve,reject)=>{
								_this.$store.dispatch('asetUserId',{
									currentId:res.currentId,
									type:res.type
								})
								resolve()
							}).then((resolve,reject)=>{
								_this.$router.push({
									path:'/index'
								})
							})
							return
						}
						new Promise((resolve,reject)=>{
							_this.$store.dispatch('asetUserId',{
								currentId:res.currentId,
								type:''
							})
							resolve()
						}).then((resolve,reject)=>{
							_this.$router.push({
								path:'/selectType'
							})
						})
						
						
					})
				}
			},
			back(){
				this.$router.back(-1)
			},
			wxNavigate(){
				console.log("暂不支持该功能")
			},
			inputCode(code,input){
				switch(code){
					case 'code1':
						if(this.code1.length==1){
							this.$refs.input2.focus()
						}
						break;
					case 'code2':
						if(this.code2.length==1){
							this.$refs.input3.focus()
						}
						break;
					case 'code3':
						if(this.code3.length==1){
							this.$refs.input4.focus()
						}
						break;
					case 'code4':
						if(this.code3.length==1){
							this.inputDisabled = true
						}
						break;
				}
				
				
			},
		},
		mounted() {
			let _this = this
			clearInterval(_this.timeId)
			_this.timeId=setInterval(()=>{
				if(_this.Dtime==0){
					_this.Dtime = ''
					_this.dtime = false
					clearInterval(_this.timeId)
					return
				}
				_this.Dtime--
			},1000)
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
	
	.inputCode{
		outline: none;
		border: none;
		width: 20%;
		height: 0.4rem;
		font-size: 0.18rem;
		border-bottom: 1px solid #ccc;
		position: absolute;
		top: 0.1rem;
		text-align: center;
		/* padding-left: 20%; */
	}
	.inputCode:first-of-type{
		left: 2%;
	}
	.inputCode:nth-of-type(2){
		left: 27%;
	}
	.inputCode:nth-of-type(3){
		left: 52%;
	}
	.inputCode:nth-of-type(4){
		left: 77%;
	}
	input:disabled {
	    color: black;
	    background-color: white;
	}
	.wxLogin{
		position: absolute;
		top: 2.1rem;
		left: 50%;
		transform: translateX(-50%);
		font-size: 0.18rem;
	}
</style>
