import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import ListPage from './pages/ListPage/ListPage';
import './reset.css';
import './common.css';

class App extends React.Component {

  render() {
    return (

      <div className="app">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/list/:id" component={ListPage} />
        </Switch>
      </div>

    );
  }
}

export default App;
