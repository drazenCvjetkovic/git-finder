import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Search extends Component {
  state = {
    text: '',
  };
  onChange = (e) => {
    this.setState({
      //in this case name is text
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log('%c On Submit', 'color:green', this.state.text);
    this.props.searchUsers(this.state.text);
    //after passing search value to parent component clear state
    this.setState({
      text: '',
    });
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <form className='form' onSubmit={this.onSubmit}>
          <input
            type='text'
            name='text'
            placeholder='search users ...'
            value={this.state.text}
            onChange={(e) => this.onChange(e)}
          />
          <input
            type='submit'
            value='search'
            className='btn btn-dark btn-block'
          />
        </form>
      </div>
    );
  }
}
