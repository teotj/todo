import React from 'react';
import PropTypes from 'prop-types';
import { Button, Callout, HTMLTable, Intent, Tooltip } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import css from './TodoTable.css';

const TodoTable = ({ items, onComplete, onDelete }) => {
  if (items.length === 0) {
    return (
      <Callout intent={Intent.DANGER} className={css.error}>
        Todo list is either empty or filter returns no results.
      </Callout>
    );
  }

  const columns = ['Todos', 'Actions'];
  const completeButton = (id, isCompleted) => (
    <Tooltip content="Mark complete" disabled={isCompleted}>
      <Button
        minimal
        disabled={isCompleted}
        icon={IconNames.TICK_CIRCLE}
        intent={Intent.SUCCESS}
        className={css.complete}
        onClick={(e) => onComplete(e, id)}
      />
    </Tooltip>
  );
  const deleteButton = (id) => (
    <Tooltip content="Delete todo">
      <Button
        minimal
        icon={IconNames.BAN_CIRCLE}
        intent={Intent.DANGER}
        className={css.delete}
        onClick={(e) => onDelete(e, id)}
      />
    </Tooltip>
  );

  return (
    <HTMLTable className={css.root} interactive>
      <thead className={css.theader}>
        <tr>
          {columns.map((column) => (
            <th key={column} className={css[`${column}Cell`]}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody className={css.tbody}>
        {items.map(({ title, isCompleted, id }) => {
          const titleCn = isCompleted ? css.titleCompleted : css.titleActive;
          return (
            <tr key={id} className={css.tr}>
              <td className={titleCn}>{title}</td>
              <td className={css.action}>
                {completeButton(id, isCompleted)}
                {deleteButton(id)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </HTMLTable>
  );
};

TodoTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    isCompleted: PropTypes.bool,
    id: PropTypes.string
  })).isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TodoTable;
