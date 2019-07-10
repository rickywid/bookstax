import { combineReducers } from 'redux';
import getUser from './getUserReducer';
import auth from './authReducer';

export default combineReducers({
  getUser,
  auth,
});
