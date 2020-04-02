<template>
	<div id="indexCommon" v-bind:style=indexStyle>
		<div class="header" v-bind:style=headerStyle ><slot name="header"></slot></div>
		<div class="middle"><slot name="middle"></slot></div>
		<div class="content"><slot name="content"></slot></div>
	</div>
</template>

<script>
	export default {
		name: 'indexCommon',
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
			headerColor:{
				type:String,
				default:'#5DD5C8'
			},
			indexColor:{
				type:String,
				default:'#fff'
			},
			nextStep:Function,
			wxNavigate:Function
		},
		computed: {
			headerStyle(){
				console.log(this.headColor)
				return {background:this.headerColor}
			},
			indexStyle(){
				return {background:this.indexColor}
			}
		},
		
		mounted(){
			console.log('loginCommon已加载')
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#indexCommon{
		height:calc(100% - 0.5rem);
	}
	.header{
		width: 95%;
		height: 0.6rem;
		font-size:0.15rem;
		padding: 0 2.5% 0 2.5%;
	}
	.middle{
		width: 95%;
		height: 0.4rem;
		padding: 0 2.5% 0 2.5%;
		font-size:0.15rem;
		line-height: inherit;
		background: #fff;
	}
	.content{
		width: 95%;
		position: relative;
		height: calc(100% - 1rem);
		padding: 0 2.5% 0 2.5%;
	}
</style>
