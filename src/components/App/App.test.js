import React from 'react';
import { shallow } from 'enzyme';

import { App, mapStateToProps, mapDispatchToProps } from './App';

const renderApp = (props = {}) => {
  const defaultItems = [
    { title: 'TodoA', id: '-idA-', isCompleted: true },
    { title: 'TodoB', id: '-idB-', isCompleted: false }
  ];
  const defaultOnAddItem = () => {};
  const defaultOnCompleteItem = () => {};
  const defaultOnDeleteItem = () => {};

  return (
    <App
      onAddItem={defaultOnAddItem}
      onCompleteItem={defaultOnCompleteItem}
      onDeleteItem={defaultOnDeleteItem}
      items={defaultItems}
      {...props}
    />
  );
};

const shallowRenderApp = (props) => shallow(renderApp(props));

describe('<App>', () => {
  it('Should render', () => {
    const actual = shallowRenderApp();
    expect(actual).toMatchSnapshot();
  });

  it('Should update item value on change', () => {
    const actual = shallowRenderApp();
    actual.find('.todoItem').simulate('change', { target: { value: 'TodoA' } });
    expect(actual.state().itemValue).toBe('TodoA');
  });

  it('Should clear input value on when clear button is clicked', () => {
    const actual = shallowRenderApp();
    actual.setState({ itemValue: 'TodoB' });
    expect(actual.state().itemValue).toBe('TodoB'); // Making sure itemValue is not an empty string
    actual.instance().handleClearItemValue();
    expect(actual.state().itemValue).toBe('');
  });

  it('Should call onAddItem', () => {
    const onAddItem = jest.fn();
    const actual = shallowRenderApp({ onAddItem });
    actual.setState({ itemValue: 'TodoC' });
    actual.instance().onAddItem();
    expect(onAddItem).toBeCalledWith('TodoC');
    expect(actual.state().itemValue).toBe('');
  });

  it('Should call onDeleteItem', () => {
    const onDeleteItem = jest.fn();
    const fakeEvent = {};
    const actual = shallowRenderApp({ onDeleteItem });
    actual.instance().onDeleteItem(fakeEvent, '-idA-');
    expect(onDeleteItem).toBeCalledWith('-idA-');
  });

  it('Should call onCompleteItem', () => {
    const onCompleteItem = jest.fn();
    const fakeEvent = {};
    const actual = shallowRenderApp({ onCompleteItem });
    actual.instance().onCompleteItem(fakeEvent, '-idB-');
    expect(onCompleteItem).toBeCalledWith('-idB-');
  });

  it('Should show todo items', () => {
    const initialState = {
      items: [{ title: 'Test mapStateToProps', id: '-idMSTP-', isCompleted: false }]
    };
    expect(mapStateToProps(initialState)).toEqual({
      items: [{ title: 'Test mapStateToProps', id: '-idMSTP-', isCompleted: false }]
    });
  });

  it('Should dispatch onAddItem successfully', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onAddItem('dispatch');
    expect(dispatch).toBeCalledWith({ item: 'dispatch', type: 'ADD_ITEM' });
  });

  it('Should dispatch onCompleteItem successfully', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onCompleteItem('idA');
    expect(dispatch).toBeCalledWith({ id: 'idA', type: 'COMPLETE_ITEM' });
  });

  it('Should dispatch onDeleteItem successfully', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onDeleteItem('idB');
    expect(dispatch).toBeCalledWith({ id: 'idB', type: 'DELETE_ITEM' });
  });
});
