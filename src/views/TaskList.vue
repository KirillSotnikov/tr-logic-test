<template>
  <div class="container">

    <transition mode="out-in" name="fade">
      <app-dialog 
        :isOpened="isOpenedDialog"
        :closeFunction="closeDialog"
        title="Создать задачу"
      >
        <form @submit.prevent="addTask" class="dialog_forn">
          <app-input 
            placeholder="Название задачи"
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

    <transition mode="out-in" name="fade">
      <app-dialog 
        :isOpened="isOpenedPrompt"
        :closeFunction="closePrompt"
        title="Подтвердить действие"
      >
        <div class="prompt__body">
          <app-button 
            text="Подтвердить"
            type="submit"
            :clickHandler="() => promptHandler()"
          />
          <app-button 
            text="Отклонить"
            type="submit"
            danger
            :clickHandler="this.closePrompt"
          />
        </div>
      </app-dialog>
    </transition>

    <div class="tasks">
      <app-header
        title="Список задач"
      />
      <div class="wrapper">
        <app-button 
          class="create-button"
          text="Создать"
          :clickHandler="openDialog"
        />
        <div v-if="tasks.length" class="tasks__list">
          <app-card 
            v-for="task in tasks" 
            :key="task.id"
            :task="task"
            :deleteTask="deleteTask"
            :openPrompt="openPrompt"
            :maxTodosCount="maxTodosCount"
          />
        </div>
        <div v-else class="page-text">Задач нет :(</div>
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
      formErrors: [],
      isOpenedPrompt: false,
      promptHandler: () => {},
      maxTodosCount: 4
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

    async deleteTask (id) {
      await this.$store.dispatch('deleteTask', id)
      this.closePrompt()
    },

    openDialog () {
      this.isOpenedDialog = true
    },

    closeDialog () {
      this.isOpenedDialog = false
    },

    openPrompt (handler, id) {
      this.isOpenedPrompt = true
      this.promptHandler = handler.bind(null, id)
    },

    closePrompt () {
      this.isOpenedPrompt = false
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
      @media screen and (max-width:991px){
      grid-template-columns: repeat(1, 1fr,);
      }
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
  .page-text{
    margin-top: 20px;
    width: 100%;
    text-align: center;
    font-size: 20px;
  }
</style>
