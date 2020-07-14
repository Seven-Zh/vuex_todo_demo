import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 数据列表
    list: [],
    // 输入框的值
    inputValue: 'aaa',
    nextId: 5,
    btnType: 'all'
  },
  mutations: {
    // 初始化list
    initList(state, list) {
      state.list = list
    },
    // 同步输入框的值
    updataInput(state, val) {
      state.inputValue = val
    },
    // 添加事项
    addItems(state) {
      const temp = {
        id: state.nextId,
        info: state.inputValue,
        done: false
      }
      state.list.push(temp)
      state.inputValue = ''
      state.nextId++
    },
    // 删除事项
    removeItem(state, id) {
      // 查索引
      const i = state.list.findIndex(item => {
        return item.id === id
      })
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    // 复选框change事件
    cbStatuChange(state, id) {
      const i = state.list.findIndex(item => item.id === id)
      if (i !== -1) {
        state.list[i].done = !state.list[i].done
      }
    },
    // 删除已完成项
    removeDone(state) {
      state.list = state.list.filter(i => !i.done)
    },
    // 切换列表
    changeBtn(state, key) {
      state.btnType = key
    }
  },
  actions: {
    // 发送请求获取数据
    async getList(context) {
      const res = await axios.get('/list.json')
      context.commit('initList', res.data)
    }
  },
  modules: {
  },
  getters: {
    // 未完成项
    lastItem(state) {
      return state.list.filter(i => !i.done).length
    },
    // 根据button类别返回不同的list数据
    listInfo(state) {
      if (state.btnType === 'all') {
        return state.list
      }
      if (state.btnType === 'done') {
        return state.list.filter(i => i.done)
      }
      if (state.btnType === 'undone') {
        return state.list.filter(i => !i.done)
      }
      return state.list
    }
  }
})
