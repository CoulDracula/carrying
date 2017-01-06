
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import user from './user';
import list from './list';
import memo from './memo';
import title from './title';

export default combineReducers({
  drawer,
  user,
  list,
  cardNavigation,
  memo,
  title,
});
