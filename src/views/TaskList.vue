<template>
  <div class="container">
    <div class="tasks">
      <app-header
        title="Task List"
      />
      <div class="wrapper">
        <div class="tasks__list">
          <app-card 
            v-for="task in tasks" 
            :key="task.id"
            :task="task"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Common/Header'
import Card from '@/components/Todo/Card'
export default {
  components: {
    'app-header': Header,
    'app-card': Card
  },
  computed: {
    tasks () {
      return this.$store.getters.getTasks
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
</style>
