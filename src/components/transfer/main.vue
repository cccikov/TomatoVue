<template>
  <div class="transfer-container">
    <!--可选-->
    <div class="transfer-select">
      <div class="total">
        <checkbox :data="sourceTotal.data" :disabled="sourceTotal.disabled" @cbChange="sourceChange" :select="sourceTotal.data.select" inline="true"></checkbox>
        <span>Source</span>
      </div>
      <div class="search">
        <textbox placeholder="Search here..." @input="selectInSearch" @search="selectSearch"></textbox>        
      </div>
      <ul class="content">
        <li v-for="(item,index) in select" :key="index">
          <checkbox name="source" :data="item" :disabled="item.disabled" :select="item.select" @cbChange="selectChange"></checkbox>
        </li>
      </ul>
    </div>  
    <!--操作-->
    <div class="operate">
      <a href="javascript:void(0)" class="left cpf-icon-ic_arrowleft" :class="{arrowleft_active: arrowleft}" @click="movetoleft"></a>
      <a href="javascript:void(0)" class="right cpf-icon-ic_arrowright" :class="{arrowright_active: arrowright}" @click="movetoright"></a>
    </div>
    <!--已选-->
    <div class="transfer-selected">
      <div class="total">
        <checkbox :data="targetTotal.data" :disabled="targetTotal.disabled" @cbChange="targetChange" :select="targetTotal.data.select" inline="true"></checkbox>
        <span>Target</span>
      </div>
      <div class="search">
        <textbox placeholder="Search here..." @input="selectedInSearch" @search="selectedSearch"></textbox>        
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
      totalSelect: [],
      selected: [],
      totalSelected: [],
      sourceTotal: {
        data: {},
        disabled: false
      },
      targetTotal: {
        data: {},
        disabled: false
      },
      selectSearchText: '',
      selectedSearchText: ''
    }
  },
  mounted () {
    const items = 10
    const config = { disabled: false, select: false }
    for(let i=0;i<items;i++){
      this.select.push(Object.assign( {}, config, { text:`item${i+1}`, value: i }))
      this.selected.push(Object.assign( {}, config, { text:`item${i+11}`, value: i + 11 }))
    }
    this.sourceTotal.data = Object.assign( {}, config, { text: `${items} items`, value: 'sourceTotal' })
    this.targetTotal.data = Object.assign( {}, config, { text: `${items} items`, value: 'targetTotal' })
  },
  components: {
    textbox,
    checkbox
  },
  computed: {
    arrowright () {
      const select = this.select.some(x => x.select)
      return this.sourceTotal.data.select || select
    },
    arrowleft () {
      const select = this.selected.some(x => x.select)
      return this.targetTotal.data.select || select
    }
  },
  watch: {
    select () {          // 只要有一个不是disabled，只要有一个不是select
      this.sourceTotal.disabled = this.select.every(x => x.disabled)
      this.sourceTotal.data.select = this.select.every(x => x.select)
    },
    selected () {
      this.targetTotal.disabled = this.selected.every(x => x.disabled)
      this.targetTotal.data.select = this.selected.every(x => x.select)
    }
  },
  methods: {
    sourceChange (_data) {
      this.sourceTotal.data = _data
      for(let v of this.select) {
        v.select = this.sourceTotal.data.select
      }
    },
    targetChange (_data) {
      this.targetTotal.data = _data
      for(let v of this.selected) {
        v.select = this.targetTotal.data.select
      }
    },
    selectChange (_data) {
      this.$set(this.select, _data.value, _data)
    },
    selectedChange (_data) {
      this.$set(this.selected, _data.value - 11, _data)
    },
    movetoleft () {
      if (!this.arrowleft) {
        return
      }
      const selected = this.selected.filter(x => !x.select && !x.disabled)
      const arr = this.selected.filter(x => { 
        if (x.select && !x.disabled) {
          x.select = false
          return true
        }
      })
      this.selected = selected
      this.select = this.select.concat(arr)
    },
    movetoright () {
      if (!this.arrowright) {
        return
      }
      const select = this.select.filter(x => !x.select && !x.disabled)
      const arr = this.select.filter(x => { 
        if (x.select && !x.disabled) {
          x.select = false
          return true
        }
      })
      this.select = select
      this.selected = this.selected.concat(arr)
    },
    selectInSearch (text) {
    },
    selectedInSearch (text) {

    },
    selectSearch (text) {

    },
    selectedSearch (text) {

    }
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
      &.arrowleft_active,
      &.arrowright_active{
        color: #fff;
        cursor: pointer;
        background: #288add;
        border-color: #288add;
      }
      &.left{
        margin-bottom:4px;
      }
    }
  }
}
</style>


