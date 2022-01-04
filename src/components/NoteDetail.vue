<template>
  <div id="note">
    <note-sidebar @update:notes="val=>notes=val"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">
        请新建笔记
      </div>
      <div class="note-full" v-show="curNote.id">
        <div class="note-bar">
          <span>创建日期：{{ curNote.createDate }}</span>
          <span>修改时间：{{ curNote.countDownData }}</span>
          <span>{{ statusText }}</span>
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span class="iconfont icon-fullscreen" @click="isShowPreview=!isShowPreview"></span>
        </div>
        <div class="note-title">
          <input type="text" v-model:value="curNote.title" @input="onUpdateNote" @keydown="statusText='输入中'"
                 placeholder="请输入标题">
        </div>
        <div class="note-content">
          <textarea v-show="!isShowPreview" v-model:value="curNote.content" @input="onUpdateNote"
                    @keydown="statusText='输入中'"
                    placeholder="请输入内容，支持Markdown语法"></textarea>
          <div class="preview markdown-body" v-show="isShowPreview" v-html="previewContent"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from '../components/NoteSidebar.vue';
import _ from 'lodash';
import MarkdownIt from 'markdown-it';
import {mapActions, mapGetters,mapMutations} from 'vuex';

let md = new MarkdownIt();

export default {
  name: 'NoteDetail',
  components: {
    NoteSidebar
  },
  data() {
    return {
      statusText: '未改动',
      isShowPreview: false
    }
  },
  created() {
    this.checkLogin({path:'/login'});
  },
  computed: {
    ...mapGetters([
      'notes',
      'curNote'
    ]),
    previewContent() {
      return md.render(this.curNote.content || '');
    }
  },
  methods: {
    ...mapMutations([
      'setCurNote'
    ]),
    ...mapActions([
      'updateNote',
      'deleteNote',
      'checkLogin'
    ]),
    onUpdateNote: _.debounce(function () {
      this.updateNote({
        noteId: this.curNote.id,
        title: this.curNote.title,
        content: this.curNote.content
      }).then(() => {
        this.statusText = '已保存';
      }).catch(() => {
        this.statusText = '保存出错';
      })
    }, 300),
    onDeleteNote() {
      this.deleteNote({noteId: this.curNote.id}).then(() => {
        this.$router.replace({path: '/note'});
      })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.setCurNote({curNoteId: to.query.noteId});
    next();
  }
}
</script>

<style scoped lang="less">
#note {
  display: flex;
  align-items: stretch;
  background: #fff;
  flex: 1;
}

.note-detail {
  flex: 1;
  display: flex;
  flex-direction: column;

  .note-full {
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
    border-bottom: 1px solid #eee;
    input, span {
      display: inline-block;
      width: 100%;
      border: none;
      outline: none;
      font-size: 18px;
      padding: 10px 20px;
    }
  }

  .note-content {
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
