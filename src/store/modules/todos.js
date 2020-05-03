import Todo from '@/utils/Todo'
import { API_URL } from '../../constants'
import axios from 'axios'

export default {
  state: {
    tasks: []
  },
  mutations: {
    fetchTasks (state, payload) {
      state.tasks = payload
    },
    fetchTaskById (state, payload) {
      state.tasks.push(payload)
    },
    addTask (state, payload) {
      state.tasks.push(payload)
    },
    deleteTask (state, payload) {
      state.tasks = state.tasks.filter(task => task.id !== payload)
    },
    addTodo (state, payload) {
      const { id, todo } = payload
      const task = state.tasks.find(item => item.id === id)
      task.todos.push(todo)
    },
    saveTask (state, payload) {
      console.log(payload)
      console.log(state)
    },
    deleteTodo (state, payload) {
      const { taskId, todoId } = payload
      const currentTask = state.tasks.find(task => task.id === taskId)
      currentTask.todos = currentTask.todos.filter(todo => todo.id !== todoId)
    }
  },
  actions: {
    
    async fetchTasks ({ commit }) {
      try {
        const res = await axios.get(`${API_URL}/tasks.json`)
        const tasks = Object.keys(res.data).map(key => {
          return {
            ...res.data[key],
            id: key
          }
        })
        commit('fetchTasks', tasks)
      } catch (err) {
        console.log(err)
      }
    },

    async addTask ({ commit }, payload) {
      try {
        const res = await axios.post(`${API_URL}/tasks.json`, payload)
        const taskResult = {
          ...payload,
          id: res.data.name
        }
        commit('addTask', taskResult)
      } catch (err) {
        console.log(err)
      }
    },

    async fetchTaskById ({ commit }, payload) {
      try {
        const res = await axios.get(`${API_URL}/tasks/${payload}.json`)
        const fetchResult = {
          ...res.data,
          id: payload
        }
        commit('fetchTaskById', fetchResult)
      } catch (err) {
        console.log(err)
      }
    },

    async deleteTask ({ commit }, payload) {
      try {
        await axios.delete(`${API_URL}/tasks/${payload}.json`)
        commit('deleteTask', payload)
      } catch (err) {
        console.log(err)
      }
    },

    addTodo ({ commit }, payload) {
      const  {id, text } = payload
      const todo = new Todo({ text })
      const newTodoData = {
        id,
        todo
      }
      commit('addTodo', newTodoData)
    },

    async saveTask (context, payload) {
      try {
        const { id } = payload
        await axios.put(`${API_URL}/tasks/${id}.json`, payload)
      } catch (err) {
        console.log(err)
      }
    },

    deleteTodo ({ commit }, payload) {
      commit('deleteTodo', payload)
    }

  },
  getters: {
    getTasks (state) {
      return state.tasks
    },
    getTaskById (state) {
      return id => {
        return state.tasks.find(task => task.id === id)
      }
    }
  }
}