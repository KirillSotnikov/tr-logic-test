<template>
  <div class="todo__item">
    <div class="todo__label">
      <app-check-input 
        v-if="editable" 
        :checked="todo.checked"
        :changeFuncion="() => setTodoValue('checked', !todo.checked)"
      />
      <p class="todo__text">
        <span>{{todo.text}}</span>
        <app-input 
          class="todo__input" 
          v-if="editing" 
          :propValue="todo.text"
          :changeFunction="setInputText"
          name="todoText"
        />
      </p>
    </div>
    <div v-if="editable" class="todo__controls">
      <div
        v-if="editing"
      >
        <app-button 
          text="Подтвердить"
          :clickHandler="() => submitEditing(false)"
        />
        <app-button 
          text="Отменить"
          :clickHandler="() => this.openPrompt(this.cancelEditing, false)"
          warning
        />
      </div>
      <app-button 
        v-else
        text="Редактировать"
        :clickHandler="() => setEdining(true)"
      />
      <app-button 
        text="Удалить" 
        danger
        :clickHandler="() => this.openPrompt(this.deleteFunction, this.todo.id)"
      />
    </div>
  </div>
</template>

<script>
import CheckInput from '@/components/Common/CheckInput'
import Button from '@/components/Common/Button'
import Input from '@/components/Common/Input'
export default {
  components: {
    'app-check-input': CheckInput,
    'app-button': Button,
    'app-input': Input
  },
  props: [
    'todo',
    'editable',
    'addChanges',
    'deleteFunction',
    'openPrompt',
    'closePrompt'
  ],
  data () {
    return {
      editing: false,
      todoText: ''
    }
  },
  methods: {
    setTodoValue (key, value) {
      const oldValue = this.todo[key]
      this.addChanges(this.todo.id, key, oldValue)
      this.todo[key] = value
    },

    setInputText (name, value) {
      this[name] = value
    },

    saveText () {
      this.setTodoValue('text', this.todoText)
    },

    clearText () {
      this.todoText = ''
    },

    setEdining (value) {
      this.editing = value
      this.closePrompt()
    },

    submitEditing () {
      this.saveText()
      this.setEdining(false)
    },

    cancelEditing () {
      this.clearText()
      this.setEdining(false)
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
    @media screen and (max-width: 991px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  &__label{
    display: flex;
    align-items: center;
    @media screen and (max-width: 991px) {
      margin-bottom: 10px;
    }
  }
  &__text{
    font-size: 16px;
    margin-left: 5px;
    position: relative;
  }
  &__input{
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    min-width: 150px;
  }
  &__controls{
    display: flex;
    align-items: center;
  }
}
</style>