import { combineReducers } from 'redux';
import { itemsReducer } from './itemsReducer';
import { shoppingCartReducer } from './shoppingCartReducer';
import { categoriesReducer } from './categoriesReducer';

const rootReducer = combineReducers({
  items: itemsReducer,
  shoppingCart: shoppingCartReducer,
  categories: categoriesReducer 
});

export default rootReducer;
