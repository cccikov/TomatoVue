<template lang="pug">
	div.comment-area
		comment-detail(:total="total")
		comment-list(:list="use_list",:class="{topBlock:isBlock}",:total="total")
		show-more(v-show="hasMore",@addMore="add")
</template>




<script>

import CommentDetail from './comment-detail.vue'
import CommentList from './comment-list.vue'
import ShowMore from './show-more.vue'

export default {
	name:'comment-area',
	data () {
		return {
			size:this.total>5?5:this.total,
			use_list: this.list.slice(0,this.size),
			hasMore:this.size<this.total?true:false
		}
	},
	watch:{
		total(){
			this.hasMore = this.size<this.total?true:false
			this.use_list = this.list.slice(0,this.size)
		},
		size(){
			this.hasMore = this.size<this.total?true:false
			this.use_list = this.list.slice(0,this.size)
		}
	},
	methods:{
		add(){
			if(this.size + 5 <= this.total)
				this.size += 5;
			else 
				this.size = this.total;
		}
	},
	components:{
		CommentDetail,
		CommentList,
		ShowMore
	},
	props:["list","total","isBlock"]
}
</script>







<style lang="less" scoped>
	.comment-area{
		margin-top: 10px;
	}
</style>