const ADD_ITEM = 'ADD_ITEM';
const COMPLETE_ITEM = 'COMPLETE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';

const initialState = {
  items: []
};

// actions
export const addItem = (item) => ({ type: ADD_ITEM, item });
export const completeItem = (id) => ({ type: COMPLETE_ITEM, id });
export const deleteItem = (id) => ({ type: DELETE_ITEM, id });

// reducers
const addItemReducer = (state, action) => {
  const id = `-${Math.random().toString(36).substr(2, 9)}-`;
  const newItem = { title: action.item, isCompleted: false, id };

  return {
    ...state,
    items: [...state.items, newItem]
  };
};

const completeItemReducer = (state, action) => ({
  ...state,
  items: state.items.map((item) => ({ ...item, isCompleted: item.id === action.id || item.isCompleted }))
});

const deleteItemReducer = (state, action) => ({
  ...state,
  items: state.items.filter(({ id }) => id !== action.id)
});

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return addItemReducer(state, action);
    case COMPLETE_ITEM:
      return completeItemReducer(state, action);
    case DELETE_ITEM:
      return deleteItemReducer(state, action);
    default:
      return state;
  }
};

export { reducers };
