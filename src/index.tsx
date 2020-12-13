import 'babel-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';
import reducer from './reducers'
import App from './modules/App'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
};

declare global {
  interface NodeModule {
    hot: any;
  }
};

let store = createStore(
  reducer, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
);

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>
, document.getElementById('app'));

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./modules/App', () => {
    const NextApp = require('./modules/App').default;
    ReactDOM.render(
      <AppContainer> 
        <Provider store={store}>
          <NextApp/>
        </Provider>
      </AppContainer>,
      document.getElementById('app')
    );
  });
}