import Auth from '../../apis/auth.js';
import router from '../../router';

const state = {
  user: null
}
const getters = {
  username: state => state.user === null ? 'User' : state.user.username,
  slug: state => state.user === null ? 'U' : state.user.username.charAt(0)
}
const mutations = {
  setUser(state, payload) {
    state.user = payload.user;
  }
}
const actions = {
  login({commit}, {username, password}) {
    return Auth.login({username, password}).then(res => {
      commit('setUser', {user: res.data});
    })
  },
  register({commit}, {username, password}) {
    return Auth.register({username, password}).then(res => {
      commit('setUser', {user: res.data});
    })
  },
  logout({commit}, payload = {path: '/login'}){
    return Auth.logout().then(res=>{
      commit('setUser',{user:null});
      router.push(payload);
    })
  },
  checkLogin({commit, state}, payload= {path: '/'}) {
    if (state.user !== null) return Promise.resolve();
    return Auth.getInfo().then(res => {
      if (!res.isLogin) {
        router.push(payload);
      } else {
        commit('setUser', {user: res.data});
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
