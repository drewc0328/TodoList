import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from "./Login/Login"
import Home from "./Home/Home"

import './App.css';

const App = () => {

  const [uid, setuid] = useState(""); 

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login setUserID={(uid) => setuid(uid)}/>
          </Route>
          <Route path="/home" component={Home}>
            <Home userID={uid}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
