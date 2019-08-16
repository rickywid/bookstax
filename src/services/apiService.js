/* eslint-disable */

import { HttpClient } from './httpClient';
import { HeaderAcceptValue, HeaderContentTypeValue } from '../const';

export class ApiService {
  httpClient = new HttpClient();

  headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  }

  // get current (logged in) user profile
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

  // get user's profile
  getUserProfile(userId) {
    return this.httpClient.get(
      `${process.env.REACT_APP_HOSTNAME}/user/${userId}`,
      { 
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
    );
  }

  // update user's profile
  updateUserProfile(userId, data) {
    this.httpClient.post(
      `${process.env.REACT_APP_HOSTNAME}/user/${userId}/update`,
      {
        'Content-Type': 'application/json',
      },
      data
    )
  }

  // get user's bookshelf
  getUserBookshelf() {}

  // update user's bookshelf
  updateUserBookshelf(bookshelfId, data) {
    return this.httpClient.put(
      `${process.env.REACT_APP_HOSTNAME}/user/update/books/${bookshelfId}`,
      { 'Content-Type': 'application/json' },
      data,
    );
  }

  // get user's bookshelf likes
  getUserBookshelfLikes() {}

  // add user like for bookshelf
  addUserLikeBookshelf(data) {
    console.log(data)
    return this.httpClient.delete(
      `${process.env.REACT_APP_HOSTNAME}/user/update/list/likes`,
      { 'Content-Type': 'application/json' },
      data,
    );
  }

  // remove user like for bookshelf
  removedUserLikeBookshelf() {}

  // add book to user's backlog
  saveBook() {}

  // search books
  searchBooks() {}

  // submit bookshelf comments
  submitBookshelfComment(data) {
    console.log(data)
    return this.httpClient.post(
      `${process.env.REACT_APP_HOSTNAME}/bookshelf/comment/new`,
      { 'Content-Type': 'application/json' },
      data,
    );
  }
}

export default ApiService;
 