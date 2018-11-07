import { combineReducers } from 'redux';
import { itemsReducer } from './itemsReducer';
import { shoppingCartReducer } from './shoppingCartReducer';

const rootReducer = combineReducers({
  items: itemsReducer,
  shoppingCart: shoppingCartReducer
});

export default rootReducer;
