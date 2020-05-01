<template>
  <div class="task">
    <app-header
      :title="task.name"
    />
    <div class="wrapper">
      <router-link class="task__link" to="/todos">
        Task List
      </router-link>
      <div class="task__list">
        <app-todo-item
          v-for="todo in task.todos"
          :key="todo.id"
          :todo="todo"
          :editable="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Common/Header'
import TodoItem from '@/components/Todo/Todo'
export default {
  props: [
    'id'
  ],
  components: {
    'app-header': Header,
    'app-todo-item': TodoItem
  },
  computed: {
    task () {
      return this.$store.getters.getTaskById(this.id)
    }
  },
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
    &__link{
      display: inline-block;
      margin-top: 20px;
      margin-bottom: 20px;
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