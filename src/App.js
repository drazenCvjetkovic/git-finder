import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';
import './App.css';
import { About } from './components/pages/About';

class App extends Component {
  state = {
    users: [],
    loading: false,
    user: {},
  };
  /* 
  async componentDidMount() {
    this.setState({ loading: true });

    const clid = `${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
    //console.log(clid);

    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data, loading: false });
  } */

  searchUsers = async (text) => {
    this.setState({ loading: true });

    const link = `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    const res = await axios.get(link).catch((e) => {
      this.setState({ loading: false });
      //alert
      console.log(e);
    });

    if (res) {
      this.setState({
        users: res.data.items,
        loading: false,
      });
    }
  };
  clearUsers = () => {
    this.setState({
      users: [],
      user: {},
      loading: false,
      alert: null,
    });
  };
  setAlert = (msg, type) => {
    this.setState({
      alert: {
        msg,
        type,
      },
    });
    setTimeout(() => {
      this.setState({
        alert: null,
      });
    }, 3000);
  };

  getUser = async (username) => {
    const link = `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    const res = await axios.get(link).catch((e) => {
      this.setState({ loading: false });
      console.log('Error fetching user', username, e);
    });
    if (res) {
      console.info(res);
      this.setState({ user: res.data, loading: false });
    }
  };
  render() {
    const { users, loading, user } = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClearBtn={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
