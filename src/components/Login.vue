<template>
  <div id="login">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main"></div>
          <div class="form">
            <h3 @click="showRegister" v-bind:class="{selected: isShowRegister}">注册</h3>
            <transition name="slide">
              <div class="register" v-bind:class="{show: isShowRegister}">
                <input type="text" v-model="register.username" placeholder="请输入用户名">
                <input type="password" v-model="register.password" @keyup.enter="onRegister" placeholder="请输入密码">
                <p v-bind:class="{error:register.isError}">{{ register.notice }}</p>
                <div class="button" @click="onRegister">注册</div>
              </div>
            </transition>
            <h3 @click="showLogin" v-bind:class="{selected: isShowLogin}">登录</h3>
            <transition name="slide">
              <div class="login" v-bind:class="{show: isShowLogin}">
                <input type="text" v-model="login.username" placeholder="请输入用户名">
                <input type="password" v-model="login.password" @keyup.enter="onLogin" placeholder="请输入密码">
                <p v-bind:class="{error:login.isError}">{{ login.notice }}</p>
                <div class="button" @click="onLogin">登录</div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      isShowRegister: false,
      isShowLogin: true,
      register: {
        username: '',
        password: '',
        notice: '请记住用户名和密码',
        isError: false
      },
      login: {
        username: '',
        password: '',
        notice: '请输入正确的用户名和密码',
        isError: false
      }
    }
  },
  methods: {
    ...mapActions({
      loginUser:'login',
      registerUser:'register'
    }),
    showRegister() {
      this.isShowRegister = true;
      this.isShowLogin = false;
    },
    showLogin() {
      this.isShowLogin = true;
      this.isShowRegister = false;
    },
    onRegister() {
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.register.username)) {
        this.register.isError = true;
        this.register.notice = '用户名3~15个字符，仅限于字母数字下划线中文';
        return;
      }
      if (!/^.{6,16}$/.test(this.register.password)) {
        this.register.isError = true;
        this.register.notice = '密码长度为6~16个字符';
        return;
      }
      this.registerUser({username: this.register.username, password: this.register.password}).then(() => {
        this.register.isError = false;
        this.register.notice = '';
        this.$router.push({path: 'notebooks'});
      }).catch(data => {
        this.register.isError = true;
        this.register.notice = data.msg;
      })
    },
    onLogin() {
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.login.username)) {
        this.login.isError = true;
        this.login.notice = '用户名3~15个字符，仅限于字母数字下划线中文';
        return;
      }
      if (!/^.{6,16}$/.test(this.login.password)) {
        this.login.isError = true;
        this.login.notice = '密码长度为6~16个字符';
        return;
      }
      this.loginUser({username: this.login.username, password: this.login.password}).then(()=> {
        this.login.isError = false;
        this.login.notice = '';
        this.$router.push({path: 'notebooks'});
      }).catch(data => {
        this.login.isError = true;
        this.login.notice = data.msg;
      })
    },
  }
}
</script>

<style scoped lang="less">
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  height: 350px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;

  .main {
    flex: 1;
    background: #B55650 url(../assets/bgk.jpg) center center no-repeat;
    background-size: contain;
  }

  .form {
    width: 270px;
    border-left: 1px solid #ccc;

    h3 {
      padding: 10px 20px;
      font-weight: normal;
      font-size: 16px;
      border-top: 1px solid #eee;
      cursor: pointer;

      &:nth-of-type(2) {
        border-bottom: 1px solid #eee;
      }

      &.selected {
        border-bottom: 2px solid #B55650;
      }
    }

    .button {
      background-color: #A53C38;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-weight: bold;
      color: #fff;
      border-radius: 4px;
      margin-top: 18px;
      cursor: pointer;
    }

    .login, .register {
      padding: 0 20px;
      border-top: 1px solid #eee;
      height: 0;
      overflow: hidden;
      transition: height .4s;

      &.show {
        height: 250px;
      }

      input {
        display: block;
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0 6px;
        border-radius: 4px;
        border: 1px solid #ccc;
        outline: none;
        font-size: 14px;
        margin-top: 20px;
      }

      input:focus {
        border: 2px solid #B55650;
      }

      p {
        font-size: 12px;
        margin-top: 10px;
        color: #444;
      }

      .error {
        color: red;
      }
    }

    .login {
      border-top: 0;
    }
  }
}
</style>
