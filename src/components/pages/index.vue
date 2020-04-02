<template>
	<div id="index">
		<IndexCommon>
			<div slot="header" style="width: 100%;height: 0.6rem;line-height: 0.6rem;position: relative;">
				<div class="searchDv"><div class="searchSpan"><span style="width: 1rem;display: inline-block;" v-for="value in 4">web前端</span></div></div>
				<div style="display: inline-block;position: absolute;right: 0;">
					<span style="display: inline-block;height:0.6rem;" @click="add"><van-icon name="plus" size="25" color="white" style="position: absolute;top:0.2rem;right: 0.4rem;"/></span>
					<span style="display: inline-block;height:0.6rem;" @click="search"><van-icon name="search" size="25"color="white" style="position: absolute;top:0.2rem;right: 0rem;"/></span>
				</div>
				
			</div>
			<div slot="middle" style="width: 100%;height: 0.4rem;line-height: 0.4rem;border-bottom: 1px solid #ccc;"><span>推荐</span><span>附近</span><span>最新</span></div>
			<div slot="content" style="width: 100%;height: 100%;overflow: scroll;">
				<scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller" style="overflow-y: scroll;">
					<div v-for="(value,index) in 10" class="contentFlex">
						<p style="font-size: 0.16rem;font-weight: 600;margin:0.15rem 0 0.1rem 0;position: relative;"><span>web前端工程师</span><span style="position: absolute;right: 0;color: #5DD5C8;">10-15K·13薪</span></p>
						<p style="font-size: 0.16rem;margin:0.1rem 0 0.1rem 0;"><span>雷度网络</span>&nbsp;&nbsp;B轮<span></span></p>
						<p style="font-size: 0.12rem;margin:0.1rem 0 0.1rem 0;" class="bgSpan"><span>浦东新区&nbsp;张江</span>&nbsp;<span>1-3年</span>&nbsp;<span>大专</span></p>
						<p style="font-size: 0.12rem;margin:0.15rem 0 0.1rem 0;"><img src="" alt="" class="headerImg">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>胡强</span>·<span>联合创始人</span></p>
					</div>
				</scroller>
			</div>
		</IndexCommon>
		<Tabbar></Tabbar>
	</div>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {
				noData: true
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
			add(){
				console.log('add')
			},
			search(){
				console.log('search')
			}
		},
		mounted() {
			let _this = this
			console.log(_this.$store.state.role)
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#index {
		width: 100%;
		height: 100%;
	}

	.middle span {
		display: inline-block;
		margin-right: 0.2rem;
	}

	.contentFlex {
		position: relative;
		height: 1.25rem;
		width: 95%;
		padding: 0 2.5% 0 2.5%;
		border-bottom: 5px solid #FAFAFA;
	}
	.searchSpan{
		display: inline-block;
		width: 3rem;
		height: inherit;
		color: white;
		font-size: 0.2rem;
	}
	.searchDv{
		 display: inline-block;
		 width: 75%;
		 overflow-x: scroll;
		 overflow-y:hidden;
		 height: 0.6rem;
	}
	.searchDv::-webkit-scrollbar {display:none}
	
	.headerImg{
		display: inline-block;
		width: 0.25rem;
		height: 0.25rem;
		border-radius: 50%;
		border: 1px solid #ccc;
		position: absolute;
		transform: translateY(-25%);
		
	}
	.salarySpan{
		position: absolute;
		display: inline-block;
		font-size: 0.16rem;
		right: 0;
	}
	.bgSpan span{
		background:#ECECEC;
		padding: 0.03rem;
		border-radius: 3px;
	}
</style>
