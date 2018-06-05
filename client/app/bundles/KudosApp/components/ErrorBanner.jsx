import { isEmpty } from 'lodash'
import React, { PropTypes } from 'react'
import { observer } from 'mobx-react'
import AppStore from '../stores/AppStore'

@observer
export class ErrorBanner extends React.Component {
  render() {
    return isEmpty(AppStore.error) ? null : (
      <div className="error-banner">
        <strong>Error!</strong> {AppStore.error}
      </div>
    )
  }
}

export default ErrorBanner
