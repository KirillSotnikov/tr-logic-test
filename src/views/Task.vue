<template>
  <div v-if="task" class="task">

    <transition mode="out-in" name="fade">
      <app-dialog 
        :isOpened="isOpenedDialog"
        :closeFunction="closeDialog"
        title="Create Todo"
      >
        <form @submit.prevent="addTodo" class="dialog_forn">
          <app-input 
            placeholder="Todo Text"
            name="text"
            :changeFunction="onInputChange"
          />

          <ul class="dialog_errors" v-if="formErrors.length">
            <li 
              v-for="(error, index) in formErrors" 
              :key="index"
              class="dialog_errors__item"
            >
              {{error.errorMessage}}
            </li>
          </ul>

          <app-button 
            text="Подтвердить"
            type="submit"
          />
        </form>
      </app-dialog>
    </transition>

    <app-header
      :title="task.name"
    />
    <div class="wrapper">
      <div class="task__header">
        <router-link class="task__link" to="/todos">
          Task List
        </router-link>
        <div class="task__controls">
          <app-button 
            class="create-button"
            text="Создать"
            :clickHandler="openDialog"
          />
          <app-button 
            v-if="changedArray.length"
            class="task__button"
            text="Отменить действие"
            warning
            :clickHandler="returnChange"
          />
        </div>
      </div>
      <div class="task__list">
        <app-todo-item
          v-for="todo in task.todos"
          :key="todo.id"
          :todo="todo"
          :editable="true"
          :addChanges="addChanges"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Common/Header'
import Button from '@/components/Common/Button'
import Dialog from '@/components/Common/Dialog'
import Input from '@/components/Common/Input'
import TodoItem from '@/components/Todo/Todo'

import { StringValidator } from '@/utils/Validator'
export default {
  props: [
    'id'
  ],
  components: {
    'app-header': Header,
    'app-button': Button,
    'app-dialog': Dialog,
    'app-input': Input,
    'app-todo-item': TodoItem
  },
  computed: {
    task () {
      const task = this.$store.getters.getTaskById(this.id)
      if (task) {
        return task
      } else {
        this.$store.dispatch('fetchTaskById', this.id)
        return task
      }
    }
  },
  data () {
    return {
      isOpenedDialog: false,
      changedArray: [],
      formData: {
        text: ''
      },
      formErrors: []
    }
  },
  methods: {
    
    onInputChange (name, value) {
      this.formData[name] = value
    },

    validatTask () {
      const { text } = this.formData
      const validator = new StringValidator(text, 'text')
      const { errors } = validator
        .isEmpty()
        .getResult()

      if (errors.length) {
        this.formErrors = errors
        return false
      }

      return true
    },

    async addTodo () {
      const isValid = this.validatTask()
      if (!isValid) return false
      const payload = {
        id: this.task.id,
        text: this.formData.text
      }
      await this.$store.dispatch('addTodo', payload)
      this.closeDialog()
    },

    addChanges (id, key, value) {
      const payload = {
        id,
        key,
        value
      }
      this.changedArray.unshift(payload)
    },

    returnChange () {
      const change = this.changedArray[0]
      const todo = this.getTodoById(change.id)
      todo[change.key] = change.value
      this.clearChanged()
    },

    clearChanged () {
      this.changedArray.shift()
    },

    getTodoById (id) {
      return this.task.todos.find(todo => todo.id === id)
    },
    
    openDialog () {
      this.isOpenedDialog = true
    },
    closeDialog () {
      this.isOpenedDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .task{
    &__list{
      padding: 15px;
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 10px;
      border: 1px solid #cecece;
    }
    &__header{
      margin-top: 20px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__controls{
      display: flex;
      align-items: center;
    }
    &__link{
      display: inline-block;
      color: #16a085;
      font-size: 16px;
      position: relative;
      &:hover{
        &::after{
          width: 100%;
        }
      }
      &::after{
        content: '';
        position: absolute;
        left: 0;
        width: 0;
        top: 100%;
        height: 1px;
        background: #16a085;
        transition: all .2s ease-in;
      }
    }
  }
</style>