import { v4 as uuidv4 } from 'uuid'
import Todo from '@/utils/Todo'

export default {
  state: {
    tasks: [
      {
        id: 1,
        name: 'Task 1',
        todos: [
          {
            id: 1,
            checked: false,
            text: 'Todo 1'
          },
          {
            id: 2,
            checked: false,
            text: 'Todo 2'
          },
          {
            id: 3,
            checked: false,
            text: 'Todo 3'
          },
          {
            id: 4,
            checked: false,
            text: 'Todo 4'
          }
        ]
      },
      {
        id: 2,
        name: 'Task 2',
        todos: [
          {
            id: 1,
            checked: false,
            text: 'Todo 1'
          },
          {
            id: 2,
            checked: false,
            text: 'Todo 2'
          },
          {
            id: 3,
            checked: false,
            text: 'Todo 3'
          },
          {
            id: 4,
            checked: false,
            text: 'Todo 4'
          }
        ]
      }
    ]
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    getTasks (state) {
      return state.tasks
    },
    getTaskById (state) {
      return id => {
        return state.tasks.find(task => task.id = id)
      }
    }
  }
}