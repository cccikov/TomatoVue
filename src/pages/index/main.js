import Vue from 'vue'
import VueRouter from 'vue-router'
import Comment from '../../components/comment/comment.vue'
import CommentLeft from '../../components/comment_left_right/comment.vue'
import Checkbox from '../../components/checkbox/main.vue'
import Transfer from '../../components/transfer/main.vue'
import TextBox from '../../components/textbox/main.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/comment',
      component: Comment
    }, {
      path: '/commentleft/:id?',
      component: CommentLeft
    }, {
      path: '/checkbox',
      component: Checkbox
    }, {
      path: '/transfer',
      component: Transfer
    }, {
      path: '/textbox',
      component: TextBox
    }
  ]
})
new Vue({
  router,
  el: '#app'
})
