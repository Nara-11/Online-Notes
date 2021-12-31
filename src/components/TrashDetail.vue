<template>
  <div id="trash">
    <div class="trash-sidebar">
      <h3 class="trash-title">回收站</h3>
      <div class="menu">
        <div>修改时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="note in trashNotes">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="date">{{ note.countDownData }}</span>
            <span class="title">{{ note.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="note-detail">
      <div class="note-bar" v-if="true">
        <span>创建日期：{{ curTrashNote.createDate }}</span>
        <span>|</span>
        <span>更新时间：{{ curTrashNote.countDownData }}</span>
        <span>|</span>
        <span>所属笔记本：{{ belongTo }}</span>
        <a class="btn action" @click="onDelete">彻底删除</a>
        <a class="btn action" @click="onRevert">恢复</a>
      </div>
      <div class="note-title">
        <span>{{ curTrashNote.title }}</span>
      </div>
      <div class="content">
        <div class="preview markdown-body" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import MarkdownIt from 'markdown-it';
import Trash from '../apis/trash.js'

let md = new MarkdownIt();
window.Trash=Trash;

export default {
  name: 'TrashDetail',
  data() {
    return {
      curTrashNote: {
        id: 3,
        title: 'biji',
        content: '##hello',
        createDate: '2021',
        countDownData: 'gg'
      },
      belongTo: 'wode',
      trashNotes: [
        {
          id: 3,
          title: 'biji',
          content: '##hello',
          createDate: '2021',
          countDownData: 'gg'
        },
        {
          id: 5,
          title: 'biji2',
          content: '##hello2',
          createDate: '20212',
          countDownData: 'gg2'
        },
        {
          id: 4,
          title: 'biji3',
          content: '##hello3',
          createDate: '20213',
          countDownData: 'gg3'
        },
      ]
    }
  },
  created() {
    this.checkLogin({path: '/login'});
  },
  computed: {
    compiledMarkdown() {
      return md.render(this.curTrashNote.content || '');
    }
  },
  methods: {
    ...mapActions([
      'checkLogin'
    ]),
    onDelete() {
    },
    onRevert() {

    }
  }
}
</script>

<style scoped lang="less">
#trash {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;

  .note-bar {
    .action {
      float: right;
      margin-left: 10px;
      padding: 2px 4px;
      font-size: 12px;

    }
  }
}

.trash-sidebar {
  position: relative;
  width: 290px;
  border-right: 1px solid #ccc;
  background-color: #eee;

  .add-note {
    position: absolute;
    right: 5px;
    top: 12px;
    color: #666;
    font-size: 12px;
    padding: 2px 4px;
    box-shadow: 0 0 2px 0 #ccc;
    border: none;
    z-index: 1;
  }

  .trash-title {
    font-size: 18px;
    font-weight: normal;
    color: #333;
    height: 45px;
    line-height: 45px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    background-color: #f7f7f7;
    display: block;
  }

  .el-dropdown-link {
    cursor: pointer;
  }

  .el-dropdown-menu__item {
    width: 200px;
  }

  .menu {
    display: flex;

    div {
      font-size: 12px;
      padding: 2px 10px;
      flex: 1;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;

      &:last-child {
        border-right: none;
      }
    }

    .iconfont {
      font-size: 10px;
    }
  }

  .notes {
    li {

      &:nth-child(odd) {
        background-color: #f2f2f2;
      }

      a {
        display: flex;
        padding: 3px 0;
        font-size: 12px;
        border: 2px solid transparent;
      }

      .router-link-exact-active {
        border: 2px solid #81c0f3;
        border-radius: 3px;
      }

      span {
        padding: 0 10px;
        flex: 1;
      }
    }
  }
}

.note-detail {
  flex: 1;
  display: flex;
  flex-direction: column;

  .note-detail-ct {
    height: 100%;
  }

  .note-empty {
    font-size: 50px;
    color: #ccc;
    text-align: center;
    margin-top: 100px;
  }

  .note-bar {
    padding: 4px 20px;
    border-bottom: 1px solid #eee;

    &:after {
      content: '';
      display: block;
      clear: both;
    }

    span {
      font-size: 12px;
      color: #999;
      margin-right: 4px;
    }

    .iconfont {
      float: right;
      margin-left: 4px;
      font-size: 18px;
      cursor: pointer;
    }

  }

  .note-title {
    input, span {
      display: inline-block;
      width: 100%;
      border: none;
      outline: none;
      font-size: 18px;
      padding: 10px 20px;
    }
  }

  .content {
    height: ~"calc(100% - 70px)";
    position: relative;
  }

  textarea, .preview {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 20px;
  }

  textarea {
    border: none;
    resize: none;
    outline: none;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
  }

  code {
    color: #f66;
  }
}
</style>
