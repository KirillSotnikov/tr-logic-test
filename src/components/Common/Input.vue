<template>
  <input 
    type="text" 
    :placeholder="placeholder"
    v-model="value"
    @input="changeFunction(name, value)"
  />
</template>

<script>
export default {
  props: {
    placeholder: {
      default: ''
    },
    propValue: {
      default: ''
    },
    changeFunction: {
      type: Function,
      default: () => {}
    },
    name: {
      type: String,
      default: () => {}
    }
  },
  data () {
    return {
      value: ''
    }
  },
  mounted () {
    this.value = this.propValue
  }
}
</script>

<style lang="scss" scoped>
input{
  appearance: none;
  background: #fff;
  border: 1px solid #16a085;
  color: #16a085;
  width: 100%;
  padding: 5px 10px ;
  box-sizing: border-box;
  margin-bottom: 10px;
}
</style>