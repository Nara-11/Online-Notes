<template>
  <div id="sidebar">
    <avatar></avatar>
    <div class="icons">
      <router-link to="/note/1" title="所有笔记"><i class="iconfont icon-note"></i>所有笔记</router-link>
      <router-link to="/notebooks" title="笔记本"><i class="iconfont icon-notebook"></i>笔记本</router-link>
      <router-link to="/trash/1" title="废纸篓"><i class="iconfont icon-trash"></i>废纸篓</router-link>
    </div>
    <div class="logout">
      <i class="iconfont icon-logout" @click="logout"></i>
    </div>
  </div>
</template>

<script>
import avatar from "./Avatar";
import Auth from "../apis/auth.js";

export default {
  components: {avatar},
  methods: {
    logout() {
      Auth.logout().then(data => {
        console.log(data);
      })
    }
  }
}
</script>

<style scoped lang="less">
#sidebar {
  position: relative;
  width: 100px;
  text-align: center;
  background: #2c333c;
}

.icons {
  margin-top: 15px;

  a {
    padding: 6px 0;
    display: block;
    color: white;
  }

  .router-link-active {
    background-color: #5e6266;
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
