import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import rootReducer from '../../reducers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = createStore(rootReducer)
  ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
