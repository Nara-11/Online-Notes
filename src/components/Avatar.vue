<template>
  <span :title="username">{{ slug }}</span>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: 'Avatar',
  data() {
    return {}
  },
  created() {
   this.setUser();
  },
  methods: {
    ...mapActions({
      setUser:'checkLogin'
    })
  },
  computed: {
    ...mapGetters([
      'username',
      'slug'
    ])
  }
}
</script>

<style scoped lang="less">
span {
  display: inline-block;
  width: 35px;
  height: 35px;
  text-align: center;
  line-height: 37px;
  border-radius: 50%;
  background: #fff;
  color: #B55650;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 24px;
  margin-top: 15px;
}
</style>
