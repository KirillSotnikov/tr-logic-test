<template>
  <button 
    class="button"
    :class="{ 'button-danger' : danger }"
    @click="clickHandler"
  >
    {{text}}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    danger: {
      type: Boolean,
      default: false
    },
    clickHandler: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.button{
  padding: 5px 10px;
  font-style: 14px;
  border: 1px solid #16a085;
  border-radius: 5px;
  background: #fff;
  margin-left: 5px;
  cursor: pointer;
  color: #16a085;
  transition: all .2s ease-in;
    &:hover{
      background: #16a085;
      color: #fff;
      border-color: #fff;
    }
  &-danger{
    border-color: #e74c3c;
    color: #e74c3c;
    &:hover{
      background: #e74c3c;
      color: #fff;
      border-color: #fff;
    }
  }
}
</style>