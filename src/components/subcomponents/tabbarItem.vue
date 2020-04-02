<template>
    <div class="tabbarItem" @click="go(path)">
        <div class="topTab"><slot name='img'></slot></div>
        <div class="botTab" :style=activeStyle><slot name='tit'></slot></div>
    </div>
</template>
<script>
export default {
    name:'TabBarItem',
    data(){
        return{
            
        }
    },
   
    methods:{
        go(path){
            console.log(path)
            this.$router.replace({
                path:path,
				// name:
                // query页面上会有地址，params没有地址
                // query:{
                //     id:'111'
                // }
                // params要有name
                // name:'index',
                // params:{
                //     id:'111'
                // }
            })
        }
    },
    props:{
        path:String,
        activeColor:{
            type:String,
            default:'red'
        },
        isActive:true
    },
    computed:{
        activeStyle(){
            console.log(this.activeColor)
            return {color:this.activeColor}
        }
    }
}
</script>
<style scoped>
	.topTab{
		width: 100%;
		height: 0.3rem;
		font-size: 0.3rem;
	}
	.botTab{
		width: 100%;
		height: 0.1rem;
		font-size: 0.12rem;
	}
</style>