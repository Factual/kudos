import React, { PropTypes } from 'react';
import _ from 'lodash';

const ErrorBanner = ({ error }) => {
  if (error && error.length > 0) {
    return <div className="error-banner">
      <strong>Error!</strong> {error}
    </div>
  } else {
    return null;
  }
}

ErrorBanner.propTypes = {
  error: PropTypes.string,
};

export default ErrorBanner;
