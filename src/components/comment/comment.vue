<template lang="pug">
  div.comment_component
    add-comment(@add="addComment",:clear="clear")
    comment-area(:list="data.list",:isBlock="isBlock",:total="data.total")
</template>




<script>

import AddComment from './add-comment.vue'
import CommentArea from './comment-area.vue'
import data from '../../../data/comment.json'

export default {
  name: 'app',
  data () {
    return {
      data,
      "clear":0,
      "isBlock":false
    }
  },
  components:{
    AddComment,
    CommentArea
  },
  methods:{
    addComment:function(item){
      this.clear++;
      setTimeout(()=>{
        this.isBlock = true;
        setTimeout(()=>{
          this.isBlock = false;
          this.data.total++;
          this.data.list.unshift(item)
        },300)
      },800)
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
