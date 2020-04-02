<template>
    <div id='tabbar'>
        <TabbarItem path='/index'  activeColor='black'>
			<div slot="img" v-show="$route.name=='index' ? false:true"><van-icon name="coupon-o" /></div>
			<div slot="img" v-show="$route.name=='index' ? true:false"><van-icon name="coupon" /></div>
            <div slot='tit'>职位</div>
        </TabbarItem>
        <TabbarItem path='/company' activeColor='black'>
			<div slot="img" v-show="$route.name=='company' ? false:true"><van-icon name="wap-home-o" /></div>
			<div slot="img" v-show="$route.name=='company' ? true:false"><van-icon name="wap-home" /></div>
            <div slot='tit'>公司</div>
        </TabbarItem>  
        <TabbarItem path='/message' activeColor='black'>
			<div slot="img" v-show="$route.name=='message' ? false:true"><van-icon name="chat-o" /></div>
			<div slot="img" v-show="$route.name=='message' ? true:false"><van-icon name="chat" /></div>
            <div slot='tit'>消息</div>
        </TabbarItem>  
        <TabbarItem path='/user' activeColor='black'>
			<div slot="img" v-show="$route.name=='user' ? false:true"><van-icon name="manager-o" /></div>
			<div slot="img" v-show="$route.name=='user' ? true:false"><van-icon name="manager" /></div>
            <div slot='tit'>我的</div>
        </TabbarItem>  
    </div>
</template>
<script>
export default {
    name:'tabbar',
    data(){
        return{

        }
    },
    methods:{
        
    },
    mounted(){
		console.log(this.$route.path)
    },
}
</script>
<style scoped>
	#tabbar{
		width: 100%;
		height: 0.5rem;
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
	}
	.tabbarItem{
		text-align: center;
		width: 25%;
		height: 100%;
	}
	.topTab{
		font-size: 0.18rem;
	}
	.botTab{
		font-size: 0.14rem;
	}
</style>