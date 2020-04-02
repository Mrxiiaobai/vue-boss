<template>
	<div class="selectType">
		<div class="vanIcon">
			<van-icon name="cross" size="25" class="closeIcon" @click="back"/>
		</div>
		<div class="content">
			<van-button type="primary" class="fBtn" @click="goIndex(1)">牛人</van-button>
			<van-button type="info" class="sBtn" @click="goIndex(2)">BOSS</van-button>
		</div>
	</div>
</template>

<script>
	import {
		updateType
	} from '@/network/search.js'
	import store from '@/store/index.js'
	// import $axios from 'axios'
	export default {
		name: 'selectType',
		data() {
			return {
				
			}
		},
		methods: {
			back(){
				this.$router.back(-1)
			},
			goIndex(role){
				let _this = this
				console.log(_this.$store.state.role.currentId)
				updateType('POST',{
					currentId:_this.$store.state.role.currentId,
					// 1为牛人，2为boss
					type:role
				}).then(res=>{
					new Promise((resolve,reject)=>{
						_this.$store.dispatch('asetUserId',{
							currentId:res.currentId,
							type:role
						})
						resolve()
					}).then((resolve,reject)=>{
						_this.$router.push({
							path:'/index'
						})
					})
					
				})
			}
		},
		mounted() {
			let _this = this
			console.log(_this.$store.state.role)
		},
		// created(){
			
		// }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.vanIcon{
		position: absolute;
		width: 0.3rem;
		height: 0.3rem;
		top:0.1rem;
	}
	.closeIcon{
		display: block;
		/* position: absolute;
		width: 0.2rem;
		height: 0.2rem;
		right: 0;
		top: 0.2rem; */
	}
	.content{
		width:100%;
		height: 80%;
		position: absolute;
		top: 10%;
	}
	.fBtn{
		position: absolute;
		width: 50%;
		left: 50%;
		bottom: 60%;
		transform: translateX(-50%);
	}
	.sBtn{
		position: absolute;
		width: 50%;
		left: 50%;
		bottom: 40%;
		transform: translateX(-50%);
	}
	.selectType{
		width: 100%;
		height: 100vh;
		background: #5dd5c8;
		position: relative;
	}
	.regeister {
		position: absolute;
		bottom: 10%;
		width: 90%;
		left: 5%;
		height: 0.4rem;
		border-radius: 1px;
		font-size: 0.18rem;
		background: #5dd5c8;
		min-width: 104px;
		color: #fff;
		border: 0;
	}

</style>
