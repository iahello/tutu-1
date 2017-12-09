import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import io from 'socket.io-client';
import { createViewportReducer } from 'redux-map-gl';
import counter from './counter';
import mapArticles from './mapArticles';
import recentArticles from './recentArticles';
import popularArticles from './popularArticles';
import filters from './filters';

const socket = io.connect('http://localhost:5000/client');
export default combineReducers({
  router: routerReducer,
  socket: () => socket,
  map: createViewportReducer(),
  counter,
  mapArticles,
  recentArticles,
  popularArticles,
  filters,
});

