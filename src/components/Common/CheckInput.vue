<template>
  <input 
    :checked="checked" 
    type="checkbox"
    @change="changeFuncion"
  />
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    changeFuncion: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
input{
  appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid #16a085;
  border-radius: 5px;
  background: #fff;
  transition: all .2s ease-in;
  cursor: pointer;
  &:checked{
    // background: #16a085;
    border-width: 9px;
  }
}
</style>