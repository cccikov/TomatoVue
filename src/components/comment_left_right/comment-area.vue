<template lang="pug">
	div.comment-area
		comment-detail(:total="total",:page-index="pageIndex",:total-page="totalPage")
		comment-list(:list="list",ref="commentList",:size="pageSize",:totalPage="totalPage")
		show-more(@move="move",:hasPrev="hasPrev",:hasNext="hasNext")
</template>




<script>
import $ from 'jquery'
import CommentDetail from './comment-detail.vue'
import CommentList from './comment-list.vue'
import ShowMore from './show-more.vue'
import tip from '../tip/index'

export default {
	name:'comment-area',
	data(){
		return {
			noMove:false,
			pageIndex:1,
			totalPage:Math.ceil(this.total/this.pageSize)
		}
	},
	computed:{
		hasPrev(){
			return this.pageIndex>1?true:false;
		},
		hasNext(){
			return this.pageIndex<this.totalPage?true:false;
		}
	},
	watch:{
		total(){
			this.totalPage = Math.ceil(this.total/this.pageSize)
		}
	},
	methods:{
		move(direction){
			let self = this,
				left,
				$list = $(this.$refs.commentList.$el)

			if(this.noMove)
				return;
			
			this.noMove = true;
			this.pageIndex = direction == "left"?--this.pageIndex:++this.pageIndex
			left = direction == "left"?'+=300px':'-=300px'

			$list.animate({
				'left':left
			},800,function(){
				self.noMove = false;
			})
		}
	},
	components:{
		CommentDetail,
		CommentList,
		ShowMore
	},
	props:["list","total","pageSize"]
}
</script>







<style lang="less" scoped>
	.comment-area{
		margin-top: 10px;
		overflow: hidden;
	}
</style>