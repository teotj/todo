import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, FormGroup, FocusStyleManager, H3, InputGroup, Intent, Tabs, Tab, Tooltip } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import TodoTable from 'components/TodoTable';
import ErrorBoundary from 'components/ErrorBoundary';
import { actions } from 'store';

import css from './App.css';

FocusStyleManager.onlyShowFocusOnTabs();

export class App extends PureComponent {
  state = {
    itemValue: ''
  };

  onAddItem = () => {
    const { onAddItem } = this.props;
    const { itemValue } = this.state;

    onAddItem(itemValue);

    this.handleClearItemValue();
  };

  onCompleteItem = (e, id) => {
    const { onCompleteItem } = this.props;

    onCompleteItem(id);
  };

  onDeleteItem = (e, id) => {
    const { onDeleteItem } = this.props;

    onDeleteItem(id);
  };

  handleItemValueChange = (e) => this.setState({ itemValue: e.target.value });

  handleClearItemValue = () => this.setState({ itemValue: '' });

  renderTodoInput = () => {
    const { itemValue } = this.state;

    const isBlank = itemValue === '';
    const clearButton = (
      <Tooltip content="Clear input">
        <Button
          minimal
          icon={IconNames.CROSS}
          className={css.clear}
          onClick={this.handleClearItemValue}
        />
      </Tooltip>
    );
    const addButton = (
      <Button
        text="Add todo"
        disabled={isBlank}
        icon={IconNames.ADD}
        intent={Intent.SUCCESS}
        className={css.add}
        onClick={this.onAddItem}
      />
    );

    return (
      <React.Fragment>
        <ErrorBoundary>
          <FormGroup className={css.formGroup}>
            <InputGroup
              large
              value={itemValue}
              placeholder="Add todo here..."
              onChange={this.handleItemValueChange}
              className={css.todoItem}
              rightElement={isBlank ? null : clearButton}
            />
          </FormGroup>
          {addButton}
        </ErrorBoundary>
      </React.Fragment>
    );
  };

  renderTodoItems = () => {
    const { items } = this.props;

    const completedItems = items.filter(({ isCompleted }) => isCompleted);
    const activeItems = items.filter(({ isCompleted }) => !isCompleted);
    const tabs = [
      {
        id: 'all',
        title: 'All',
        panel: <TodoTable items={items} onComplete={this.onCompleteItem} onDelete={this.onDeleteItem} />,
        className: css.tab
      },
      {
        id: 'completed',
        title: 'Completed',
        panel: <TodoTable items={completedItems} onComplete={this.onCompleteItem} onDelete={this.onDeleteItem} />,
        className: css.tab
      },
      { id: 'active',
        title: 'Active',
        panel: <TodoTable items={activeItems} onComplete={this.onCompleteItem} onDelete={this.onDeleteItem} />,
        className: css.tab
      }
    ];

    return (
      <div className={css.todoTable}>
        <ErrorBoundary>
          <Tabs
            id="todoTabs"
            onChange={this.handleTabChange}
            className={css.tabs}
            renderActiveTabPanelOnly
          >
            {tabs.map((tab) => (
              <Tab key={tab.id} {...tab} />
            ))}
          </Tabs>
        </ErrorBoundary>
      </div>
    );
  };

  render() {
    return (
      <div className={css.root}>
        <H3 className={css.header}>Todo</H3>
        {this.renderTodoInput()}
        {this.renderTodoItems()}
      </div>
    );
  }
}

App.defaultProps = {
  items: []
};

App.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  onAddItem: PropTypes.func.isRequired,
  onCompleteItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired
};

export const mapStateToProps = ({ items }) => ({ items });

export const mapDispatchToProps = (dispatch) => ({
  onAddItem: (item) => dispatch(actions.addItem(item)),
  onCompleteItem: (id) => dispatch(actions.completeItem(id)),
  onDeleteItem: (id) => dispatch(actions.deleteItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
