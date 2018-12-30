import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'antd';

class Description extends Component {

  static propTypes = {
    title: PropTypes.string,
    details: PropTypes.string,
  }

  render() {
    const { title, details } = this.props;

    return (
      <div>
        <Divider orientation="left">{title}</Divider>
        <p>{details}</p>
      </div>
    )
  }
}

export default Description;
