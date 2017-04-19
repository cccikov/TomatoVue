<template lang="pug">
	.show-more
		span(@click="$emit('move','left')",v-show="hasPrev") 上一页
		span(@click="$emit('move','right')",v-show="hasNext") 下一页
</template>

<script>
export default {
	name:'show-more',
	props:["hasNext","hasPrev"]
}
</script>

<style lang="less" scoped>
	.show-more{
		color:#aaa;
		padding:10px 0;
		cursor: pointer;
		text-align: right;
		span{
			&:hover{
				color:#666;
			}
			&:first-child{
				margin-right: 10px;
			}
		}
	}
</style>