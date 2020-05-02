<template>
  <div class="container">
    <div class="tasks">
      <app-header
        title="Task List"
      />
      <div class="wrapper">
        <app-button 
          class="create-button"
          text="Создать"
          :clickHandler="addTask"
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
import Card from '@/components/Todo/Card'
export default {
  components: {
    'app-header': Header,
    'app-button': Button,
    'app-card': Card
  },
  computed: {
    tasks () {
      const tasks = this.$store.getters.getTasks
      if (Object.keys(tasks).length) {
        return tasks
      } else {
        this.$store.dispatch('fetchTasks')
        return tasks
      }
    }
  },
  methods: {
    addTask () {
      this.$store.dispatch('addTask')
    },
    deleteTask (id) {
      this.$store.dispatch('deleteTask', id)
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
</style>
