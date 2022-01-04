<template>
  <div id="notebook-list">
    <header>
      <button @click.prevent="onCreate"><i class="iconfont icon-plus"></i>新建笔记本</button>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{ notebooks.length }})</h3>
        <ul class="notebook-list">
          <li v-for="notebook in notebooks">
            <router-link :to="`/note?notebookId=${notebook.id}`" class="notebook">
              <div>
                {{ notebook.title }}
                <span>{{ notebook.noteCounts||0 }}</span>
                <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
                <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
                <!--                                <span class="date">{{ notebook.countDownData }}</span>-->
                <span class="date">{{ notebook.createDate }}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'NotebookList',
  data() {
    return {}
  },
  created() {
    this.checkLogin({path: '/login'});
    this.getNotebooks();
  },
  computed: {
    ...mapGetters(['notebooks'])
  },
  methods: {
    ...mapActions([
      'getNotebooks',
      'addNotebook',
      'updateNotebook',
      'deleteNotebook',
      'checkLogin'
    ]),
    onCreate() {
      this.$prompt('请输入笔记本名：', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '笔记本名不能为空，且不超过30个字符'
      }).then(({value}) => {
        this.addNotebook({title: value});
      }).catch(() => {
        this.$message.info('取消输入');
      });
    },
    onEdit(notebook) {
      this.$prompt('请输入修改的笔记本名：', '编辑笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputValue: notebook.title,
        inputErrorMessage: '笔记本名不能为空，且不超过30个字符'
      }).then(({value}) => {
        this.updateNotebook({notebookId: notebook.id, title: value})
      }).catch(() => {
        this.$message.info('取消输入');
      });
    },
    onDelete(notebook) {
      this.$confirm('是否删除该笔记本?', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteNotebook({notebookId: notebook.id})
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    }
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

  main .date {
    padding: 1px 0;
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
