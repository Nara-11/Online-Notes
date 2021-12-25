import request from '../helpers/request.js';
import {countDown} from '../helpers/util.js';

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:id',
  DELETE: '/notebooks/:id'
}

export default {
  getAll() {
    return new Promise((resolve,reject)=>{
      request(URL.GET).then(res=>{
        res.data=res.data.sort((notebook1,notebook2)=>notebook1.createdAt<notebook2.createdAt?1:-1);
        res.data.forEach(notebook=>{
          notebook.countDownData=countDown(notebook.createdAt);
        })
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  },
  addNotebook({title=''}={title: ''}) {
    return request(URL.ADD,'POST',{title});
  },
  updateNotebook(notebookId,{title=''}={title: ''}) {
    return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', {title})
  }
  ,
  deleteNotebook(notebookId) {
    return request(URL.DELETE.replace(':id', notebookId),'DELETE');
  },
  refresh(){
    return request(URL.GET);
  }
}
