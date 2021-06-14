import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myName: '',
    fromName: '',
    toName: '',
    modalStatus: {
      input: false,
      login: false,
      warn: false,
    }
  },
  mutations: {
    SET_LOGIN(state, data)  // 아래와 합친다 이름(관심사) 묶음
    {
      state.myName = data.myName
    },
    SET_TARGET(state, data)
    {
      for (const [k, v] of Object.entries(data))
      {
        state[k] = v
      }
    },
    SET_CHAT(state, data)
    {
      state.toName = data.toName
    },
    SET_MODAL_STATUS(state, { target, status })
    {
      state.modalStatus[target] = status
    },
  },
  actions: {
  },
  modules: {
  }
})
