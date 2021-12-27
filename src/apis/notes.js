import request from "../helpers/request.js";
import {countDown} from "../helpers/util.js";

const URL = {
  GET: '/notes/from/:notebookId',
  ADD: '/notes/to/:notebookId',
  UPDATE: '/notes/:noteId',
  DELETE: '/notes/:noteId'
}

export default {
  getAll({notebookId}) {
    return new Promise((resolve, reject) => {
      request(URL.GET.replace(':notebookId', notebookId)).then(res => {
        res.data=res.data.sort((note1,note2)=>note1.updatedAt<note2.updatedAt?1:-1);
        res.data.forEach(note=>{
          note.countDownData= countDown(note.updatedAt);
        })
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },
  addNote({notebookId}, {title = '', content = ''} = {title: '', content: ''}) {
    return request(URL.ADD.replace(':notebookId', notebookId), 'POST', {title, content});
  },
  updateNote({noteId}, {title, content}) {
    return request(URL.UPDATE.replace(':noteId', noteId), 'PATCH', {title, content})
  },
  deleteNote({noteId}) {
    return request(URL.DELETE.replace(':noteId', noteId), 'DELETE');
  },
}
