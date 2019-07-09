import { addItem, deleteItem, completeItem, reducers } from 'store/Todo';

describe('Todo store actions', () => {
  const initialState = {
    items: [
      { title: 'titleA', id: '-idA-', isCompleted: false },
      { title: 'titleB', id: '-idB-', isCompleted: false }
    ]
  };

  it('Creates an action to add a todo item', () => {
    const expectedAction = { type: 'ADD_ITEM', item: 'todoA' };
    expect(addItem('todoA')).toEqual(expectedAction);
  });

  it('Creates an action to complete a todo item', () => {
    const expectedAction = { type: 'COMPLETE_ITEM', id: '-idA-' };
    expect(completeItem('-idA-')).toEqual(expectedAction);
  });

  it('Creates an action to delete a todo item', () => {
    const expectedAction = { type: 'DELETE_ITEM', id: '-idB-' };
    expect(deleteItem('-idB-')).toEqual(expectedAction);
  });

  it('Adds item when ADD_ITEM is called', () => {
    const mockAction = { type: 'ADD_ITEM', item: 'TodoA' };
    expect((reducers(undefined, mockAction)).items[0].title).toEqual('TodoA');
  });

  it('Completes item when COMPLETE_ITEM is called', () => {
    const mockAction = { type: 'COMPLETE_ITEM', id: '-idA-' };
    expect(reducers(initialState, mockAction)).toMatchSnapshot();
  });

  it('Deletes item when DELETE_ITEM is called', () => {
    const mockAction = { type: 'DELETE_ITEM', id: '-idA-' };
    expect(reducers(initialState, mockAction)).toEqual({
      items: [{ title: 'titleB', id: '-idB-', isCompleted: false }]
    });
  });

  it('Returns default state when unknown action is called', () => {
    const mockAction = { type: 'DEFAULT', id: '-idC-' };
    expect(reducers(initialState, mockAction)).toEqual(initialState);
  });
});
