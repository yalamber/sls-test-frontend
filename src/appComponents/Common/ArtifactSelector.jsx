import React, { Component } from 'react';
import { Button, Modal, Dropdown, Menu, Icon, Input, Form } from 'antd';
import PropTypes from 'prop-types';
import DropboxChooser from 'react-dropbox-chooser';
import GooglePicker from 'react-google-picker';

class ArtifactSelector extends Component {
  
  static propTypes = {
    selectorIcon: PropTypes.string,
    onArtifactSelect: PropTypes.func
  };

  static defaultProps = {
    selectorIcon: 'cloud-upload'
  };

  state = {
    attachLinkVisible: false,
    attachLink: '',
    attachLinkName: ''
  };

  handleMenuClick = (e) => {
    switch(e.key) {
      default:
      case 'attach-link':
        this.setState({
          attachLinkVisible: true
        });
        break;
      case 'google-drive':
      case 'dropbox':
        //dropbox chooser is opened from dropbox chooser component
        return true;
    }
  }

  onDropboxSuccess = (files) => {
    files = files.map((file)  => {
      return {
        link: file.link,
        name: file.name,
        icon: file.icon
      }
    })
    this.props.onArtifactSelect(files);
  }

  onDropboxCancel = () => {

  }

  handleGoogleDriveChange = (event) => {
    if(event.action === 'picked') {
      let files = event.docs;
      if(files && files.length > 0) {
        files = files.map((file) => {
          return {
            link: file.url,
            name: file.name,
            icon: file.iconUrl
          }
        });
        this.props.onArtifactSelect(files);
      }
    }
  }

  handleAttachLinkCancel = () => {
    this.setState({
      attachLinkVisible: false
    });
  }

  onAttachLinkChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleAttachLinkOk = () => {
    this.props.onArtifactSelect([{
      link: this.state.attachLink,
      name: this.state.attachLinkName,
      icon: 'link'
    }]);
    this.setState({
      attachLinkVisible: false,
      attachLink: '',
      attachLinkName: ''
    });
  }

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="dropbox">
          <DropboxChooser 
            appKey={process.env.REACT_APP_DROPBOX_APP_KEY}
            success={files => this.onDropboxSuccess(files)}
            cancel={() => this.onDropboxCancel()}
            multiselect={true}>
            <Icon type="dropbox" /> Dropbox
          </DropboxChooser>
        </Menu.Item>
        <Menu.Item key="google-drive">
          <GooglePicker clientId={process.env.REACT_APP_GOOGLE_DRIVE_CLENTID}
            developerKey={process.env.REACT_APP_GOOGLE_DRIVE_DEVELOPER_KEY}
            scope={['https://www.googleapis.com/auth/drive.readonly']}
            onChange={this.handleGoogleDriveChange}
            onAuthFailed={data => console.log('on auth failed:', data)}
            multiselect={true}
            navHidden={true}
            authImmediate={false}
            viewId={'DOCS'}>
            <Icon type="google" /> Google Drive
          </GooglePicker>
        </Menu.Item>
        <Menu.Item key="link"><div><Icon type="link" /> Link</div></Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Dropdown overlay={menu}>
          <Button size="small">
            <Icon type={this.props.selectorIcon} />
          </Button>
        </Dropdown>
        <Modal 
          title="Attach link" 
          visible={this.state.attachLinkVisible}
          onOk={this.handleAttachLinkOk}
          onCancel={this.handleAttachLinkCancel}>
          <Form.Item>
            Link:
            <Input placeholder="Attach Link here" value={this.state.attachLink} name="attachLink" onChange={this.onAttachLinkChange} />
          </Form.Item>
          <Form.Item>
            Link Name (Optional):
            <Input placeholder="Link Name (optional)" value={this.state.attachLinkName} name="attachLinkName" onChange={this.onAttachLinkChange} />
          </Form.Item>
        </Modal>
      </div>
    )
  }
}

export default ArtifactSelector;