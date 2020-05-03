<template>
  <div v-if="isOpened" class="dialog">
    <div @click="closeFunction" class="dialog__overlay"></div>
    <div class="dialog__container">
      <div class="dialog__header">
        <p class="dialog__title">{{ title }}</p>
        <span @click="closeFunction" class="dialog__close">&times;</span>
      </div>
      <div class="dialog__body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    isOpened: {
      type: Boolean,
      default: false
    },
    closeFunction: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .dialog{
    display: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    &__overlay{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.8);
    }
    &__container{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      max-width: 700px;
      width: 100%;
      background: #fff;
      border: 1px solid #16a085;
      border-radius: 15px;
      padding: 30px 50px;
    }
    &__header{
      padding-right: 30px;
      position: relative;
    }
    &__title{
      font-size: 24px;
      color: #16a085;
    }
    &__close{
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;
      color: #16a085;
      cursor: pointer;
    }
    &__body{
      margin-top: 20px;
      width: 100%;
    }
  }
</style>
