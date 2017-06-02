<template>
  <div class="textbox">
    <div class="text-container">
      <span class="icon" :class="prefixname"></span>
      <input v-if="disabled" type="text" :class="inputclass" name="" v-model="text" :placeholder="placeholder" readonly>
      <input v-else type="text" :class="inputclass" name="" v-model="text" @focus="focus" @blur="blur" :placeholder="placeholder">
      <span class="search" :class="suffixname" @click="search"></span>
    </div>
  </div>
</template>


<script>
export default {
  name: 'textbox',
  data () {
    return {
      prefixname: this.prefix || 'cpf-icon-reg',
      suffixname: this.suffix || 'cpf-icon-ic_search',
      text: this.value || ''
    }
  },
  computed: {
    inputclass () {
      return {
        disabled: this.disabled ? true : false,
        prefix: this.prefixname ? true : false,
        suffix: this.suffixname ? true : false
      }
    }
  },
  methods: {
    focus () {
      this.$emit('focus')
    },
    blur () {
      this.$emit('blur')
    },
    search () {
      if (this.disabled) {
        return
      }
      this.$emit('search')
    }
  },
  props:['value', 'addonBefore', 'addonAfter', 'prefix', 'suffix', 'disabled', 'placeholder']
}
</script>

<style lang="less" scoped>
.textbox{
  .text-container{
    display: inline;
    position: relative;
    &:hover{
      input[type="text"]:not(.disabled){
        border-color: #49a9ee;
      }
    }
    .icon{
      left: 4px;
      top: 1px;
      font-size: 18px;
      position: absolute;
    }
    .search{
      top: -3px;
      right: 1px;
      color: #ccc;
      padding: 6px;
      cursor: pointer;
      position: absolute;
      transition: color 0.5s;
      &:hover{
        color:#49a9ee;
      }
    }
    input[type="text"]{
      width: 100%;
      padding: 5px 0;
      outline: none;
      border-radius: 5px;
      transition: all 0.5s;
      box-sizing: border-box;
      border: 1px solid #d9d9d9;
      &.prefix{
        padding-left: 24px;
      }
      &.suffix{
        padding-right: 24px;
      }
      &.disabled{
        background: #efefef;
        cursor: no-drop;
      }
      &:focus:not(.disabled){
        border-color:#49a9ee;
        box-shadow: 0px 0px 5px #49a9ee;
      }
    }
  }
}
</style>