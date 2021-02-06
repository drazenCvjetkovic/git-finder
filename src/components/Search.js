import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchUsers, showClearBtn, clearUsers, setAlert }) => {
  const [text, setText] = useState();
  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      setAlert('Please enter something', 'light');
    } else {
      searchUsers(text);
      //after passing search value to parent component clear state
      setText('');
    }
  };

  return (
    <div>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <input
          type='text'
          name='text'
          placeholder='Search users ...'
          value={text}
          onChange={(e) => onChange(e)}
        />
        <input
          type='submit'
          value='search'
          className='btn btn-dark btn-block'
        />
      </form>
      {showClearBtn && (
        <button className='btn btn-light btn-block' onClick={clearUsers()}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClearBtn: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
