'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
//  const comments = list.map(createComment).join('');
//  commentsContainer.innerHTML += comments;
  let fragment = browserEngine(list.map(commentTemplate));
  commentsContainer.appendChild(fragment);
}

function createComment(comment) {
  return `<div class="comment-wrap">
    <div class="photo" title="${comment.author.name}">
      <div class="avatar" style="background-image: url('${comment.author.pic}')"></div>
    </div>
    <div class="comment-block">
      <p class="comment-text">
        ${comment.text.split('\n').join('<br>')}
      </p>
      <div class="bottom-comment">
        <div class="comment-date">${new Date(comment.date).toLocaleString('ru-Ru')}</div>
        <ul class="comment-actions">
          <li class="complain">Пожаловаться</li>
          <li class="reply">Ответить</li>
        </ul>
      </div>  
    </div>
  </div>`
}

function commentTemplate(comment) {
       return { 
           tag: 'div',
           cls: 'comment-wrap',
           content: [
              { 
                 tag: 'div',
                 cls: 'photo',
                 attrs: {
                    title: comment.author.name
                 }, 
                 content: [
                    {
                       tag: 'div',
                       cls: 'avatar',
                       attrs: {
                         style: 'background-image: url('+ comment.author.pic + ')'
                       },
                       content: ''
                    } //div
                 ]
              }, //div
              {
                 tag: 'div',
                 cls: 'comment-block',
                 content: [
                    {
                       tag: 'p',
                       cls: 'comment-text',
                       content: comment.text
                    }, //p
                    {
                       tag: 'div',
                       cls: 'bottom-comment',
                       content: [
                          {
                             tag: 'div',
                             cls: 'comment-date',
                             content: new Date(comment.date).toLocaleString('ru-Ru')
                          },//div
                          {
                             tag: 'ul',
                             cls: 'comment-actions',
                             content: [
                                {
                                   tag: 'li',
                                   cls: 'complain',
                                   content: 'Пожаловаться'
                                },//li
                                {
                                   tag: 'li',
                                   cls: 'reply',
                                   content: 'Ответить'
                                }//li
                             ]
                          }//ul
                       ]
                    }//div
                 ]
              }, //div
               
           ]
       };
   }
fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
 
   function browserEngine(block, flag = false) {
      let tmpBr = document.createElement('br');
       if ((typeof block === 'string') || (typeof block === 'number')) {
           return document.createTextNode(block);
       }
       if(flag){
         
       }
     
       if (Array.isArray(block)) {
           return block.reduce(function(f, item) {
               f.appendChild(browserEngine(item));
               return f;
           }, document.createDocumentFragment());
       }
 
       const element = document.createElement(block.tag);
       element.className = block.cls;
 
       if (block.content) {
           element.appendChild(browserEngine(block.content));
       }
 
       if (block.attrs) {
           Object.keys(block.attrs).forEach(function(key) {
               element.setAttribute(key, block.attrs[key]);
           });
       }
 
       return element;
   }
 
