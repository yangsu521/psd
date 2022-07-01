import PropTypes from 'prop-types';
import React from 'react';
import { CircularProgress } from '@material-ui/core';

const PageSpinner = ({ color = 'primary' }) => {
  return (
    <div className="cr-page-spinner">
      <CircularProgress color={color} />
    </div>
  );
};

PageSpinner.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary']),
};

export default PageSpinner;
