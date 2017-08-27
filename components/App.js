import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
} from 'react-native';
import Book from './Book';
import Books from './Books';
import BookView from './BookView';
import {
  Scene,
  Router,
  Tabs,
  Stack,
  Drawer,
} from "react-native-router-flux";
import Fav from './Fav';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers';

export const configureStore = () => {
  return createStore(reducers);
};
const store = configureStore();

const App = () => (
  <Provider store={ store }>
    <Router>
      <Stack key="root">
        <Tabs key="tabbar" 
          hideNavBar 
          activeTintColor={'#e91e63'}
          style={{backgroundColor: 'green'}}
          tabBarPosition={'bottom'}
          >
          <Scene key="search" component={ Books } title="Buscar"/>
          <Scene key="favorite" component={ Fav } title="Favoritos"/>
        </Tabs>
        <Scene key="book" component={ BookView } title="Buscar"/>
      </Stack>
    </Router>
  </Provider>
);

AppRegistry.registerComponent('Books', () => App);
