<template>
  <div class="card">
    <div class="card__header">
      <p class="card__name">{{task.name}}</p>
      <div class="header__controls">
        <app-button 
          text="Редактировать"
          :clickHandler="() => goToTask(task.id)"
        />
        <app-button 
          text="Удалить" 
          danger 
          :clickHandler="() => this.openPrompt(this.deleteTask, this.task.id)"
        />
      </div>
    </div>
    <div v-if="task.todos" class="card__body">
      <div class="todos">
        <app-todo-item
          v-for="todo in task.todos.slice(0, maxTodosCount)"
          :key="todo.id"
          :todo="todo"
          :editable="false"
        />
      </div>
    </div>
  </div>
</template>


<script>
// Делать Аншифт значения в массив
import TodoItem from './Todo'
import Button from '@/components/Common/Button'
export default {
  components: {
    'app-todo-item': TodoItem,
    'app-button': Button
  },
  props: [
    'task',
    'deleteTask',
    'openPrompt',
    'maxTodosCount'
  ],
  methods: {
    goToTask (id) {
      this.$router.push(`/todos/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .card{
    border: 1px solid #cecece;
    &__header{
      padding: 20px;
      background: #16a085;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__name{
      color: #fff;
      font-size: 18px;
    }
    &__body{
      padding: 20px;
    }
  }
  .todos{
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
</style>