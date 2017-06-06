> #### 搭建框架

```
npm install -g vue-cli
//安装脚手架 vue-cli

vue init webpack-simple hello-vue
//利用脚手架搭建简单demo

cd hello-vue
npm install
//安装依赖
npm run dev
//启动吧
```

> ##### 添加批量入口

```
var path = require('path'),
    webpack = require('webpack'),
    appConfig = {
      path:{
        pagePath:'./src/pages/'
      }
    },//定义js文件所在路径
    entryHelper = require('./tools/entryHelper'),
    entries = entryHelper.getEntry(appConfig);
//entries是一个包含所有页面级js的对象

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].build.js'
  },
  ...
}
```

> ##### 添加几个loader吧

```
module.exports = {
    ...
    module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              loaders: {
              }
            }
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          },
          {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]'
            }
          },
          //添加less和json的loader
          {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          }
        ]
      },
    ...
}
```
> ##### 目录

- 添加src/pages
- 添加component文件夹以及comment文件夹下的所有.vue文件

> ##### 修改index.html的js路径

```
<script src="/dist/index.main.build.js"></script>
```


---


> #### vue技术相关

> ##### template

- 采用pug，与jade类似，主要是因为安装报错，最后为了省事就用了vue自带的pug，省去安装的繁琐

- pug
    - 不用写<>和闭合标签，省事啊
    - 属性写在紧跟在标签后面()里，用逗号分隔
    - text写在标签后面，用空格分隔一下
    ```
        div(class="text") {{text}}
    ```

> ##### 模板语法

- 文本
    - {{}}号括住，text是变量名
    ```
        div {{text}}
    ```

- 属性
    - v-bind指令
    - id是属性名
    - dynamicId是变量名
    - 传递数据给子组件
    - 值为变量都要用v-bind绑定属性
    ```
        div(v-bind:id="dynamicId")
    ```

- 表达式
    - {{}}括住
    - 只能是表达式，不能赋值和流程控制，太辣鸡了，导致模板


- v-model
    - 绑定input的值
    ```
    textarea(type="text",rows="4",v-model="comment")
    p {{comment}} 
    //输入时p的内容会实时与textarea的内容同步一致
    ```
    
- class
    - 对象
        ```
        comment-list(:class="{topBlock:isBlock}")
        //isBlock是变量，topBlock是class名
        //当isBlock为true时，comment-list会多一个topBlock的类
        ```
- 循环
    - v-for
        - 写在需要循环的dom上，而不是上一级
        - 最好加上一个唯一的标记key属性
        ```
        single-comment(v-for="(item,index) in list",key="index")
        //item值，index索引
        
        ```

- dom
    - 使用ref
    - 在script中找到某个dom进行操作
    ```
    comment-list(ref="commentList")
    //为comment-list添加一个标记commentList
    ```
    ```
    //script中
    $list = $(this.$refs.commentList.$el)  //this.$refs.commentList为组件
    ```


> ##### 脚本

- 变量
    - 在data中定义，可以this.变量或者this.data.变量这样使用

- props
    - 数组
        ```
        props:['name','text']
        ```
    - 定义从父组件接受的数据的名称
    - 使用方式：this.变量
    - 在template可直接使用，不用加this前缀

- 输出组件
    - export default{}

- data:定义本组件使用的变量
    - data(){}
    - data必须是函数
    - 函数内部返回一个对象：定义变量名和值
        ```
        data () {
            return {
              data,
              "clear":0,
              "isBlock":false
            }
        },
        ```
        
- 定义使用了哪些子组件
    - components
        - 值为对象（驼峰式写法）
        ```
        components:{
            addComment,
            commentArea
        }
        ```

- computed
    - 计算属性
    - 可以监听到变量值的改变，从而触发重新计算依赖它的变量
    - 监听的变量只能为本组件data定义的变量
    ```
    computed:{
        name(){
            return this.firstName + this.lastName
        } 
    }
    //firstName和lastName是在data中定义
    ```

- methods
    - 定义方法
    - 可以script中使用，也可以在template中使用
    ```
    methods:{
        addComment(){
            ...
        }
    }
    ```

- watch
    - 可以监听父组件传递过来的变量发生变化
    - 比computed稍麻烦
    ```
    watch:{
        list(){
            this.totalPage = this.list.length/this.size
        }
    }
    //list是父传递的props
    ```

- 子组件通知父组件
    - on 和 emit
    - 父传递一个函数给子组件
        ```
        add-comment(@add="addComment")
        或者
        add-comment(v-on:add="addComment")
        ```
    - 子组件通过emit('add')触发add事件，组件自动调用父组件的addComment方法
        - 触发方式一：method内触发
            ```
            a(href="javascript:void(0)",@click="submit").addBtn 评论
            
            methods:{
        		submit:function(){
        			this.$emit('add', data)
        		}
        	},
            ```
        - 触发方式二：template内触发
            ```
            .show-more(@click="$emit('addMore')") 加载更多
            
            span(@click="$emit('move','left')",v-show="hasPrev") 上一页
            ```

