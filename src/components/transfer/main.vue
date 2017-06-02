<template>
  <div class="transfer-container">
    <!--可选-->
    <div class="transfer-select">
      <div class="total">
        <checkbox :data="sourceTotal" @cbChange="sourceChange" inline="true"></checkbox>
        <span>Source</span>
      </div>
      <div class="search">
        <textbox placeholder="Search here..."></textbox>        
      </div>
      <ul class="content">
        <li v-for="(item,index) in select" :key="index">
          <checkbox name="source" :data="item" :disabled="item.disabled" :select="item.select" @cbChange="selectChange"></checkbox>
        </li>
      </ul>
    </div>  
    <!--操作-->
    <div class="operate">
      <a href="javascript:void(0)" class="left cpf-icon-ic_arrowleft"></a>
      <a href="javascript:void(0)" class="right cpf-icon-ic_arrowright"></a>
    </div>
    <!--已选-->
    <div class="transfer-selected">
      <div class="total">
        <checkbox :data="targetTotal" @cbChange="targetChange" inline="true"></checkbox>
        <span>Target</span>
      </div>
      <div class="search">
        <textbox placeholder="Search here..."></textbox>        
      </div>
      <ul class="content">
        <li v-for="(item,index) in selected" :key="index">
          <checkbox name="source" :data="item" :disabled="item.disabled" :select="item.select" @cbChange="selectedChange"></checkbox>
        </li>
      </ul>
    </div>    
  </div>
</template>

<script>
import textbox from '../textbox/main.vue'
import checkbox from '../checkbox/main.vue'

export default {
  name: 'transfer',
  data () {
    return {
      select: [],
      selected: [],
      sourceTotal: {},
      targetTotal: {}
    }
  },
  mounted () {
    const items = 10
    const config = { disabled: false, select: false }
    for(let i=1;i<items;i++){
      this.select.push(Object.assign({}, config, { text:`item${i}`, value: i }))
      this.selected.push(Object.assign({}, config, { text:`item${i+10}`, value: i + 10 }))
    }
    this.sourceTotal = Object.assign(config,{ text: `${items} items`, value: 'sourceTotal' })
    this.targetTotal = Object.assign(config,{ text: `${items} items`, value: 'targetTotal' })
  },
  components: {
    textbox,
    checkbox
  },
  methods: {
    sourceChange (_data) {

    },
    targetChange (_data) {

    },
    selectChange () {

    },
    
  }
}
</script>

<style lang="less" scoped>
@import '../commonStyle/common.less';
.transfer-container{
  .clearfix;
  width:570px;
  margin: 0 auto;

  .transfer-select,
  .transfer-selected{
    float: left;
    width:200px;
    border:1px solid #d9d9d9;
    border-radius: 4px;
    .total{
      padding:6px 15px;
      color: rgba(0,0,0,.65);
      border-bottom: 1px solid #d9d9d9;
      &>span{
        float: right;
        font-size: 12px;        
        line-height: 22px;
      }
    }
    .search{
      padding:2px 3px;
    }
    .content{
      height: 140px;
      overflow: auto;
      li{
        padding:6px 15px;
        &:hover{
          background:#ecf6fd;
        }
      }
    }
  }
  .operate{
    float:left;
    margin:80px 5px 0;
    a{
      padding: 0 7px;
      font-size: 12px;
      border-radius: 4px;
      height: 20px;
      line-height: 1.8;
      color: rgba(0,0,0,.25);
      background-color: #f7f7f7;
      border:1px solid #d9d9d9;
      text-decoration: none;
      display: block;
      cursor: no-drop;
      &.active{
        cursor: pointer;
      }
      &.left{
        margin-bottom:4px;
      }
    }
  }
}
</style>


