import React, { PropTypes } from 'react';
import _ from 'lodash';

const ErrorBanner = ({ error }) => {
  if (error && error.length > 0) {
    return <div class="alert alert-danger">
      <strong>Error!</strong>{error}
    </div>
  } else {
    return null;
  }
}

ErrorBanner.propTypes = {
  error: PropTypes.string,
};

export default ErrorBanner;
