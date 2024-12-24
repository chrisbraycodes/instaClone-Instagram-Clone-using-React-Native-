import { combineReducers } from 'redux';
import { user } from './user';

const rootReducer = combineReducers({
  user: user, // User-related state
});

export default rootReducer;
