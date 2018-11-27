import React, { Component } from 'react';
import Popover from '../../components/uielements/popover';
import IntlMessages from '../../components/utility/intlMessages';
import TopbarDropdownWrapper from './topbarDropdown.style';

class TopbarAgency extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false
    };
  }

  hide() {
    this.setState({ visible: false });
  }

  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { agencies } = this.props;

    const content = (
      <TopbarDropdownWrapper className="isoUserDropdown">
        {
          agencies.map((agency) => <div>
            {agency.name}
          </div>)
        }
      </TopbarDropdownWrapper>
    );

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomLeft"
      >
        <div className="isoIconWrapper">
          <i
            className="ion-grid"
          /> &nbsp;
          Agencies
        </div>
      </Popover>
    );
  }
}

export default TopbarAgency;
