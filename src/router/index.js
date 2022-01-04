import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: ()=>import('../components/Login.vue')
    },
    {
      path:'/',
      alias: '/notebooks',
      name: 'NotebookList',
      component: ()=>import('../components/NotebookList.vue')
    },
    {
      path: '/note',
      name:'NoteDetail',
      component: ()=>import('../components/NoteDetail.vue')
    },
    {
      path: '/trash',
      name:'TrashDetail',
      component: ()=>import('../components/TrashDetail.vue')
    },
  ]
})
