import React from 'react';
import { shallow } from 'enzyme';

import ErrorBoundary from './ErrorBoundary';

const renderErrorBoundary = (props = {}) => <ErrorBoundary {...props} />;

const shallowRenderErrorBoundary = (props) => shallow(renderErrorBoundary(props));

describe('<ErrorBoundary>', () => {
  it('Should render', () => {
    const actual = shallowRenderErrorBoundary({ children: 'OK' });
    expect(actual).toMatchSnapshot();
  });

  it('Should render an error', () => {
    const actual = shallowRenderErrorBoundary({ children: 'OK' });
    const error = {
      name: 'Error name',
      message: 'Error message'
    };
    actual.simulateError(error);
    expect(actual).toMatchSnapshot();
  });
});
