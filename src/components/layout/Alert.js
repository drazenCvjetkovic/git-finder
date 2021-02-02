import React from 'react';
import PropTypes from 'prop-types';
///rafcp
//alt + 96 for backticks
//i.fa.fa-info-circle
const Alert = ({alert}) => {
    //const {msg ,type} = alert
  return (
      alert != null && (
          <div className={`alert alert-${alert.type}`}>
          <i className="fa fa-info-circle">{alert.msg}</i>  
          </div>
      )
  )
};

Alert.propTypes = {
    msg:PropTypes.string.isRequired,
    type:PropTypes.string.isRequired,
};

export default Alert;
