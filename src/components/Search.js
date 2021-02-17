import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../context/github/githubContext';

const Search = ({ setAlert }) => {
  const githubContext = useContext(GithubContext);
  const [text, setText] = useState('');
  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    if (text === '') {
      setAlert('Please enter something', 'light');
    } else {
      githubContext.searchUsers(text);
      //after passing search value to parent component clear state
      setText('');
    }
  };

  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <input
          type='text'
          name='text'
          placeholder='Search users ...'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='search'
          className='btn btn-dark btn-block'
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default Search;
