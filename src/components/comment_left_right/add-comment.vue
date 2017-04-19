<template lang="pug">
	div.addComponent
		div.textContainer
			textarea(type="text",rows="4",v-model="comment")
		a(href="javascript:void(0)",@click="submit").addBtn 评论
</template>





<script>
import moment from 'moment'
import $ from 'jquery'
import tip from '../tip/index'

export default {
// module.exports = {
	name:'add-comment',
	data () {
		return {
			comment:'',
		}
	},
	watch:{
		clear:function(){
			this.comment = '';
		}
	},
	methods:{
		submit:function(){
			if($.trim(this.comment)==''){
				return tip.warnTip({content:'请先填写评论'});
			}
			this.$emit('add', {
				"imgSrc":"../../src/assets/logo.png",
				"name":"小白·",
				"comment":this.comment,
				"date":moment().format('YYYY-MM-DD HH:mm')
			})
		}
	},
	props:["clear"]
}

</script>






<style lang="less" scoped>
@import '../commonStyle/common.less';
.addComponent{
	.clearfix;
	position: relative;
	.textContainer{
		textarea{
			width:288px;
			height: 60px;
			padding:5px;
			resize: none;
			outline: none;
			border-color:#ccc;
			font-family: 'microsoft yahei';
		}
	}
	.addBtn{
		float: right;
		color:#fff;
		padding:2px 15px;
		text-decoration: none;
		background: #41b883;
		&:active{
			background: #369a6e;
		}
	}
}

</style>