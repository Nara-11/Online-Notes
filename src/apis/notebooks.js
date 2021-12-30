import request from '../helpers/request.js';
import {countDown} from "../helpers/util";

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:id',
  DELETE: '/notebooks/:id'
}

export default {
  getAll() {
    return new Promise((resolve, reject) => {
      request(URL.GET).then(res => {
        res.data = res.data.sort((notebook1, notebook2) => notebook1.createdAt < notebook2.createdAt ? 1 : -1);
        res.data.forEach(notebook => {
          notebook.createDate = notebook.createdAt.split('T')[0];
          notebook.countDownData=countDown(res.data.updatedAt);
        })
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  },
  addNotebook({title = ''} = {title: ''}) {
    return new Promise((resolve, reject) => {
      request(URL.ADD, 'POST', {title}).then(res=>{
        res.data.createDate=res.data.createdAt.split('T')[0];
        res.data.countDownData=countDown(res.data.updatedAt);
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  updateNotebook(notebookId, {title = ''} = {title: ''}) {
    return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', {title})
  },
  deleteNotebook(notebookId) {
    return request(URL.DELETE.replace(':id', notebookId), 'DELETE');
  }
}
