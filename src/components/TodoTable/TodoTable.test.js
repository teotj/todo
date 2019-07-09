import React from 'react';
import { shallow } from 'enzyme';

import TodoTable from './TodoTable';

const renderTodoTable = (props = {}) => {
  const defaultItems = [
    { title: 'TodoA', id: '-id1-', isCompleted: true },
    { title: 'TodoB', id: '-id2-', isCompleted: false }
  ];
  const defaultOnComplete = () => {};
  const defaultOnDelete = () => {};
  return (
    <TodoTable
      items={defaultItems}
      onComplete={defaultOnComplete}
      onDelete={defaultOnDelete}
      {...props}
    />
  );
};

const shallowRenderTodoTable = (props) => shallow(renderTodoTable(props));

describe('<TodoTable>', () => {
  it('Should render', () => {
    const actual = shallowRenderTodoTable();
    expect(actual).toMatchSnapshot();
  });

  it('Should render empty results', () => {
    const items = [];
    const actual = shallowRenderTodoTable({ items });
    expect(actual).toMatchSnapshot();
  });

  it('Should call onComplete', () => {
    const onComplete = jest.fn();
    const actual = shallowRenderTodoTable({ onComplete });
    actual.find('.complete').at(0).simulate('click'); // As there are 2 items, call the first one
    expect(onComplete).toBeCalledWith(undefined, '-id1-'); // Undefined for the 'e' event
  });

  it('Should call onDelete', () => {
    const onDelete = jest.fn();
    const actual = shallowRenderTodoTable({ onDelete });
    actual.find('.delete').at(1).simulate('click');
    expect(onDelete).toBeCalledWith(undefined, '-id2-');
  });
});
