<template lang="pug">
	div.comment-list
		single-comment(v-for="(item,index) in list",v-if="",:data="item",:index="index",:length="total",key="index")
</template>





<script>
import SingleComment from './single-comment.vue'
export default {
	name:'comment-list',
	components:{
		SingleComment
	},
	props:["list","total"]
}
</script>





<style lang="less" scoped>
.comment-list{
	&.topBlock{
      padding-top:72px;
      transition: padding-top 0.3s;
    }
}
</style>