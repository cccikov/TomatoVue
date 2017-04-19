<template lang="pug">
	div.single-comment
		.left.personal_detail
			p
				img(v-bind:src="data.imgSrc")
			p.name {{data.name}}{{_index}}
		.right
			.comment {{data.comment}}
			.date {{_index}}楼 · {{data.date}}
</template>




<script>
export default {
	name:'single-comment',
	computed:{
		_index:function(){
			return (this.data.index + 1);
		}
	},
	props:["data"]
}
</script>






<style lang="less" scoped>
@import '../commonStyle/common.less';
.single-comment{
	border-top:1px dashed #41b883;
	.clearfix;
	.left{
		float: left;
	}
	.right{
		float: right;
		width:70%;
		margin:5px;
		.comment{
			min-height: 40px;
			word-break:break-all;
		}
		.date{
			color:#aaa;
			font-size: 12px;
			text-align: right;
		}
	}
	.personal_detail{
		width:20%;
		text-align: center;
		margin:5px;
		img{
			max-width: 40px;
			max-height: 40px;
			border-radius: 5px;
			vertical-align: middle;
		}
		.name{
			color:#666;
		}
	}
}
</style>