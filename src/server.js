import express from 'express';
import compression from 'compression';
import path from 'path';

import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';

import reducers from './reducers';
import Html from './components/Html';
import App from './components/App';

const app = express();
app.use(compression());
app.use(express.static(path.join(__dirname)));

app.get('*', async (req, res) => {
  const scripts = ['vendor.js', 'client.js'];

  const initialState = { initialText: "route rendered by server" };
  const store = createStore(reducers, initialState);

  const appMarkup = renderToString((
    <StaticRouter location={req.url} context={{}}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  ));
  const html = renderToStaticMarkup(
    <Html children={appMarkup} scripts={scripts} initialState={initialState} />
  );

  res.send(`<!doctype html>${html}`);
});

app.listen(3000, () => console.log('Listening on port 3000'));
