import { createStore } from 'redux';

import { addItem, deleteItem, completeItem, reducers } from './Todo';

export const actions = { addItem, deleteItem, completeItem };
export const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line no-underscore-dangle
);
