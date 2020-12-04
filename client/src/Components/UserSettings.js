import React from 'react';
import 'antd/dist/antd.css';
import { Drawer, Radio, Space } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class UserSettings extends React.Component {
  state = { visible: false, placement: 'bottom' };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = (e) => {
    this.setState({
      placement: e.target.value,
    });
  };

  render() {
    const { placement, visible } = this.state;
    return (
      <>
        <Space>
          <Radio.Group
            defaultValue={placement}
            onChange={this.onChange}></Radio.Group>
          <IconButton>
            <MoreVertIcon
              type='primary'
              onClick={this.showDrawer}
              style={{ fontSize: 34 }}
            />
          </IconButton>
        </Space>
        <Drawer
          title='My Preferences'
          placement={placement}
          closable={false}
          onClose={this.onClose}
          visible={visible}
          key={placement}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </>
    );
  }
}
export default UserSettings;
