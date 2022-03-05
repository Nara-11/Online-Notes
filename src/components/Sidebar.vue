<template>
  <div id="sidebar">
    <avatar></avatar>
    <div class="icons">
      <router-link to="/note" title="笔记详情"><i class="iconfont icon-note"></i>笔记详情</router-link>
      <router-link to="/notebooks" title="笔记本"><i class="iconfont icon-notebook"></i>笔记本</router-link>
      <router-link to="/trash" title="回收站"><i class="iconfont icon-trash"></i>回收站</router-link>
    </div>
    <div class="logout">
      <i class="iconfont icon-logout" @click="onLogout"></i>
    </div>
  </div>
</template>

<script>
import avatar from "./Avatar.vue";
import {mapActions} from "vuex";

export default {
  name: 'Sidebar',
  components: {avatar},
  methods: {
    ...mapActions(['logout']),
    onLogout() {
      this.logout({path:'/login'});
    }
  }
}
</script>

<style scoped lang="less">
#sidebar {
  position: relative;
  width: 100px;
  text-align: center;
  background: #A53C38;
}

.icons {
  margin: 20px 10px;
  text-align: left;

  a {
    padding: 6px 0;
    display: block;
    color: white;
  }

  .router-link-active {
    background-color: #B55650;
  }
}

.logout {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}

.iconfont {
  color: #fff;
}
</style>
