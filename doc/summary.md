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