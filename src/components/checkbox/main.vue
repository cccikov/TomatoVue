<template>
  <div class="checkbox" :class="{inline:inline}" @click.stop="click">
    <label>
      <span class="checkbox-container">
        <input type="checkbox" :name="name" v-model="check">
        <span class="checkbox-inner" :class="status"></span>
      </span>
      <span class="text" :title="data.text">{{data.text}}</span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'checkbox',
    data () {
      return {
        check: this.select || false
      }
    },
    computed: {
      status () {
        return (this.check ? 'cpf-icon-ic_tick checked' : '') + (this.disabled ? ' disabled' : '')
      }
    },
    watch: {
      value () {
        this.check = this.select
      }
    },
    methods: {
      click (e) {
        if (this.disabled) {
          return
        }
        this.check = !this.check
        this.$emit('cbChange', Object.assign(this.data, {
          value: this.check
        }))
      }
    },
    props: ['data', 'disabled', 'name', 'select', 'inline']
  }
</script>

<style lang="less" scoped>
  .checkbox{
    position: relative;
    &.inline{
      display: inline;
    }
    .checkbox-container{
      position: relative;
      .checkbox-inner{
        left:0;
        top:2px;
        width:14px;
        height: 14px;
        color: #fff;
        font-size: 12px;
        background: #fff;
        line-height: 14px;
        position: absolute;
        text-align: center;
        border-radius: 3px;
        transition: all 0.5s;
        border:1px solid #ccc;
        &:hover{
          cursor: pointer;
          border-color: #288add;
        }
        &.checked{
          border-color: #288add;
          background: #288add;
        }
        &.disabled{
          border-color:#ddd;
          background: #ddd;
          cursor: no-drop;
        }
      }
    }
    .text {
      font-size: 12px;
      padding-left: 10px; 
      color:rgba(0,0,0,.65);
    }
  }
</style>