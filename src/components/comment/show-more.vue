<template lang="pug">
	.show-more(@click="$emit('addMore')") 加载更多
</template>

<script>
export default {
	name:'show-more',
}
</script>

<style lang="less" scoped>
	.show-more{
		color:#aaa;
		padding:10px 0;
		cursor: pointer;
		text-align: center;
	}
</style>