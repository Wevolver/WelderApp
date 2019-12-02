import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, push } from 'react-router-redux'
import reducers from './reducers' // Or wherever you keep your reducers
import App from './containers/App';
import ReactGA from 'react-ga';
import Cookies from 'universal-cookie';
import auth from './modules/auth'

const cookies = new Cookies();

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

ReactGA.initialize('');

history.listen((location) => {
  if(cookies.get('accepts-cookies') && !window.location.pathname.endsWith("/master/tree")){
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
});

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/" render={(props) => <App auth0={auth} {...props} />} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
