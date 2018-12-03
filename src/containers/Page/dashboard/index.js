import React, { Component } from 'react';
import LayoutContentWrapper from '@validations/utility/layoutWrapper';
import LayoutContent from '@validations/utility/layoutContent';

export default class extends Component {
  render() {
    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <h1>SWQA</h1>
          <p>Welcome to Dashboard</p>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
