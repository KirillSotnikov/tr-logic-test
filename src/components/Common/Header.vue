<template>
  <div class="header">
    <div class="wrapper">
      <p class="header__title">{{title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .header{
    padding: 20px;
    background: #16a085;
    &__title{
      color: #fff;
      font-size: 24px;
    }
  }
</style>
