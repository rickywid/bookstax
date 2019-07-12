/* eslint-disable */

import { HttpClient } from './httpClient';
import { HeaderAcceptValue, HeaderContentTypeValue } from '../const';

export class ApiService {
  httpClient = new HttpClient();

  headers = {
    HeaderAcceptValue,
    HeaderContentTypeValue,
  }

  // get current (logged in) user profile
  getCurrentUserProfile() {
    return this.httpClient.get(
      'http://localhost:3001/user/auth',
      {
        ...this.headers,
        'Access-Control-Allow-Credentials': true,
      },
    );
  }

  // get user's profile
  getUserProfile() {}

  // get user's bookshelf
  getUserBookshelf() {}

  // update user's bookshelf
  updateUserBookshelf() {}

  // get user's bookshelf likes
  getUserBookshelfLikes() {}

  // add user like for bookshelf
  addUserLikeBookshelf() {}

  // remove user like for bookshelf
  removedUserLikeBookshelf() {}

  // add book to user's backlog
  saveBook() {}

  // search books
  searchBooks() {}
}

export default ApiService;
