<template>
  <div id="notebook-list">
    <header>
      <button><i class="iconfont icon-plus"></i>新建笔记本</button>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表(2)</h3>
        <ul class="notebook-list">
          <li>
            <router-link to="/note/1" class="notebook">
              <div>
                笔记本1
                <span>1</span>
                <span class="action">删除</span>
                <span class="action">编辑</span>
                <span class="date">2018/3/8</span>
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="/note/2" class="notebook">
              <div>
                笔记本2
                <span>1</span>
                <span class="action">删除</span>
                <span class="action">编辑</span>
                <span class="date">2018/2/6</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from '../apis/auth.js';

export default {
  name: 'Login',
  data() {
    return {
      msg: '笔记本列表'
    }
  },
  created() {
    Auth.getInfo().then(res => {
      if (!res.isLogin) {
        this.$router.push({path: '/login'})
      }
    })
  }
}
</script>

<style scoped lang="less">
#notebook-list {
  flex: 1;

  button {
    border: none;
    outline: none;
    font-size: 12px;
    color: #666;
    cursor: pointer;
    padding: 2px 4px;
    margin-left: 10px;
    background: white;
    box-shadow: 0 0 2px 0;
  }

  button .iconfont {
    font-size: 12px;
  }

  input {
    width: 300px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 3px 5px;
    outline: none;
  }

  header {
    padding: 12px;
    border-bottom: 1px solid #ccc;
  }

  main {
    padding: 30px 40px;
  }

  .layout {
    max-width: 966px;
    margin: 0 auto;
  }


  main h3 {
    font-size: 12px;
    color: #000;
  }

  main .notebook-list {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
    background-color: #fff;
    border-radius: 4px;
    font-weight: bold;
  }

  main .notebook-list span {
    font-size: 12px;
    font-weight: bold;
    color: #b3c0c8;
  }

  main .action,
  main .date {
    float: right;
    margin-left: 10px;
  }

  //main .iconfont {
  //  color: #1687ea;
  //  margin-right: 4px;
  //}

  main .notebook {
    display: block;
    cursor: pointer;
  }

  main a.notebook:hover {
    background-color: #f7fafd;
  }

  main a.notebook div {
    border-bottom: 1px solid #ebebeb;
    padding: 12px 14px;
  }

  main .error-msg {
    font-size: 12px;
    color: red;
  }
}
</style>
