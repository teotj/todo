import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '@blueprintjs/core/lib/css/blueprint.css';

import App from 'components/App';
import { store } from 'store';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
