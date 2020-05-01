<template>
  <div class="todo__item">
    <div class="todo__label">
      <app-check-input 
        v-if="editable" 
        :checked="todo.checked"
        :changeFuncion="() => setValue('checked', !todo.checked)"
      />
      <p class="todo__text">{{todo.text}}</p>
    </div>
    <div v-if="editable" class="todo__controls">
      <app-button 
        text="Редактировать"
      />
      <app-button 
        text="Удалить" 
        danger
      />
    </div>
  </div>
</template>

<script>
import CheckInput from '@/components/Common/CheckInput'
import Button from '@/components/Common/Button'
export default {
  components: {
    'app-check-input': CheckInput,
    'app-button': Button
  },
  props: [
    'todo',
    'editable'
  ],
  methods: {
    setValue (key, value) {
      console.log(key, '-', value)
      this.todo[key] = value
    }
  }
}
</script>

<style lang="scss" scoped>
.todo{
  &__item{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__label{
    display: flex;
    align-items: center;
  }
  &__text{
    font-size: 16px;
    margin-left: 5px;
  }
}
</style>