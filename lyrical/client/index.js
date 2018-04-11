import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import SongList  from './components/SongList.js';
import SongCreate from './components/SongCreate.js';
import SongDetail from './components/SongDetail';
import App from './components/App.js';

// ramifications of using id is whenever we make a query we need to return the id of the obj
// Find this at dev.apollodata.com/react/cache-updates.html
const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={ client }>
      <Router history={hashHistory} >
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
