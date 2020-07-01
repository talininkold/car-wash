import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './Сomponents/Layout/Navbar';
import AuthState from './Сomponents/Context/authContext/AuthState'
import PrivateRoute from './Сomponents/Pages/PrivateRoute'
import PrivateRouteLogs from './Сomponents/Pages/PrivateRouteLogs'
import FirstPage from './Сomponents/Pages/FirstPage'
import Search from './Сomponents/Pages/Search'
import Logs from './Сomponents/Pages/Logs'
import Alert from './Сomponents/Layout/Alert';

function App() {
  return (
    <AuthState>
      <Router>
      <div className="App">
        <Navbar />
        <Alert />
        <div>
          <Switch>
            <PrivateRoute exact path="/search" component={Search}/>
            <PrivateRouteLogs exact path="/logs" component={Logs}/>
            <Route exact path="/" component={FirstPage}/>
          </Switch>       
        </div>
      </div>
      </Router>
  </AuthState>
  );
}

export default App;
