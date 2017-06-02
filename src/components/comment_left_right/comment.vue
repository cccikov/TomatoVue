<template lang="pug">
  div.comment_component
    add-comment(@add="addComment",:clear="clear")
    comment-area(:list="data.list",:total="data.total",:page-size="data.pageSize")
</template>




<script>

import AddComment from './add-comment.vue'
import CommentArea from './comment-area.vue'
import data from '../../../data/comment.json'
import tip from '../tip/index'

export default {
  name: 'app',
  data () {
    return {
      data,
      "clear":0
    }
  },
  watch: {
    '$route' (to, from) {
      console.log('left catch the change')
    }
  },
  components:{
    AddComment,
    CommentArea
  },
  methods:{
    addComment:function(item){
      this.clear++;
      this.data.total++;
      this.data.list.push(item)
      tip.successTip({content:'评论成功！'})
    }
  }
}
</script>




<style type="text/css" src="../commonStyle/common.less"></style>
<style lang="less" scoped>
  .comment_component{
    width:300px;
    margin:50px auto 50px;
    border:1px solid #41b883;
    padding:10px;
  }
</style>
