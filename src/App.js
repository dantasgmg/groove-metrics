import React, {Component} from 'react';
import Login from "./Login.js"
import Dashboard from './DasboardTemp.js';

const code = new URLSearchParams(window.location.search).get('access_token')
class App extends Component {
  render() {
    return( code ? <Dashboard code = {code}/> : <Login/>)
  }
}

export default App;