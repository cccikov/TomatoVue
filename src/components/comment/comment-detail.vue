<template lang="pug">
	div.comment-detail
		span 共{{total}}条
</template>



<script>
export default {
	name:'comment-detail',
	props:["total","pageIndex","pageSize"],
	computed:{
		totalPage:function(){
			return Math.ceil(this.total/this.pageSize)
		}
	}
}
</script>





<style lang="less" scoped>
	.comment-detail{
		text-align: right;
		padding:5px 0;
		span{
			font-size: 12px;
			color:#868683;
			margin-right: 5px;
		}
	}
</style>