- 过渡动画
    - transition
        - 自定义名称name（例如：name为move）
        - transition中要有会显示隐藏的dom，要不然不会有过渡发生
            - v-if
            - v-show
            - 以上两个都会出现显示隐藏
        ```
        transition(name="move")
			div.textContainer.copy(v-show="show") {{comment_copy}}
        ```
        - 定义过渡过程中的样式
        ```
        .move-enter-active {
        	transition: all .5s;
        }
        .move-enter {
        	//opacity: 0; 透明度可不写，v-show本来就是改变透明度
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
        	//opacity: 0; 透明度可不写，v-show本来就是改变透明度
        	transform: translate(0px,150px) scale(1,1);
        }
        ```
        ![image](https://www.vuefe.cn/images/transition.png)




> ##### 样式

- 引入方式
    - script中用import 引入
    - 用style标签引入
        ```
        <style type="text/css" src="../commonStyle/common.less"></style>
        ```
    - 在style标签里用@import引入
        ```
        @import '../commonStyle/common.less';
        ```


- 语言
    - 默认是css
    - 使用less
        ```
        <style lang="less">
        ...
        </style>
        ```


- 全部和局部
    - 局部:只在本组件内有效的样式
        ```
        <style scoped>
        ...
        </style>
        ```

> #### 引入vue-router

> ##### 安装

    ```
        npm install vue-router
    ```

> ##### 分配路由

    - 页面级有两种写法
    - 写法一
        ```
        // index.html
        <div id="app">
            <router-view></router-view>
        </div>
        ```
    - 写法二
        ```
        // main.vue
        <template>
            <div>
                <router-view></router-view>
            </div>
        </template>
        ```
    
    - 引入vue-router
        ```
        import Vue from 'vue'
        import VueRouter from 'vue-router'

        Vue.use(VueRouter)
        //  如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)

        const router = new Router({
            routes: [
                {
                    path: '/comment',
                    component: Comment
                }, { 
                    path: '/about',
                    component: About
                }
            ]
        })

        new Vue({
            router,
            el: '#app'
        })
        ```

> ##### 动态路由

    - 响应路由参数的变化（渲染相同的组件才会响应）

        ```
            new Vue({
                router,
                el: '#app',
                watch: {
                    '$route' (to, from) {
                        console.log('catch the new request')
                    }
                }
            })
            
        ```
    
    - 动态匹配
        ```
            routes: [
                { path: '/' },

                // params ar    e denoted with a colon ":"
                { path: '/params/:foo/:bar' },

                // a param can be made optional by adding "?"
                { path: '/optional-params/:foo?' },

                // a param can be followed by a regex pattern in parens
                // this route will only be matched if :id is all numbers
                { path: '/params-with-regex/:id(\\d+)' },

                // asterisk can match anything
                { path: '/asterisk/*' },

                // make part of th path optional by wrapping with parens and add "?"
                { path: '/optional-group/(foo/)?bar' }
            ]
        ```

> ##### router 跳转

    ```
        // 字符串
        router.push('home')

        // 对象
        router.push({ path: 'home' })

        // 命名的路由
        router.push({ name: 'user', params: { userId: 123 }})

        // 带查询参数，变成 /register?plan=private
        router.push({ path: 'register', query: { plan: 'private' }})
    ```
    ```
        routes: [
            {
            path: '/user/:userId',
            name: 'user',
            component: User
            }
        ]//路由命名

        <router-link :to="{name:'path', {query:{id:1}}}">jump</router-link>
    ```

> ##### 重定向

    ```
    const router = new VueRouter({
        routes: [
            { path: '/a', redirect: '/b' }
        ]
    })
    ```
    - 访问/a时，url会变为/b,同时路由匹配/b

> ##### 别名

    ```
    const router = new VueRouter({
        routes: [
            { path: '/a', component: A, alias: '/b' }
        ]
    })
    ```
    - 为/a添加了一个别名/b，当访问/b时，url不变，但是路由匹配/a

> ##### 导航钩子

    - 全局
        ```
        const router = new VueRouter({ ... })

        router.beforeEach((to, from, next) => {
        // ...
        })
        ```
        - next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。

        - next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。

        - next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
    
    - 路由内
    
        ```
        const router = new VueRouter({
            routes: [
                {
                path: '/foo',
                component: Foo,
                beforeEnter: (to, from, next) => {
                    // ...
                }
                }
            ]
        })
        ```
    - 组件内

        ```
            beforeRouteEnter
            beforeRouteUpdate (2.2 新增)
            beforeRouteLeave
        ```

> ##### 疑惑

    - 路由懒加载
    - 数据获取-导航完成之前？

> #### 坑

    - label里面有input会自动把点击事件转移到input上，就算没有为label绑定点击事件，点击label任意位置，都如同直接点击input一样

    - 这个错已经犯了第三回了，Object.assign(a,b)会改变a，应该写成Object.assign({}, a, b)

    - index从1开始，导致checkbox回调中_data中序号与数组的索引大1

    - 设置数组某个索引的值没有用this.$set，导致computed中无法捕捉数组值的改变