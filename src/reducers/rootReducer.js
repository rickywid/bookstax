import { combineReducers } from 'redux';
import getUser from './getUserReducer';
import searchResults from './searchResults';
import auth from './authReducer';

export default combineReducers({
  getUser,
  auth,
  searchResults,
});
