import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types';

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  let githubClientId;
  let githubClientSecret;
  if (process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
  } else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
  }
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //search users
  const searchUsers = async (text) => {
    console.log('On seach users');
    setLoading();
    const link = `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`;
    const res = await axios.get(link).catch((e) => {
      console.log(e);
    });

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  const getUser = async (username) => {
    const link = `https://api.github.com/users/${username}?client_id=${githubClientId}&
    client_secret=${githubClientSecret}`;
    const res = await axios.get(link).catch((e) => {
      setLoading(false);
      console.log('Error fetching user', username, e);
    });

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS,
    });
  };

  const getUserRepos = async (username) => {
    setLoading();
    const link = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
    ${githubClientId}&client_secret=${githubClientSecret}`;
    const res = await axios.get(link).catch((e) => {
      console.log('Error fetching user', username, e);
    });

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
