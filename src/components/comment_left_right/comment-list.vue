<template lang="pug">
	div.comment-list
		.comment-block(v-for="item in copy_list")
			single-comment(v-for="s_item in item",:data="s_item",key="s_item.index")
</template>





<script>
import SingleComment from './single-comment.vue'
export default {
	name:'comment-list',
	computed:{
		copy_list(){
			let arr = [],
				arr_item;
			
			for( let i=0; i<this.totalPage; i++){
				arr_item = []
				for( let j=i*this.size; j<(i+1)*this.size&&j<this.list.length; j++){
					
					this.list[j].index = j;
					arr_item.push(this.list[j])
				
				}
				arr.push(arr_item)
			}
			return arr
		}
	},
	components:{
		SingleComment
	},
	props:["list","size","totalPage"]
}
</script>





<style lang="less" scoped>
@import '../commonStyle/common.less';
.comment-list{
	width:9999px;
	.clearfix;
	left:0;
	position: relative;
	.comment-block{
		width:300px;
		float: left;
	}
}
</style>