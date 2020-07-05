import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './Сomponents/Layout/Navbar';
import AuthState from './Сomponents/Context/authContext/AuthState'
import PrivateRoute from './Сomponents/Pages/PrivateRoute'
import PrivateRouteLogs from './Сomponents/Pages/PrivateRouteLogs'
import FirstPage from './Сomponents/Pages/FirstPage'
import Search from './Сomponents/Pages/Search'
import Image from './Сomponents/Pages/Image'
import Logs from './Сomponents/Pages/Logs'
import Edit from './Сomponents/Pages/Edit'
import Alert from './Сomponents/Layout/Alert';
import FilterState from './Сomponents/Context/FilterState';

function App() {
  return (
  <AuthState>
    <FilterState>
      <Router>
      <div className="App">
        <Navbar />
        <Alert />
        <div>
          <Switch>
            <PrivateRoute exact path="/search" component={Search}/>
            <PrivateRoute exact path="/image" component={Image}/>
            <PrivateRouteLogs exact path="/logs" component={Logs}/>
            <PrivateRouteLogs exact path="/edit" component={Edit}/>
            <Route exact path="/" component={FirstPage}/>
          </Switch>       
        </div>
      </div>
      </Router>
    </FilterState>
  </AuthState>
  );
}

export default App;
