import React from 'react';
import './App.css';
import Weather from './Weather';
import { BrowserRouter, Route, Switch } from 'react-router-dom'//helps to setup routers in the application
import Navbar from './Navbar';
import History from './History';
import Registration from './Registration';
import Login from './Login';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar userState={this.state} />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/' component={Weather} />
            <Route exact path='/history' component={History} />
            <Route exact path='/signup' component={Registration} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
