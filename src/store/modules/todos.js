import { v4 as uuidv4 } from 'uuid'
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
    addTask (state, payload) {
      state.tasks.unshift(payload)
    },
    deleteTask (state, payload) {
      state.tasks = state.tasks.filter(task => task.id !== payload)
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

    async addTask ({ commit }) {
      try {
        const task = {
          name: 'Task 1',
          todos: [
            new Todo({id: uuidv4(), text: 'Todo 1'}),
            new Todo({id: uuidv4(), text: 'Todo 2'}),
            new Todo({id: uuidv4(), text: 'Todo 3'}),
            new Todo({id: uuidv4(), text: 'Todo 4'}),
          ]
        }
        const res = await axios.post(`${API_URL}/tasks.json`, task)
        const taskResult = {
          ...task,
          id: res.data.name
        }
        commit('addTask', taskResult)
      } catch (err) {
        console.log(err)
      }
    },

    async deleteTask ({ commit }, payload) {
      try {
        const res = await axios.delete(`${API_URL}/tasks/${payload}.json`)
        commit('deleteTask', payload)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }

  },
  getters: {
    getTasks (state) {
      return state.tasks
    },
    getTaskById (state) {
      console.log(state.tasks)
      return id => {
        return state.tasks.find(task => task.id === id)
      }
    }
  }
}