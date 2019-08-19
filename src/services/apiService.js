/* eslint-disable */

import { HttpClient } from './httpClient';
import { HeaderAcceptValue, HeaderContentTypeValue } from '../const';

export class ApiService {
  httpClient = new HttpClient();

  headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  }

  getAllUsers() {
    return this.httpClient.get(
      `${process.env.REACT_APP_HOSTNAME}/users`,
      {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Credentials': true,
      },
    );    
  }

  getCurrentUserProfile(id) {
    return this.httpClient.get(
      `${process.env.REACT_APP_HOSTNAME}/user/auth?id=${id}`,
      {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Credentials': true,
      },
    );
  }

  getUserProfile(userId) {
    return this.httpClient.get(
      `${process.env.REACT_APP_HOSTNAME}/user/${userId}`,
      { 
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
    );
  }

  updateUserProfile(userId, data) {
    this.httpClient.post(
      `${process.env.REACT_APP_HOSTNAME}/user/${userId}/update`,
      {
        'Content-Type': 'application/json',
      },
      data
    )
  }

  getUserBookshelf(bookshelfId) {
    return this.httpClient.get(
      `${process.env.REACT_APP_HOSTNAME}/user/bookshelf/${bookshelfId}`,
      { 'Content-Type': 'application/json' },
    );
  }

  getUserBookshelfComments(bookshelfId) {
    return this.httpClient.get(
      `${process.env.REACT_APP_HOSTNAME}/bookshelf/comments/${bookshelfId}`,
      { 'Content-Type': 'application/json' },
    );
  }

  updateUserBookshelf(bookshelfId, data) {
    return this.httpClient.put(
      `${process.env.REACT_APP_HOSTNAME}/user/update/books/${bookshelfId}`,
      { 'Content-Type': 'application/json' },
      data,
    );
  }

  addUserLikeBookshelf(data) {
    return this.httpClient.delete(
      `${process.env.REACT_APP_HOSTNAME}/user/update/list/likes`,
      { 'Content-Type': 'application/json' },
      data,
    );
  }

  getUserLikesBookshelf(userId, bookshelfId) {
    return this.httpClient.get(
      `${process.env.REACT_APP_HOSTNAME}/user/list/likes/${userId}/${bookshelfId}`,
      { 'Content-Type': 'application/json' }
    ); 
  }

  submitBookshelfComment(data) {
    return this.httpClient.post(
      `${process.env.REACT_APP_HOSTNAME}/bookshelf/comment/new`,
      { 'Content-Type': 'application/json' },
      data,
    );
  }

  addBookToBookshelf(id, data) {
    return this.httpClient.post(
      `${process.env.REACT_APP_HOSTNAME}/user/addbook/${id}`,
      { 'Content-Type': 'application/json' },
      data,
    );
  }

 
}

export default ApiService;
