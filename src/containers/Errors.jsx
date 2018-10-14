import React, {Component} from 'react';
import {Alert} from 'antd';

class Errors extends Component {
  render() {
    const margin = {
      margin: '0px 0px 15px 0px'
    };
    const errors = this.props.errors.details.map(error => {
      return <li>{error.message}</li>
    });
    return (
      <Alert
        style={margin}
        message="Validation Errors:"
        description={
          <li>
            {errors}
          </li>
        }
        type="error"
      />
    )
  }
}

export default Errors;
