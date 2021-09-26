import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Footer from '@/components/Footer/Footer';
import Game from '@/pages/Game/Game';
import Home from '@/pages/Home/Home';
import Lobby from '@/pages/Lobby/Lobby';
import PageNotFound from '@/pages/PageNotFound/PageNotFound';
import Settings from '@/pages/Settings/Settings';

import s from './App.scss';

const App = () => (
  <div className={s.container}>
    <Switch>
      <Route component={Home} exact path="/" />
      <Route component={Lobby} exact path="/lobby" />
      <Route component={Settings} exact path="/settings" />
      <Route component={Game} exact path="/game" />
      <Route component={PageNotFound} />
    </Switch>
    <Footer />
  </div>
);

export default App;
