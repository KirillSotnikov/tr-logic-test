import Todo from '@/utils/Todo'
import { API_URL } from '../../constants/index'
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
    }
  },
  actions: {
    
    async fetchTasks ({ commit }) {
      const res = await axios.get(`${API_URL}/tasks.json`)
      const tasks = Object.keys(res.data).map(key => {
        return {
          ...res.data[key],
          id: key
        }
      })
      commit('fetchTasks', tasks)
    },

    async addTask ({ commit }, payload) {
      try {
        // const task = {
        //   name: 'Task 1',
        //   todos: [
        //     new Todo({ text: 'Todo 1' }),
        //     new Todo({ text: 'Todo 2' }),
        //     new Todo({ text: 'Todo 3' }),
        //     new Todo({ text: 'Todo 4' }),
        //   ]
        // }
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
      const res = await axios.get(`${API_URL}/tasks/${payload}.json`)
      const fetchResult = {
        ...res.data,
        id: payload
      }
      commit('fetchTaskById', fetchResult)
    },

    async deleteTask ({ commit }, payload) {
      try {
        const res = await axios.delete(`${API_URL}/tasks/${payload}.json`)
        commit('deleteTask', payload)
        console.log(res)
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