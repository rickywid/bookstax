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
  getCurrentUserProfile() {
    return this.httpClient.get(
      'http://localhost:3001/user/auth',
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
      `http://localhost:3001/user/${userId}`,
      { 
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
    );
  }

  // update user's profile
  updateUserProfile(userId, data) {
    this.httpClient.post(
      `http://localhost:3001/user/${userId}/update`,
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
      `http://localhost:3001/user/update/books/${bookshelfId}`,
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
      'http://localhost:3001/user/update/list/likes',
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
      `http://localhost:3001/bookshelf/comment/new`,
      { 'Content-Type': 'application/json' },
      data,
    );
  }
}

export default ApiService;
 