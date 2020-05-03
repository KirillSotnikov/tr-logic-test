<template>
  <div class="container">

    <transition mode="out-in" name="fade">
      <app-dialog 
        :isOpened="isOpenedDialog"
        :closeFunction="closeDialog"
        title="Create Task"
      >
        <form @submit.prevent="addTask" class="dialog_forn">
          <app-input 
            placeholder="Task Name"
            name="name"
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
    
    <div class="tasks">
      <app-header
        title="Task List"
      />
      <div class="wrapper">
        <app-button 
          class="create-button"
          text="Создать"
          :clickHandler="openDialog"
        />
        <div class="tasks__list">
          <app-card 
            v-for="task in tasks" 
            :key="task.id"
            :task="task"
            :deleteTask="deleteTask"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Common/Header'
import Button from '@/components/Common/Button'
import Dialog from '@/components/Common/Dialog'
import Input from '@/components/Common/Input'
import Card from '@/components/Todo/Card'

import { StringValidator } from '@/utils/Validator'
export default {
  components: {
    'app-header': Header,
    'app-button': Button,
    'app-dialog': Dialog,
    'app-input': Input,
    'app-card': Card
  },
  data () {
    return {
      isOpenedDialog: false,
      formData: {
        name: '',
        todos: []
      },
      formErrors: []
    }
  },
  computed: {
    tasks () {
      const tasks = this.$store.getters.getTasks
      return tasks
    }
  },
  mounted () {
    this.fetchTasks()
  },
  methods: {
    fetchTasks () {
      this.$store.dispatch('fetchTasks')
    },

    onInputChange (name, value) {
      this.formData[name] = value
    },

    validatTask () {
      const { name } = this.formData
      const validator = new StringValidator(name, 'name')
      const { errors } = validator
        .isEmpty()
        .getResult()

      if (errors.length) {
        this.formErrors = errors
        return false
      }

      return true
    },

    addTask () {
      const isValid = this.validatTask()
      if (!isValid) return false
      this.$store.dispatch('addTask', this.formData)
      this.closeDialog()
    },

    deleteTask (id) {
      this.$store.dispatch('deleteTask', id)
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
  .tasks{
    &__list{
      padding: 50px 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr,);
      grid-gap: 30px;
    }
  }
  .create-button{
    margin-top: 20px;
  }
  .dialog_forn{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .dialog_errors{
    width: 100%;
    &__item{
      list-style: disc;
      color: #c0392b;
    }
  }
</style>
