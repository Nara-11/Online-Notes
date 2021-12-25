<template>
  <span :title="username">{{ slug }}</span>
</template>

<script>
import Auth from '../apis/auth.js';
import Bus from '../helpers/bus.js'

export default {
  name: 'Avatar',
  data() {
    return {
      username: 'User',
    }
  },
  created() {
    Bus.$on('userInfo', user => {
      this.username = user.username;
    })
    Auth.getInfo().then(res => {
      if (res.isLogin) {
        this.username = res.data.username;
      }
    })
  },
  computed: {
    slug() {
      return this.username[0].toUpperCase();
    }
  }
}
</script>

<style scoped lang="less">
span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
}
</style>
