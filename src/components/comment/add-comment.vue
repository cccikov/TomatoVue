<template lang="pug">
	div.addComponent
		div.textContainer
			textarea(type="text",rows="4",v-model="comment")
		transition(name="move")
			div.textContainer.copy(v-show="show") {{comment_copy}}

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
			comment_copy:'',
			show:false
		}
	},
	watch:{
		clear:function(){
			this.show = true;
			this.comment_copy = this.comment;
			this.comment = '';
			setTimeout(()=>{
				this.show = false;
			},500)
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
		&.copy{
			position: absolute;
			left:0;
			top:0;
			width: 288px;
			height: 60px;
			padding: 5px;
			border:1px solid #ccc;
			background: #efefef;
		}
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
.move-enter-active {
	transition: all .5s;
}
.move-enter {
}
.move-enter-to {
	transform: translate(0px,-10px) scale(0.9,0.9);
}


.move-leave-active{
	transition: all 1s;
}
.move-leave {
	transform: translate(0px,-10px) scale(0.9,0.9);
}
.move-leave-to {   
	transform: translate(0px,150px) scale(1,1);
}
</style>